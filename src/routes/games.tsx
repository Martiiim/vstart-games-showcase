import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "react-image-grid-gallery";
import "react-image-grid-gallery/style.css";
import heroImg from "@/assets/simone-hero.png";
import fightImg from "@/assets/simone-fight.png";
import forestImg from "@/assets/simone-forest.png";
import combatArtsImg from "@/assets/combat-arts.png";

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
  const simoneImages = [
    { id: "1", src: heroImg, alt: "Simone to the Rescue - Hero" },
    { id: "2", src: fightImg, alt: "Simone to the Rescue - Fight" },
    { id: "3", src: forestImg, alt: "Simone to the Rescue - Forest" },
  ];

  const combat4allImages = [
    { id: "1", src: fightImg, alt: "Combat4all - Fight" },
    { id: "2", src: forestImg, alt: "Combat4all - Forest" },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h1 data-translate-key="games.title" className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">Our Games</h1>
        <p data-translate-key="games.lead" className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">Worlds we've built, heroes we've raised. Here's what we're playing.</p>

        <article className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:mt-12">
          <div className="flex justify-center p-5 sm:p-8">
            <div className="w-full max-w-3xl">
              <ImageGallery imagesData={simoneImages} columnCount="auto" gapSize={12} columnWidth={280} />
            </div>
          </div>
          <div className="space-y-4 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">Flagship</Badge>
              <Badge variant="outline">Action-Platformer</Badge>
              <Badge variant="outline">Single Player</Badge>
            </div>
            <h2 data-translate-key="games.feature.name" className="font-display text-xl text-foreground sm:text-2xl lg:text-3xl">Simone to the Rescue</h2>
            <p data-translate-key="games.feature.desc" className="text-sm text-muted-foreground sm:text-base">When Simone and Marcelo arrive in Australia, their road trip takes a dark turn. An unknown gang attacks and captures Marcelo, leaving Simone to wake and discover him gone—but not without clues. As Simone embarks on a desperate rescue mission across surreal worlds, the gang continually moves their location and hires dangerous villains to stop her. With enemies like the mysterious Gabriel standing in her way, Simone must uncover the truth: was this all just an experiment to test her true potential?</p>
            <p data-translate-key="games.feature.badge" className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">Coming Soon</p>
          </div>
        </article>

        <article className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:mt-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center p-5 sm:p-8">
            <div className="order-2 lg:order-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Fighting Game</Badge>
                <Badge variant="outline">Single Player</Badge>
                <Badge variant="outline">Cyberpunk</Badge>
              </div>
              <h2 className="font-display text-xl text-foreground sm:text-2xl lg:text-3xl">Combat Arts: The last Master</h2>
              <p className="text-sm text-muted-foreground sm:text-base">In Nova Shambhala, a futuristic city where traditional martial arts have been banned by tech corporations, Maya is the last apprentice of a secret lineage that refuses cybernetic enhancement. When her master mysteriously disappears, she discovers her dojo's ancient training dummies—the Mokujin—have been awakened by a corrupted AI. Now they guard the secrets to her master's whereabouts. Maya must defeat these wooden guardians in intense combat, master new fighting styles, and infiltrate the corporate tower to save her master and restore true martial arts to the world.</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">Coming Soon</p>
            </div>
            <div className="order-1 lg:order-2 overflow-hidden rounded-lg bg-muted">
              <img src={combatArtsImg} alt="Combat Arts: The last Master - Maya" className="h-auto w-full object-contain" width={500} height={667} />
            </div>
          </div>
        </article>

        <article className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-card sm:mt-12">
          <div className="relative bg-black">
            <video
              ref={videoRef}
              src="/combat4all-trailer.mp4"
              className="h-auto w-full"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={toggleAudio}
              aria-label={muted ? "Unmute trailer" : "Mute trailer"}
              className="absolute right-4 top-4 z-10 rounded-full shadow-lg"
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
          <div className="p-5 sm:p-8">
            <div className="flex justify-center">
              <div className="w-full max-w-3xl">
                <ImageGallery imagesData={combat4allImages} columnCount="auto" gapSize={12} columnWidth={280} />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">Action</Badge>
                <Badge variant="outline">Multiplayer</Badge>
                <Badge variant="outline">Arena Combat</Badge>
              </div>
              <h2 className="font-display text-xl text-foreground sm:text-2xl lg:text-3xl">Combat4all</h2>
              <p className="text-sm text-muted-foreground sm:text-base">An adrenaline-fueled arena brawler where fighters from every corner of the world clash across wild landscapes — from neon-lit jungles to ancient ruins. Pick your hero, master unique combat styles, and battle your way to the top in our most explosive action title yet.</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary sm:text-sm">Coming Soon</p>
            </div>
          </div>
        </article>


        <div className="mt-10 rounded-2xl border border-dashed border-border p-6 text-center sm:p-10">
          <p className="font-display text-sm text-muted-foreground">More games in development</p>
          <p className="mt-2 text-xs text-muted-foreground/70">Follow us on social to be the first to know.</p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
