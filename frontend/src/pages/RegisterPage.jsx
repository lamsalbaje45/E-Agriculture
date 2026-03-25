import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roles = ["buyer", "farmer"];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "buyer",
    phone: "",
    region: "",
    address: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-moss/10 bg-white/60 shadow-panel backdrop-blur sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[0.9fr,1.1fr]">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f4fbec] via-[#eef7e5] to-[#ddebcf] p-6 text-bark sm:p-8 lg:p-12">
          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-moss/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-leaf/20 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-moss">Krishi Connect</p>
              <h1 className="mt-4 max-w-lg font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Create an account and start trading with confidence.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-bark/75 sm:text-base">
                Join as a buyer or farmer, manage your profile, and keep your marketplace activity organized from day one.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[1.5rem] border border-moss/10 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-moss">Profiles</p>
                <p className="mt-2 text-lg font-semibold">Build trust with clear account details</p>
              </div>
              <div className="rounded-[1.5rem] border border-moss/10 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-moss">Marketplace</p>
                <p className="mt-2 text-lg font-semibold">Buy, sell, and communicate directly</p>
              </div>
            </div>
          </div>
        </section>

        <section className="glass flex min-h-full items-center p-5 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-moss">Krishi Connect</p>
            <h2 className="mt-3 font-display text-3xl text-bark sm:text-4xl">Create your account</h2>
            <p className="mt-3 text-sm leading-6 text-bark/70 sm:text-base">
              Fill in your basic details to start using Krishi Connect.
            </p>

            <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <input className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <input className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <select className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <input className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none" placeholder="Region" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
              <textarea className="rounded-2xl border border-bark/10 bg-white/80 px-4 py-3 outline-none md:col-span-2" rows="4" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 md:col-span-2">{error}</p>}
              <button className="w-full rounded-2xl bg-bark px-4 py-3 font-semibold text-sand md:col-span-2">Register</button>
            </form>

            <p className="mt-6 text-sm text-bark/70">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-clay">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
