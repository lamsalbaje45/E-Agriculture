export default function StatCard({ label, value, tone = "bg-white" }) {
  return (
    <div className={`glass min-w-0 rounded-3xl p-5 shadow-panel ${tone}`}>
      <p className="text-sm uppercase tracking-[0.2em] text-bark/60">{label}</p>
      <p className="mt-3 break-words text-3xl font-bold text-bark">{value ?? 0}</p>
    </div>
  );
}
