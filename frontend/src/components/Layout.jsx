import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { resolveMediaUrl } from "../utils/media";

const links = [
  { to: "/home", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/orders", label: "Orders" },
  { to: "/chat", label: "Chat" },
  { to: "/notifications", label: "Notifications" },
  { to: "/profile", label: "Profile" },
];

export default function Layout({ children }) {
  const { user, logout, unreadNotifications } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleLinks = links.filter((link) => {
    if (user?.role === "buyer") {
      return link.to !== "/dashboard";
    }

    return link.to !== "/home";
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderNotificationBadge = (linkTo) =>
    linkTo === "/notifications" && unreadNotifications > 0 ? (
      <span className="rounded-full bg-clay px-2 py-0.5 text-xs font-bold text-white">{unreadNotifications}</span>
    ) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/30 bg-gradient-to-r from-moss via-fern to-bark px-4 py-4 text-sand shadow-panel md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex items-center justify-between gap-4 xl:hidden">
            <Link
              to={user?.role === "buyer" ? "/home" : "/dashboard"}
              className="font-display text-2xl tracking-wide sm:text-3xl"
            >
              Krishi Connect
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              {mobileMenuOpen ? (
                <span className="text-lg leading-none">x</span>
              ) : (
                <span className="flex flex-col gap-1" aria-hidden="true">
                  <span className="block h-0.5 w-5 rounded-full bg-white" />
                  <span className="block h-0.5 w-5 rounded-full bg-white" />
                  <span className="block h-0.5 w-5 rounded-full bg-white" />
                </span>
              )}
            </button>
            {mobileMenuOpen && (
              <div className="absolute right-0 top-full z-30 mt-3 w-64 max-w-[78vw] rounded-[1.75rem] border border-white/15 bg-[#42643b]/95 p-4 shadow-2xl backdrop-blur xl:hidden">
                <nav className="flex flex-col gap-2 text-sm">
                  {visibleLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `rounded-2xl px-4 py-3 transition ${
                          isActive ? "bg-wheat text-bark" : "bg-white/10 hover:bg-white/20"
                        }`
                      }
                    >
                      <span className="inline-flex items-center gap-2">
                        {link.label}
                        {renderNotificationBadge(link.to)}
                      </span>
                    </NavLink>
                  ))}
                  {user?.role === "admin" && (
                    <NavLink
                      to="/admin/users"
                      className={({ isActive }) =>
                        `rounded-2xl px-4 py-3 transition ${
                          isActive ? "bg-wheat text-bark" : "bg-white/10 hover:bg-white/20"
                        }`
                      }
                    >
                      Users
                    </NavLink>
                  )}
                </nav>

                <div className="mt-4 space-y-3 border-t border-white/15 pt-4 text-sm">
                  <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/10 px-3 py-2">
                    {user?.photo_url ? (
                      <img src={resolveMediaUrl(user.photo_url)} alt={user.full_name} className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sm font-bold text-bark">
                        {(user?.full_name || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="truncate">
                      {user?.full_name} ({user?.role})
                    </span>
                  </div>
                  <button
                    className="w-full rounded-2xl border border-bark/15 bg-white px-4 py-3 font-semibold text-bark shadow-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden items-center justify-between gap-4 xl:flex">
            <Link
              to={user?.role === "buyer" ? "/home" : "/dashboard"}
              className="shrink-0 font-display text-2xl tracking-wide"
            >
              Krishi Connect
            </Link>

            <nav className="flex items-center gap-2 text-sm">
              {visibleLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-center transition ${
                      isActive ? "bg-wheat text-bark" : "bg-white/10 hover:bg-white/20"
                    }`
                  }
                >
                  <span className="inline-flex items-center gap-2">
                    {link.label}
                    {renderNotificationBadge(link.to)}
                  </span>
                </NavLink>
              ))}
              {user?.role === "admin" && (
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 transition ${
                      isActive ? "bg-wheat text-bark" : "bg-white/10 hover:bg-white/20"
                    }`
                  }
                >
                  Users
                </NavLink>
              )}
            </nav>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex min-w-0 max-w-[250px] items-center gap-3 rounded-full bg-white/10 px-3 py-2">
                {user?.photo_url ? (
                  <img src={resolveMediaUrl(user.photo_url)} alt={user.full_name} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sm font-bold text-bark">
                    {(user?.full_name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="truncate">
                  {user?.full_name} ({user?.role})
                </span>
              </div>
              <button
                className="rounded-full border border-bark/15 bg-white px-4 py-2 font-semibold text-bark shadow-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:py-8 md:px-6">{children}</main>
      <footer className="mt-8 border-t border-moss/10 bg-white/75">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
          <div className="rounded-[1.75rem] border border-moss/10 bg-white/80 p-5 shadow-sm sm:p-6">
            <div className="grid gap-6 md:grid-cols-[1.2fr,1fr,1fr] md:gap-8">
              <div>
                <h3 className="font-display text-2xl text-bark sm:text-3xl">Krishi Connect</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-bark/72 sm:text-base sm:leading-7">
              A practical agriculture marketplace that helps buyers and farmers connect, trade, and communicate with confidence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 md:contents">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss sm:text-sm">Quick links</p>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-bark/75 sm:mt-4 sm:gap-3">
                    {visibleLinks.map((link) => (
                      <Link key={link.to} to={link.to} className="transition hover:text-bark">
                        {link.label}
                        {link.to === "/notifications" && unreadNotifications > 0 ? ` (${unreadNotifications})` : ""}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss sm:text-sm">Account</p>
                  <div className="mt-3 flex flex-col gap-2 text-sm text-bark/75 sm:mt-4 sm:gap-3">
                    <Link to="/profile" className="transition hover:text-bark">
                      Manage profile
                    </Link>
                    <Link to="/notifications" className="transition hover:text-bark">
                      Notifications
                    </Link>
                    <button className="text-left transition hover:text-bark" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-moss/10 pt-4 text-xs text-bark/55 sm:text-sm">
              Local agriculture marketplace for farmers, buyers, and transparent orders.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
