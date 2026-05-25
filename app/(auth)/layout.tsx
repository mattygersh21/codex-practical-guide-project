import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#063a69_0%,#031b3d_45%,#020f2f_100%)] text-slate-100">
      <header className="border-b border-white/5 bg-[#0f355a]/85 backdrop-blur-sm">
        <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6 md:px-10">
          <Link href="/" className="text-[2rem] font-semibold tracking-tight text-slate-100">
            TinyNotes
          </Link>
          <nav className="flex items-center gap-8 text-2xl font-medium text-slate-300">
            <Link href="/login" className="transition-colors hover:text-cyan-300">
              Login
            </Link>
            <Link href="/register" className="transition-colors hover:text-cyan-300">
              Register
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto flex min-h-[calc(100vh-4.5rem)] w-full max-w-6xl items-center justify-center px-6 py-12 md:px-10 md:py-16">
        {children}
      </div>
    </div>
  );
}
