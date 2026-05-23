import { createFileRoute, Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, Sparkles, Trophy } from "lucide-react";
import heroImg from "@/assets/simone-hero.jpg";
import logo from "@/assets/vstart-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vstart Games — Indie Game Studio" },
      { name: "description", content: "Vstart Games is an indie studio crafting bold adventures. Play our flagship title Simone to the Rescue." },
      { property: "og:title", content: "Vstart Games — Indie Game Studio" },
      { property: "og:description", content: "Indie studio behind Simone to the Rescue. Bold worlds, bigger heroes." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.82 0.24 142) 0%, transparent 40%)" }} />
        <div className="container relative mx-auto grid gap-10 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-32">
          <div className="order-2 flex flex-col items-start gap-5 sm:gap-6 lg:order-1">
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary sm:px-4 sm:py-1.5 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </div>
            <h1 className="font-display text-3xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero.title1")} <span className="text-primary text-glow">{t("hero.titleAccent")}</span><br/>{t("hero.title2")}
            </h1>
            <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
              <Trans i18nKey="hero.desc" components={[<span key="0" className="font-semibold text-foreground" />]} />
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                <Link to="/games">
                  {t("hero.playNow")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 text-foreground hover:bg-primary/10">
                <Link to="/about">{t("hero.aboutStudio")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
            <img src={logo} alt="Vstart Games logo" className="relative h-48 w-48 animate-float sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96" width={384} height={384} />
          </div>
        </div>
      </section>

      {/* Featured game */}
      <section className="container mx-auto px-4 py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
            <img src={heroImg} alt="Simone to the Rescue key art" className="aspect-video w-full object-cover" width={1536} height={1024} />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{t("featured.tag")}</p>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">{t("featured.title")}</h2>
            <p className="text-muted-foreground">{t("featured.desc")}</p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Gamepad2, label: t("featured.platformer") },
                { icon: Trophy, label: t("featured.singlePlayer") },
                { icon: Sparkles, label: t("featured.allAges") },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 text-center sm:p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">{label}</span>
                </div>
              ))}
            </div>
            <Button asChild className="mt-2 w-fit bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/games">{t("featured.learnMore")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
