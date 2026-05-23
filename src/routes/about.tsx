import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Heart, Lightbulb, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vstart Games" },
      { name: "description", content: "Meet Vstart Games — a passionate indie studio crafting heartfelt game experiences." },
      { property: "og:title", content: "About — Vstart Games" },
      { property: "og:description", content: "Passionate indie studio behind Simone to the Rescue." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useTranslation();
  const values = [
    { icon: Heart, title: t("about.love"), desc: t("about.loveDesc") },
    { icon: Lightbulb, title: t("about.bold"), desc: t("about.boldDesc") },
    { icon: Users, title: t("about.player"), desc: t("about.playerDesc") },
  ];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h1 className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">{t("about.title1")} <span className="text-primary text-glow">{t("about.titleAccent")}</span></h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base text-muted-foreground sm:mt-8 sm:space-y-5 sm:text-lg">
          <p>{t("about.p1")}</p>
          <p>{t("about.p2")}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-glow">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-lg text-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
