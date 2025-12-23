import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="border-b border-[#5780dd] bg-[#5780dd]">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 text-white md:h-16">
        <Link to="/" className="flex items-center gap-3" onClick={close}>
          <img src="/Edufinger-Education.png" alt="Edufinger" className="h-20 w-auto md:h-24" />
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-nowrap items-center gap-6 text-sm md:flex">
          <NavLink to="/" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Home</NavLink>
          <NavLink to="/blog" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Blog</NavLink>
          <NavLink to="/books" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Books</NavLink>
          <NavLink to="/entry" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Entry</NavLink>
          <NavLink to="https://kasoti.pages.dev" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Kasoti</NavLink>
          <NavLink to="https://edufinger.graphy.com/courses/Udaan-Kit-by-Raj-Sir-for-Grade-10-GSEB-67f5007ba74d2578355d3511" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Udaan</NavLink>
          <NavLink to="/admin/login" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Khazana</NavLink>
          {/* <NavLink to="/admin/login" onClick={close} className={({ isActive }) => isActive ? 'text-white' : 'text-white/90 hover:text-white'}>Contact</NavLink> */}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded md:hidden"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="md:hidden">
          <div className="mx-auto max-w-7xl px-4 pb-3 pt-2 text-white">
            <ul className="space-y-2">
              <li><NavLink to="/" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Home</NavLink></li>
              <li><NavLink to="/blog" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Blog</NavLink></li>
              <li><NavLink to="/books" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Books</NavLink></li>
              <li><NavLink to="/entry" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Entry</NavLink></li>
              <li><NavLink to="/admin/login" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Kasoti</NavLink></li>
              <li><NavLink to="/admin/login" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Uddan</NavLink></li>
              <li><NavLink to="/admin/login" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Khazana</NavLink></li>
              <li><NavLink to="/admin/login" onClick={close} className={({ isActive }) => isActive ? 'block rounded px-2 py-2 bg-white/10' : 'block rounded px-2 py-2 hover:bg-white/10'}>Contact</NavLink></li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
