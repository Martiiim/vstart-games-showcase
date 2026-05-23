import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "@/assets/vstart-logo.png";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader() {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Vstart Games" className="h-10 w-10" width={40} height={40} />
          <span className="font-display text-sm text-primary text-glow">VSTART</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider">
          <Link to="/" activeOptions={{ exact: true }} className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">{t("nav.home")}</Link>
          <Link to="/games" className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">{t("nav.games")}</Link>
          <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">{t("nav.about")}</Link>
          <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary">{t("nav.contact")}</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
