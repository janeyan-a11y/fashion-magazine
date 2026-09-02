export function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-24 text-center">
      <p className="font-serif text-lg text-[var(--fg-muted)]">{message}</p>
    </div>
  );
}