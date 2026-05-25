export default async function SharedNotePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Shared Note</h1>
      <p>Dummy public shared note page placeholder.</p>
      <p className="text-sm text-slate-600">Token: {token}</p>
    </main>
  );
}
