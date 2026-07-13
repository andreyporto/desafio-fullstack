export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-[#CAF0F8]" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </div>
      <span className="text-sm font-medium text-gray-400">Carregando...</span>
    </div>
  );
}
