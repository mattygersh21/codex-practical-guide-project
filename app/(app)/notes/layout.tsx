export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-6 border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Notes Area</h1>
          <p className="text-sm text-slate-600">Dummy authenticated app shell placeholder.</p>
        </header>
        {children}
      </div>
    </div>
  );
}
