import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black sm:bg-black/80 sm:backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-4">
        <a href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.jpg"
            alt="Chart Artists"
            width={28}
            height={28}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90 group-hover:text-white transition-colors">
            The Chart Artists
          </span>
        </a>
      </div>
    </nav>
  );
}
