import { createFileRoute } from "@tanstack/react-router";
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

const values = [
  { icon: Heart, title: "Made with Love", desc: "Every pixel and line of code is crafted with care and intention." },
  { icon: Lightbulb, title: "Bold Ideas", desc: "We chase fresh concepts over safe formulas — even when it's harder." },
  { icon: Users, title: "Player First", desc: "Our community shapes the games we build. We listen, iterate, deliver." },
];

function About() {
<<<<<<< HEAD
  const values = [
    { icon: Heart, title: "Made with Love", desc: "Every pixel and line of code is crafted with care and intention." },
    { icon: Lightbulb, title: "Bold Ideas", desc: "We chase fresh concepts over safe formulas — even when it\'s harder." },
    { icon: Users, title: "Player First", desc: "Our community shapes the games we build. We listen, iterate, deliver." },
  ];
=======
>>>>>>> refs/remotes/origin/main
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-12 sm:py-16">
<<<<<<< HEAD
        <h1 data-translate-key="about.title" className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">About Us</h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base text-muted-foreground sm:mt-8 sm:space-y-5 sm:text-lg">
          <p data-translate-key="about.p1">Vstart Games is an independent studio born from a love of classic platformers and a drive to create new adventures for a new generation of players.</p>
          <p data-translate-key="about.p2">We\'re small, scrappy, and ambitious — focused on building memorable worlds, lovable characters, and gameplay that feels great in your hands.</p>
=======
        <h1 className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">About <span className="text-primary text-glow">Us</span></h1>
        <div className="mt-6 max-w-3xl space-y-4 text-base text-muted-foreground sm:mt-8 sm:space-y-5 sm:text-lg">
          <p>Vstart Games is an independent studio born from a love of classic platformers and a drive to create new adventures for a new generation of players.</p>
          <p>We're small, scrappy, and ambitious — focused on building memorable worlds, lovable characters, and gameplay that feels great in your hands.</p>
>>>>>>> refs/remotes/origin/main
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-glow">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h2 data-translate-key={`about.value.${title}.title`} className="font-display text-lg text-foreground">{title}</h2>
              <p data-translate-key={`about.value.${title}.desc`} className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
