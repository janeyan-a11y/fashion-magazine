export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="py-24 text-center">
      <p className="font-serif text-lg text-[var(--fg-muted)] mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 text-sm border border-[var(--border)] rounded-full hover:bg-[var(--border)] transition-colors"
        >
          重试
        </button>
      )}
    </div>
  );
}