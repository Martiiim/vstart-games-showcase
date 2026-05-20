import { Link } from "@tanstack/react-router";
import logo from "@/assets/vstart-logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Vstart Games" className="h-10 w-10" width={40} height={40} />
          <span className="font-display text-sm text-primary text-glow">VSTART</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
          <Link to="/" activeOptions={{ exact: true }} className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">Home</Link>
          <Link to="/games" className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">Games</Link>
          <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">About</Link>
          <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
