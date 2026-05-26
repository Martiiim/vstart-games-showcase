import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Instagram, Facebook, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vstart Games" },
      { name: "description", content: "Get in touch with Vstart Games. Email, Instagram, and Facebook." },
      { property: "og:title", content: "Contact — Vstart Games" },
      { property: "og:description", content: "Reach the Vstart Games team." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "vstart.games@gmail.com", href: "mailto:vstart.games@gmail.com" },
  { icon: Instagram, label: "Instagram", value: "@vstart.games", href: "https://instagram.com/vstart.games" },
  { icon: Facebook, label: "Facebook", value: "Vstart Games", href: "https://www.facebook.com/share/1E8BZY37vh/" },
];

function Contact() {
  const channels = [
    { icon: Mail, label: "Email", value: "vstart.games@gmail.com", href: "mailto:vstart.games@gmail.com" },
    { icon: Instagram, label: "Instagram", value: "@vstart.games", href: "https://instagram.com/vstart.games" },
    { icon: Facebook, label: "Facebook", value: "Vstart Games", href: "https://www.facebook.com/share/1E8BZY37vh/" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <h1 data-translate-key="contact.title" className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">Get in Touch</h1>
        <p data-translate-key="contact.lead" className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">Got a question, a fan letter, or a business inquiry? We'd love to hear from you.</p>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-glow"
            >
              <div className="inline-flex w-fit rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <p data-translate-key={`contact.channel.${label}.label`} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
              <p data-translate-key={`contact.channel.${label}.value`} className="font-display text-sm text-foreground">{value}</p>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
