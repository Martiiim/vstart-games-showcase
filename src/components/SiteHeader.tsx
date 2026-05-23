import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import logo from "@/assets/vstart-logo.png";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkCls = "text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary";

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3" onClick={close}>
          <img src={logo} alt="Vstart Games" className="h-9 w-9 sm:h-10 sm:w-10" width={40} height={40} />
          <span className="font-display text-xs sm:text-sm text-primary text-glow">VSTART</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wider md:flex">
          <Link to="/" activeOptions={{ exact: true }} className={linkCls}>{t("nav.home")}</Link>
          <Link to="/games" className={linkCls}>{t("nav.games")}</Link>
          <Link to="/about" className={linkCls}>{t("nav.about")}</Link>
          <Link to="/contact" className={linkCls}>{t("nav.contact")}</Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="border-t border-border/50 bg-background/95 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-wider">
            <li><Link to="/" activeOptions={{ exact: true }} className={linkCls} onClick={close}>{t("nav.home")}</Link></li>
            <li><Link to="/games" className={linkCls} onClick={close}>{t("nav.games")}</Link></li>
            <li><Link to="/about" className={linkCls} onClick={close}>{t("nav.about")}</Link></li>
            <li><Link to="/contact" className={linkCls} onClick={close}>{t("nav.contact")}</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
