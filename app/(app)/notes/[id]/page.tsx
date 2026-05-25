export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight">Edit Note</h2>
        <p>Dummy note detail page placeholder.</p>
        <p className="text-sm text-slate-600">Note ID: {id}</p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="font-medium">Editor Section</h3>
        <p className="text-sm text-slate-600">Dummy editor area placeholder.</p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="font-medium">Share Controls Section</h3>
        <p className="text-sm text-slate-600">Dummy share controls placeholder.</p>
      </section>
    </main>
  );
}
