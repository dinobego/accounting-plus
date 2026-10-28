'use client';

export default function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  async function onFile(file?: File) {
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body });
    const data = await res.json();
    if (data.url) onChange(data.url);
  }

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-blue-500"
        placeholder="/images/1.jpg"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFile(e.target.files?.[0])}
        className="text-sm"
      />
      {value ? (
        <img src={value} alt="" className="mt-2 h-28 rounded-lg object-cover" />
      ) : null}
    </label>
  );
}
