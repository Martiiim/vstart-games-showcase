import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/simone-hero.jpg";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Games — Vstart Games" },
      { name: "description", content: "Explore games by Vstart Games, including our flagship platformer Simone to the Rescue." },
      { property: "og:title", content: "Games — Vstart Games" },
      { property: "og:description", content: "Our library of indie game adventures." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Games,
});

function Games() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">{t("games.title1")} <span className="text-primary text-glow">{t("games.titleAccent")}</span></h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{t("games.subtitle")}</p>

        <article className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:mt-12">
          <img src={heroImg} alt="Simone to the Rescue" className="aspect-video w-full object-cover" width={1536} height={1024} />
          <div className="space-y-4 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">{t("games.flagship")}</Badge>
              <Badge variant="outline">{t("games.actionPlatformer")}</Badge>
              <Badge variant="outline">{t("games.singlePlayer")}</Badge>
            </div>
            <h2 className="font-display text-xl text-foreground sm:text-2xl lg:text-3xl">Simone to the Rescue</h2>
            <p className="text-sm text-muted-foreground sm:text-base">{t("games.simoneDesc")}</p>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">{t("games.comingSoon")}</p>
          </div>
        </article>

        <div className="mt-10 rounded-2xl border border-dashed border-border p-6 text-center sm:p-10">
          <p className="font-display text-sm text-muted-foreground">{t("games.moreDev")}</p>
          <p className="mt-2 text-xs text-muted-foreground/70">{t("games.followSocial")}</p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
