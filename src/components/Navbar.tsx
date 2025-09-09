import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { IoMenu, IoClose } from "react-icons/io5";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "#hero" },
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Productos", href: "#productos" },
    { name: "Contacto", href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // estado inicial correcto
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navegación principal"
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
            : "py-5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <a className="relative z-10 text-2xl font-bold text-foreground" href="/">
            <span className="text-foreground">Casa</span>
            <span className="text-primary">Cruz</span>
          </a>

          {/* Links desktop */}
          <ul className="hidden md:flex gap-8 font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Botón hamburguesa solo móvil */}
          <button
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="drawer"
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden px-3 py-2 rounded-md bg-primary text-primary-foreground"
          >
            <IoMenu />
          </button>
        </div>
      </nav>

      {/* Overlay (solo móvil) */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer lateral derecho (solo móvil) */}
      <div
        id="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-64 max-w-[80%] bg-background border-l border-border shadow-xl",
          "transition-transform transition-all duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="drawer-title" className="text-lg font-semibold text-foreground">
            Menú
          </h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
            className="rounded-md px-3 py-2 hover:bg-card"
          >
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col gap-4 p-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-primary"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
