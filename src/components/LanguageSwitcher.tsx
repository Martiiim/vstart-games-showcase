import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
    doGTranslate?: (langPair: string) => void;
  }
}

const languages = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

const changePageLanguage = async (languageCode: string) => {
  if (typeof window === "undefined") return;

  try {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-translate-key]"))
      .filter((el) => !el.hasAttribute("data-translate-skip") && !el.classList.contains("notranslate"));
    const payload: Record<string, string> = {};
    const whitespaceMap: Record<string, { leading: string; trailing: string }> = {};
    const originalCaseMap: Record<string, { firstLetterLower: boolean }> = {};
    elements.forEach((el) => {
      const key = el.getAttribute("data-translate-key") || "";
      if (!key) return;
      const text = el.innerText || "";
      const leading = (text.match(/^\s+/) || [""])[0];
      const trailing = (text.match(/\s+$/) || [""])[0];
      whitespaceMap[key] = { leading, trailing };
      // determine whether the first letter in the original is lowercase
      const firstLetterMatch = text.match(/\p{L}/u);
      const firstLetter = firstLetterMatch ? firstLetterMatch[0] : "";
      originalCaseMap[key] = { firstLetterLower: firstLetter ? firstLetter === firstLetter.toLowerCase() : false };
      payload[key] = text;
    });

    if (Object.keys(payload).length === 0) return;

    // Try cache first
    const cacheKey = `translations_${languageCode}`;
    const cached = sessionStorage.getItem(cacheKey);
    let translations: Record<string, string> | null = cached ? JSON.parse(cached) : null;

    if (!translations) {
      const res = await fetch(`/api/translate?lang=${encodeURIComponent(languageCode)}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Translate API error: ${res.status}`);
      translations = await res.json();
      sessionStorage.setItem(cacheKey, JSON.stringify(translations));
    }

    // Apply translations (preserve original surrounding whitespace and casing)
    elements.forEach((el) => {
      const key = el.getAttribute("data-translate-key") || "";
      if (!key) return;
      const t = translations?.[key];
      if (typeof t === "string") {
        const ws = whitespaceMap[key] || { leading: "", trailing: "" };
        let out = t.trim();
        const caseInfo = originalCaseMap[key];
        if (caseInfo?.firstLetterLower) {
          const m = out.match(/\p{L}/u);
          if (m && m.index !== undefined) {
            const i = m.index;
            out = out.substring(0, i) + out[i].toLowerCase() + out.substring(i + 1);
          }
        }
        el.innerText = `${ws.leading}${out}${ws.trailing}`;
      }
    });

    // Ensure inline sibling elements are separated by a space when translations remove spacing
    elements.forEach((el) => {
      const next = el.nextSibling;
      if (next && next.nodeType === Node.ELEMENT_NODE) {
        const nextEl = next as HTMLElement;
        if (!/\s$/.test(el.innerText) && !/^\s/.test(nextEl.innerText)) {
          // insert a single space text node between them
          const spaceNode = document.createTextNode(" ");
          el.parentNode?.insertBefore(spaceNode, next);
        }
      }
    });

    // set html lang attribute
    document.documentElement.lang = languageCode;
  } catch (err) {
    // fallback: no-op
    console.error("Translation failed:", err);
  }
};

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // no-op; widget deprecated in favor of server proxy
  }, []);

  const current = languages.find((l) => selectedLanguage.startsWith(l.code)) ?? languages[0];

  return (
    <>
      <div
        id="google_translate_element"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", visibility: "hidden" }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={t("lang")}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Globe className="h-3.5 w-3.5" />
          {current.code.toUpperCase()}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((l) => (
            <DropdownMenuItem
              key={l.code}
              onClick={() => {
                setSelectedLanguage(l.code);
                changePageLanguage(l.code);
              }}
              className={l.code === current.code ? "text-primary" : ""}
            >
              {l.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
