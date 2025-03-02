export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block w-full text-center justify-center">
          {children}
        </div>
      </section>
    </main>
  );
}
