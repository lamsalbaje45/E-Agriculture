import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/analytics").then((response) => setStats(response.data));
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass rounded-[2rem] p-6 shadow-panel sm:p-8">
        <p className="text-sm uppercase tracking-[0.4em] text-moss">{user.role} dashboard</p>
        <h1 className="mt-3 font-display text-4xl text-bark sm:text-5xl">Marketplace control center</h1>
        <p className="mt-4 max-w-3xl text-bark/70">
          Track product activity, monitor orders, respond to buyers in real time, and keep payment flow moving.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Products" value={stats.products?.total} />
        <StatCard label="Orders" value={stats.orders?.total || stats.orders?.total_orders} tone="bg-leaf/15" />
        <StatCard label="Revenue / Spending" value={stats.orders?.revenue || stats.orders?.spending} tone="bg-clay/10" />
        <StatCard
          label="Role Records"
          value={stats.users?.reduce((sum, item) => sum + Number(item.total || 0), 0)}
          tone="bg-moss/10"
        />
      </div>

      {user.role === "admin" && (
        <div className="glass rounded-[2rem] p-6 shadow-panel sm:p-8">
          <h2 className="text-2xl font-semibold text-bark">User distribution</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {stats.users?.map((item) => (
              <div key={item.role} className="rounded-3xl bg-white/70 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-bark/60">{item.role}</p>
                <p className="mt-2 text-3xl font-bold text-bark">{item.total}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
