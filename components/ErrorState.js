import Link from "next/link";

function isSessionMessage(message) {
  return String(message || "").toLowerCase().includes("session");
}

export default function ErrorState({ title = "Unable to load data", message }) {
  const showLogin = isSessionMessage(message);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-red-600">{title}</h3>
      <p className="text-sm text-gray-700">{message}</p>
      {showLogin && (
        <Link
          href="/auth/logout?reason=session_expired"
          className="mt-3 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Login again
        </Link>
      )}
    </div>
  );
}
