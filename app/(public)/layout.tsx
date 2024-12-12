// TODO: remove later
export const fetchCache = "force-no-store";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-4 max-w-md mx-auto min-h-screen flex items-center justify-center">
      <div className="flex-1">{children}</div>
    </main>
  );
}
