import { useEffect, useState } from "react";
import { useListRsvps, useGetRsvpSummary, setAuthTokenGetter } from "@workspace/api-client-react";
import { CustomCursor } from "@/components/CustomCursor";

const SESSION_KEY = "admin-key";

function formatDate(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/**
 * Simple password gate. Every request from this page (once unlocked) sends
 * the entered password as `Authorization: Bearer <password>`. The Netlify
 * function checks it against the ADMIN_PASSWORD environment variable.
 */
function useAdminAuth() {
  const [key, setKey] = useState<string | null>(() => sessionStorage.getItem(SESSION_KEY));

  useEffect(() => {
    setAuthTokenGetter(() => sessionStorage.getItem(SESSION_KEY));
  }, []);

  const unlock = (password: string) => {
    sessionStorage.setItem(SESSION_KEY, password);
    setKey(password);
  };

  const lock = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setKey(null);
  };

  return { key, unlock, lock };
}

function PasswordGate({ onUnlock }: { onUnlock: (password: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <form
        className="w-full max-w-sm p-8 border border-primary/20 bg-secondary/10"
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) onUnlock(value.trim());
        }}
      >
        <h1 className="font-script text-3xl text-primary mb-1">R & B Admin</h1>
        <p className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/50 mb-6">
          Enter the admin password
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-background border border-primary/20 font-sans text-sm focus:outline-none focus:border-primary"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full py-2 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Unlock
        </button>
      </form>
    </main>
  );
}

export default function Admin() {
  const { key, unlock, lock } = useAdminAuth();

  if (!key) {
    return <PasswordGate onUnlock={unlock} />;
  }

  return <AdminDashboard onLock={lock} />;
}

function AdminDashboard({ onLock }: { onLock: () => void }) {
  const { data: rsvps, isLoading: rsvpsLoading, error: rsvpsError } = useListRsvps();
  const { data: summary, error: summaryError } = useGetRsvpSummary();

  const isUnauthorized =
    (rsvpsError as { status?: number } | undefined)?.status === 401 ||
    (summaryError as { status?: number } | undefined)?.status === 401;

  useEffect(() => {
    if (isUnauthorized) onLock();
  }, [isUnauthorized, onLock]);

  return (
    <main className="custom-cursor-active min-h-screen bg-background text-foreground px-4 py-12 md:px-10">
      <CustomCursor />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="font-script text-4xl md:text-5xl text-primary mb-2">R & B Admin</h1>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/50">RSVPs</p>
          </div>
          <button
            onClick={onLock}
            className="font-sans text-xs uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors border border-primary/20 px-3 py-2"
          >
            Lock
          </button>
        </div>

        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            <div className="p-6 border border-primary/20 bg-secondary/10">
              <div className="font-serif text-3xl text-primary">{summary.totalResponses}</div>
              <div className="font-sans text-xs uppercase tracking-widest text-foreground/50 mt-1">Responses</div>
            </div>
            <div className="p-6 border border-primary/20 bg-secondary/10">
              <div className="font-serif text-3xl text-primary">{summary.attendingCount}</div>
              <div className="font-sans text-xs uppercase tracking-widest text-foreground/50 mt-1">Attending</div>
            </div>
            <div className="p-6 border border-primary/20 bg-secondary/10">
              <div className="font-serif text-3xl text-primary">{summary.notAttendingCount}</div>
              <div className="font-sans text-xs uppercase tracking-widest text-foreground/50 mt-1">Declined</div>
            </div>
            <div className="p-6 border border-primary/20 bg-secondary/10">
              <div className="font-serif text-3xl text-primary">{summary.totalGuests}</div>
              <div className="font-sans text-xs uppercase tracking-widest text-foreground/50 mt-1">Total Guests</div>
            </div>
          </div>
        )}

        <section className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">RSVP Responses</h2>
          {rsvpsLoading ? (
            <p className="text-foreground/50 font-sans text-sm">Loading...</p>
          ) : !rsvps || rsvps.length === 0 ? (
            <p className="text-foreground/50 font-sans text-sm">No RSVPs yet.</p>
          ) : (
            <div className="overflow-x-auto border border-primary/10">
              <table className="w-full text-left font-sans text-sm">
                <thead>
                  <tr className="bg-secondary/20 text-xs uppercase tracking-widest text-foreground/60">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Attending</th>
                    <th className="px-4 py-3">Guests</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr key={r.id} className="border-t border-primary/10 align-top">
                      <td className="px-4 py-3 whitespace-nowrap">{r.fullName}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.email}</td>
                      <td className="px-4 py-3">
                        <span className={r.attending ? "text-primary" : "text-foreground/50"}>
                          {r.attending ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{r.guestCount}</td>
                      <td className="px-4 py-3 max-w-xs">{r.message || "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-foreground/50">{formatDate(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
