import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === "buyer" ? "/home" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to log in.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-moss/10 bg-white/60 shadow-panel backdrop-blur sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[0.95fr,1.05fr]">
        <section className="relative overflow-hidden bg-gradient-to-br from-moss via-fern to-bark p-6 text-sand sm:p-8 lg:p-12">
          <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-leaf/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sand/80">Krishi Connect</p>
              <h1 className="mt-4 max-w-lg font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Welcome back to a simpler farm marketplace.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-sand/85 sm:text-base">
                Manage products, orders, buyer conversations, and day-to-day marketplace activity from one place.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-sand/70">Orders</p>
                <p className="mt-2 text-lg font-semibold">Track progress clearly</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-sand/70">Messages</p>
                <p className="mt-2 text-lg font-semibold">Stay in touch with buyers and farmers</p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass flex min-h-full items-center p-5 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-lg">
            <p className="text-sm uppercase tracking-[0.32em] text-moss">Krishi Connect</p>
            <h2 className="mt-3 font-display text-3xl text-bark sm:text-4xl">Sign in to continue</h2>
            <p className="mt-3 text-sm leading-6 text-bark/70 sm:text-base">
              Use your account to access products, chats, notifications, and orders.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <input
                className="w-full rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="w-full rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
              <button className="w-full rounded-2xl bg-bark px-4 py-3 font-semibold text-sand">Login</button>
            </form>

            <p className="mt-6 text-sm text-bark/70">
              New here?{" "}
              <Link to="/register" className="font-semibold text-clay">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
