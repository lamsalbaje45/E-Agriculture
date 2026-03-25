import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Fresh local produce",
    text: "Buy directly from farmers and access vegetables, fruits, and seasonal harvest from nearby regions.",
  },
  {
    title: "Simple communication",
    text: "Ask about harvest date, quantity, delivery area, or quality before placing your order.",
  },
  {
    title: "Clear order flow",
    text: "Review your orders, track progress, and complete payment with a straightforward process.",
  },
];

const quickLinks = [
  { title: "Browse products", text: "See all available items in the marketplace grid.", to: "/products" },
  { title: "Your orders", text: "Check pending, completed, and in-progress orders.", to: "/orders" },
  { title: "Messages", text: "Stay in touch with farmers before and after ordering.", to: "/chat" },
];

export default function BuyerHomePage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] border border-moss/15 bg-white shadow-panel">
        <div className="grid lg:grid-cols-[1.05fr,0.95fr]">
          <div className="p-8 md:p-10 lg:p-12">
            <p className="text-sm uppercase tracking-[0.3em] text-moss">Buyer Home</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-bark sm:text-5xl md:text-6xl">
              Buy fresher. Support farmers. Build a better local food chain.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-bark/85 sm:text-lg sm:leading-8">
              Explore trusted farm produce, compare listings by region, and place orders through a clean marketplace
              built for practical buying decisions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="rounded-2xl bg-moss px-6 py-3 font-semibold text-white">
                Explore products
              </Link>
              <Link to="/orders" className="rounded-2xl border border-bark/15 bg-[#f7f8f2] px-6 py-3 font-semibold text-bark">
                View orders
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-moss/15 bg-[#f7fbf3] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-bark/65">Marketplace Focus</p>
                <p className="mt-2 text-xl font-semibold text-bark">Seasonal and regional</p>
              </div>
              <div className="rounded-3xl border border-moss/15 bg-[#f7fbf3] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-bark/65">For Buyers</p>
                <p className="mt-2 text-xl font-semibold text-bark">Simple product discovery</p>
              </div>
              <div className="rounded-3xl border border-moss/15 bg-[#f7fbf3] p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-bark/65">Trust Layer</p>
                <p className="mt-2 text-xl font-semibold text-bark">Profiles, chat, and order flow</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80"
              alt="Farmer carrying fresh vegetables in a green agricultural field"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bark/75 via-bark/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-sand/90">From Field To Market</p>
              <p className="mt-3 max-w-lg text-2xl font-semibold leading-tight sm:text-3xl">
                Better visibility for farmers and more confidence for buyers.
              </p>
              <p className="mt-3 max-w-lg text-white/85">
                Order with clearer information, direct contact, and a marketplace centered on local agriculture.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="rounded-[1.75rem] border border-moss/15 bg-white p-6 shadow-panel">
            <h2 className="text-2xl font-semibold text-bark">{item.title}</h2>
            <p className="mt-3 leading-7 text-bark/82">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-moss/15 bg-white p-6 shadow-panel md:p-8">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-moss">Quick Access</p>
            <h2 className="mt-2 font-display text-3xl text-bark sm:text-4xl">Start where you need to</h2>
          </div>
          <p className="max-w-xl text-bark/82">
            Keep things simple: browse products, review your orders, or continue a conversation with a farmer.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="rounded-[1.5rem] border border-moss/15 bg-[#f9fbf5] p-5 transition hover:-translate-y-1 hover:border-moss/30"
            >
              <h3 className="text-xl font-semibold text-bark">{item.title}</h3>
              <p className="mt-2 leading-7 text-bark/82">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
