import { Instagram, Facebook, Mail } from "lucide-react";
import logo from "@/assets/vstart-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <img src={logo} alt="Vstart Games" className="h-16 w-16" width={64} height={64} loading="lazy" />
          <p data-translate-key="footer.title" className="font-display text-xs text-primary text-glow">VSTART GAMES</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/vstart.games" target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/share/1E8BZY37vh/" target="_blank" rel="noreferrer noopener" aria-label="Facebook" className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="mailto:vstart.games@gmail.com" aria-label="Email" className="rounded-full border border-border p-3 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-glow">
              <Mail className="h-5 w-5" />
            </a>
          </div>
<<<<<<< HEAD
          <p data-translate-key="footer.copyright" className="text-xs text-muted-foreground">© {new Date().getFullYear()} Vstart Games. All rights reserved.</p>
=======
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Vstart Games. All rights reserved.</p>
>>>>>>> refs/remotes/origin/main
        </div>
      </div>
    </footer>
  );
}
