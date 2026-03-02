export function PreviewBanner() {
  if (import.meta.env.VITE_PREVIEW !== "true") {
    return null;
  }

  const shortCommitHash = (import.meta.env.VITE_COMMIT_HASH ?? "").slice(0, 7);

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-7 border-b border-amber-400 bg-amber-300 text-amber-950">
      <div className="flex h-full items-center justify-between px-3 text-xs font-medium">
        <span>Preview Environment</span>
        <span>{shortCommitHash || "unknown"}</span>
      </div>
    </div>
  );
}
