import Link from 'next/link';

const sidebarItems = [
  { label: 'MSME APPLICATION', href: '/loans', roles: ['CREDIT', 'EMPLOYEE', 'SALES', 'VIEWER'], icon: '📋' },
  { label: 'DISBURSED', href: '/disbursed', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '💳' },
  { label: 'PENDING', href: '/pending', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '⏳' },
  { label: 'APPROVED', href: '/approved', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '✅' },
  { label: 'VOTERID', href: '/voterid', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '🪪' },
  { label: 'VOTERID APPROVED', href: '/voterid-approved', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '✔️' },
  { label: 'VOTERID REJECTED', href: '/voterid-rejected', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '❌' },
  { label: 'ONEPAGER', href: '/onepager', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '📄' },
  { label: 'REJECTED', href: '/rejected', roles: ['CREDIT', 'EMPLOYEE', 'SALES'], icon: '⛔' },
  { label: 'MSME LEAD', href: '/lead', roles: ['CREDIT', 'EMPLOYEE', 'SALES', 'VIEWER'], icon: '🎯' },
];

export default function Sidebar({ role = 'EMPLOYEE' }) {
  const visibleItems = sidebarItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-56 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl z-40 border-r border-slate-700/50">
      <div className="flex h-full flex-col">
        {/* Header */}
        {/* <div className="p-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Credit Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Manage Applications</p>
        </div> */}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:text-white transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 border border-transparent hover:border-purple-500/50 active:bg-purple-600/30"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200 ">{item.icon}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 text-xs text-slate-400">
          <p>Logged as: <span className="text-slate-300 font-semibold">{role}</span></p>
        </div>
      </div>
    </aside>
  );
}

