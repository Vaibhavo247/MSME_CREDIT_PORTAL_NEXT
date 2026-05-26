export default function ViewField({ label, value, children,wide = false }) {
  const displayValue =
    value === null || value === undefined || value === "" ? "N/A" : value;

  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <div className="h-full rounded-md border border-slate-200 bg-white px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-normal text-slate-500">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium text-slate-900">
          {children || displayValue}
        </p>
      </div>
    </div>
  );
}
