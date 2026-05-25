import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response, request?: Request): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  const consumed = consumeLastCapturedError();
  if (consumed) {
    console.error(consumed);
  } else {
    console.error(new Error(`h3 swallowed SSR error: ${body}`), {
      status: response.status,
      headers: Object.fromEntries(Array.from(response.headers.entries())),
      body,
      request: request?.url,
    });
  }

  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Server-side translation proxy endpoint
      if (url.pathname === "/api/translate") {
        if (request.method !== "POST") {
          return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
            status: 405,
            headers: { "content-type": "application/json" },
          });
        }

        try {
          const targetLang = url.searchParams.get("lang") || request.headers.get("x-translate-language") || "en";
          const domain = request.headers.get("x-translate-domain") || undefined;
          const payload = await request.json();

          // If an external translation API is configured in the environment, forward the request there.
          const envAny = env as any;
          if (envAny?.TRANSLATE_API_URL) {
            const forwardRes = await fetch(envAny.TRANSLATE_API_URL, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                ...(envAny.TRANSLATE_API_KEY ? { authorization: `Bearer ${envAny.TRANSLATE_API_KEY}` } : {}),
              },
              body: JSON.stringify({ target: targetLang, domain, payload }),
            });

            const text = await forwardRes.text();
            return new Response(text, {
              status: forwardRes.status,
              headers: { "content-type": forwardRes.headers.get("content-type") || "text/plain" },
            });
          }

          // Fallback: simple mock translator — appends the language code to each string.
          const translateStrings = (obj: any): any => {
            if (typeof obj === "string") return `${obj} [${targetLang}]`;
            if (Array.isArray(obj)) return obj.map(translateStrings);
            if (obj && typeof obj === "object") {
              const out: Record<string, any> = {};
              for (const k of Object.keys(obj)) out[k] = translateStrings(obj[k]);
              return out;
            }
            return obj;
          };

          const translated = translateStrings(payload);
          return new Response(JSON.stringify(translated), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        } catch (err: any) {
          console.error("/api/translate error:", err);
          return new Response(JSON.stringify({ error: err?.message || String(err) }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
