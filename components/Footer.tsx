import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Chart Artists"
            width={28}
            height={28}
            className="object-contain opacity-80"
          />
          <div>
            <p className="font-semibold text-sm">The Chart Artists</p>
            <p className="text-white/30 text-xs">No hype. Just traders.</p>
          </div>
        </div>

        <a
          href="https://x.com/WelLdoOnEe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          X / Twitter
        </a>

        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} The Chart Artists
        </p>
      </div>
    </footer>
  );
}
