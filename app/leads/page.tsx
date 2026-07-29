"use client";

import Image from "next/image";
import { TrashIcon } from "lucide-react";
import {
  FormEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";

interface DemoBooking {
  _id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  subject: string;
  mode: "Online" | "Offline" | "Hybrid";
  message?: string;
  createdAt: string;
  updatedAt: string;
}

type EnrichedBooking = DemoBooking & {
  initials: string;
  receivedDateLabel: string;
  receivedTimeLabel: string;
  searchText: string;
};

const receivedDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const receivedTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function LeadsPage() {
  // Authentication
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Details drawer
  const [selectedBooking, setSelectedBooking] = useState<DemoBooking | null>(
    null,
  );

  const fetchBookings = useCallback(
    async ({ showLoader = true }: { showLoader?: boolean } = {}) => {
      if (showLoader) {
        setBookingsLoading(true);
      }

      try {
        const response = await fetch("/api/admin/demo-bookings", {
          credentials: "include",
        });

        if (response.status === 401) {
          setAuthenticated(false);
          setBookings([]);
          return false;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();

        setBookings(data.data ?? []);
        setAuthenticated(true);
        return true;
      } catch (error) {
        console.error("Unable to fetch demo bookings:", error);
        return false;
      } finally {
        if (showLoader) {
          setBookingsLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    let active = true;

    async function initializeDashboard() {
      await fetchBookings({ showLoader: false });

      if (active) {
        setLoading(false);
      }
    }

    initializeDashboard();

    return () => {
      active = false;
    };
  }, [fetchBookings]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to login");
        return;
      }

      const loaded = await fetchBookings({ showLoader: false });

      if (!loaded) {
        setError("Logged in, but unable to load leads right now.");
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Unable to connect to the server");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setAuthenticated(false);
      setBookings([]);
      setSelectedBooking(null);
    }
  }
  async function handleDelete(booking: DemoBooking) {
    const confirmed = window.confirm(
      `Delete the demo enquiry for ${booking.studentName}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/demo-bookings/${booking._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      setBookings((currentBookings) =>
        currentBookings.filter(
          (currentBooking) => currentBooking._id !== booking._id,
        ),
      );

      if (selectedBooking?._id === booking._id) {
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error("Unable to delete booking:", error);
      alert("Unable to delete this lead. Please try again.");
    }
  }

  const deferredSearch = useDeferredValue(search);
  const searchValue = deferredSearch.trim().toLowerCase();

  const enrichedBookings = useMemo<EnrichedBooking[]>(() => {
    return bookings.map((booking) => {
      const createdAtDate = new Date(booking.createdAt);

      return {
        ...booking,
        initials: getInitials(booking.studentName),
        receivedDateLabel: receivedDateFormatter.format(createdAtDate),
        receivedTimeLabel: receivedTimeFormatter.format(createdAtDate),
        searchText: [
          booking.studentName,
          booking.parentName,
          booking.email,
          booking.phone,
          booking.subject,
          booking.grade,
        ]
          .join(" ")
          .toLowerCase(),
      };
    });
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return enrichedBookings.filter((booking) => {
      const matchesSearch =
        searchValue.length === 0 || booking.searchText.includes(searchValue);

      const matchesMode = modeFilter === "All" || booking.mode === modeFilter;

      return matchesSearch && matchesMode;
    });
  }, [enrichedBookings, modeFilter, searchValue]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, modeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedBookings = useMemo(() => {
    return filteredBookings.slice(pageStartIndex, pageStartIndex + pageSize);
  }, [filteredBookings, pageStartIndex, pageSize]);

  const { onlineCount, offlineCount, hybridCount } = useMemo(() => {
    return bookings.reduce(
      (counts, booking) => {
        if (booking.mode === "Online") {
          counts.onlineCount += 1;
        } else if (booking.mode === "Offline") {
          counts.offlineCount += 1;
        } else {
          counts.hybridCount += 1;
        }

        return counts;
      },
      { onlineCount: 0, offlineCount: 0, hybridCount: 0 },
    );
  }, [bookings]);

  // --------------------------------------------------
  // SESSION LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />

          <p className="mt-4 text-sm text-slate-400">
            Loading admin dashboard...
          </p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  if (authenticated) {
    return (
      <main className="min-h-screen bg-slate-50">
        {/* NAVBAR */}
        <header className="bg-slate-950 text-white shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden">
                <Image
                  src="/cheggtutor_logo_.png"
                  alt="CheggTutor logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-base font-bold">CheggTutor</p>

                <p className="text-xs text-slate-400">Admin Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs text-slate-400">
                  Admin session active
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#111c42] to-[#172554]">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Admin Dashboard
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Demo Class{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Leads
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Track and review enquiries submitted through the Elite Tutoring
                demo booking form.
              </p>
            </div>
          </div>
        </section>

        {/* MAIN DASHBOARD */}
        <div className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
          {/* STAT CARDS */}
          <div className="-mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Leads"
              value={bookings.length}
              description="All demo enquiries"
              icon="users"
              accent="indigo"
            />

            <StatCard
              title="Online"
              value={onlineCount}
              description="Online learning"
              icon="monitor"
              accent="blue"
            />

            <StatCard
              title="Offline"
              value={offlineCount}
              description="In-person learning"
              icon="location"
              accent="violet"
            />

            <StatCard
              title="Hybrid"
              value={hybridCount}
              description="Flexible learning"
              icon="layers"
              accent="cyan"
            />
          </div>

          {/* LEADS TABLE */}
          <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Demo enquiries
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredBookings.length} of {bookings.length} lead
                    {bookings.length !== 1 ? "s" : ""}
                  </p>

                  {filteredBookings.length > 0 && (
                    <p className="mt-1 text-xs text-slate-400">
                      Rows {pageStartIndex + 1}-
                      {Math.min(
                        pageStartIndex + paginatedBookings.length,
                        filteredBookings.length,
                      )} of {filteredBookings.length}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* SEARCH */}
                  <div className="relative">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>

                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search student, parent..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 sm:w-72"
                    />
                  </div>

                  {/* MODE FILTER */}
                  <select
                    value={modeFilter}
                    onChange={(event) => setModeFilter(event.target.value)}
                    className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:bg-white"
                  >
                    <option value="All">All modes</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* LOADING */}
            {bookingsLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-500" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading demo enquiries...
                </p>
              </div>
            ) : filteredBookings.length === 0 ? (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <SearchIcon />
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                  No leads found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-slate-400">
                  No demo enquiries match your current search and filter.
                </p>
              </div>
            ) : (
              /* TABLE */
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4">Student</th>

                      <th className="px-6 py-4">Parent</th>

                      <th className="px-6 py-4">Grade</th>

                      <th className="px-6 py-4">Subject</th>

                      <th className="px-6 py-4">Mode</th>

                      <th className="px-6 py-4">Received</th>

                      <th className="px-6 py-4" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {paginatedBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="group transition hover:bg-indigo-50/30"
                      >
                        {/* STUDENT */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-bold uppercase text-white shadow-sm">
                              {booking.initials}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {booking.studentName}
                              </p>

                              <p className="mt-0.5 max-w-[190px] truncate text-xs text-slate-400">
                                {booking.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* PARENT */}
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {booking.parentName}
                        </td>

                        {/* GRADE */}
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {booking.grade}
                        </td>

                        {/* SUBJECT */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700">
                            {booking.subject}
                          </span>
                        </td>

                        {/* MODE */}
                        <td className="px-6 py-4">
                          <ModeBadge mode={booking.mode} />
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">
                            {booking.receivedDateLabel}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {booking.receivedTimeLabel}
                          </p>
                        </td>

                        {/* VIEW */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                            >
                              View
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-3.5 w-3.5"
                              >
                                <path d="m9 18 6-6-6-6" />
                              </svg>
                            </button>

                            <button
                              onClick={() => handleDelete(booking)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              <TrashIcon />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!bookingsLoading && filteredBookings.length > pageSize && (
              <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 sm:px-6">
                <p className="text-xs text-slate-500">
                  Page {safeCurrentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={safeCurrentPage === 1}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={safeCurrentPage === totalPages}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {selectedBooking && (
          <LeadDetails
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </main>
    );
  }

  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#101a3c] to-[#172554] px-4">
      {/* Decorative glows */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="absolute -bottom-40 -right-32 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-7 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden">
              <Image
                src="/cheggtutor_logo_.png"
                alt="CheggTutor logo"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="font-bold text-white">CheggTutor</p>

              <p className="text-xs text-slate-400">Administration</p>
            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
              <LockIcon />
            </div>

            <h1 className="text-2xl font-bold text-white">Admin Login</h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter your credentials to access demo class enquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingIn ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Restricted access · CheggTutor Administration
        </p>
      </div>
    </main>
  );
}

// ==================================================
// STAT CARD
// ==================================================

type Accent = "indigo" | "blue" | "violet" | "cyan";

function StatCard({
  title,
  value,
  description,
  icon,
  accent,
}: {
  title: string;
  value: number;
  description: string;
  icon: "users" | "monitor" | "location" | "layers";
  accent: Accent;
}) {
  const accentStyles: Record<
    Accent,
    {
      icon: string;
      decoration: string;
    }
  > = {
    indigo: {
      icon: "bg-indigo-50 text-indigo-600",
      decoration: "bg-indigo-500",
    },
    blue: {
      icon: "bg-blue-50 text-blue-600",
      decoration: "bg-blue-500",
    },
    violet: {
      icon: "bg-violet-50 text-violet-600",
      decoration: "bg-violet-500",
    },
    cyan: {
      icon: "bg-cyan-50 text-cyan-600",
      decoration: "bg-cyan-500",
    },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`absolute left-0 top-0 h-1 w-full ${accentStyles[accent].decoration}`}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentStyles[accent].icon}`}
        >
          <StatIcon type={icon} />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-400">{description}</p>
    </div>
  );
}

// ==================================================
// MODE BADGE
// ==================================================

function ModeBadge({ mode }: { mode: DemoBooking["mode"] }) {
  const styles = {
    Online: "border-blue-200 bg-blue-50 text-blue-700",
    Offline: "border-violet-200 bg-violet-50 text-violet-700",
    Hybrid: "border-cyan-200 bg-cyan-50 text-cyan-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[mode]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          mode === "Online"
            ? "bg-blue-500"
            : mode === "Offline"
              ? "bg-violet-500"
              : "bg-cyan-500"
        }`}
      />

      {mode}
    </span>
  );
}

// ==================================================
// LEAD DETAILS
// ==================================================

function LeadDetails({
  booking,
  onClose,
}: {
  booking: DemoBooking;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Drawer header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#111c42] to-[#172554] p-7 text-white">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                Lead details
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 font-bold uppercase shadow-lg">
                  {getInitials(booking.studentName)}
                </div>

                <div>
                  <h2 className="text-xl font-bold">{booking.studentName}</h2>

                  <p className="mt-0.5 text-sm text-slate-400">
                    Demo class enquiry
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close lead details"
            >
              ×
            </button>
          </div>
        </div>

        {/* Drawer body */}
        <div className="p-7">
          <div className="mb-7 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Learning mode
              </p>

              <div className="mt-2">
                <ModeBadge mode={booking.mode} />
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Received
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-700">
                {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <h3 className="mb-5 text-sm font-bold text-slate-900">
            Student & Parent Information
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <Detail label="Student" value={booking.studentName} />

            <Detail label="Parent" value={booking.parentName} />

            <Detail label="Grade" value={booking.grade} />

            <Detail label="Subject" value={booking.subject} />
          </div>

          <div className="my-7 h-px bg-slate-200" />

          <h3 className="mb-5 text-sm font-bold text-slate-900">
            Contact Information
          </h3>

          <div className="space-y-4">
            <ContactDetail type="phone" label="Phone" value={booking.phone} />

            <ContactDetail type="email" label="Email" value={booking.email} />
          </div>

          <div className="my-7 h-px bg-slate-200" />

          <h3 className="mb-3 text-sm font-bold text-slate-900">Message</h3>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {booking.message || "No message provided."}
          </div>

          <div className="mt-7 rounded-xl bg-indigo-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
              Enquiry received
            </p>

            <p className="mt-1.5 text-sm font-medium text-slate-700">
              {new Date(booking.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================================================
// DETAIL
// ==================================================

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

// ==================================================
// CONTACT DETAIL
// ==================================================

function ContactDetail({
  type,
  label,
  value,
}: {
  type: "phone" | "email";
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {type === "phone" ? <PhoneIcon /> : <EmailIcon />}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

        <p className="truncate text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
}

// ==================================================
// HELPERS
// ==================================================

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
}

// ==================================================
// ICONS
// ==================================================

function StatIcon({
  type,
}: {
  type: "users" | "monitor" | "location" | "layers";
}) {
  if (type === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (type === "monitor") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
      >
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 text-indigo-300"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 text-slate-400"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
