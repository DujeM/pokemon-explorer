import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#fff2e8] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/pokeball.svg"
            alt="Pokeball logo"
            width="40"
            height="40"
          />
          <h1 className="text-xl font-black uppercase">Pokémon</h1>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/team">Team</NavLink>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div
          className="
            md:hidden
            border-t-4 border-black
            bg-[#fff2e8]
            shadow-[0_6px_0_0_#000]
          "
        >
          <div className="flex flex-col">
            <MobileNavLink to="/explore" onClick={() => setOpen(false)}>
              Explore
            </MobileNavLink>
            <MobileNavLink to="/compare" onClick={() => setOpen(false)}>
              Compare
            </MobileNavLink>
            <MobileNavLink to="/team" onClick={() => setOpen(false)}>
              Team
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="
        text-base font-black uppercase
        hover:underline
      "
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="
        border-b-4 border-black
        px-4 py-3
        font-black uppercase
        hover:bg-black hover:text-white
        transition
      "
    >
      {children}
    </Link>
  );
}
