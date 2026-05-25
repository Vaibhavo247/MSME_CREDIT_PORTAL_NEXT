'use client';

import { useUser } from '../../../components/UserContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { role } = useUser();

  // Dashboard stats
  // const stats = [
  //   { label: 'Total Applications', value: '1,243', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  //   { label: 'Approved', value: '856', icon: '✅', color: 'from-green-500 to-emerald-500' },
  //   { label: 'Pending', value: '312', icon: '⏳', color: 'from-amber-500 to-orange-500' },
  //   { label: 'Disbursed', value: '687', icon: '💳', color: 'from-purple-500 to-pink-500' },
  // ];

  // const recentApplications = [
  //   { id: 'APP001', name: 'Tech Solutions Pvt Ltd', status: 'approved', amount: '₹50,000', date: '2024-01-15' },
  //   { id: 'APP002', name: 'Retail Store Co', status: 'pending', amount: '₹75,000', date: '2024-01-14' },
  //   { id: 'APP003', name: 'Manufacturing Unit', status: 'disbursed', amount: '₹1,20,000', date: '2024-01-13' },
  // ];

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'approved': return 'bg-green-100 text-green-800 border-green-300';
  //     case 'pending': return 'bg-amber-100 text-amber-800 border-amber-300';
  //     case 'disbursed': return 'bg-blue-100 text-blue-800 border-blue-300';
  //     default: return 'bg-gray-100 text-gray-800 border-gray-300';
  //   }
  // };

  return (
    <div className="f lex bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      <main className="ml-64 flex-1 p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back! Here&apos;s your portal overview.</p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            > */}
              {/* Gradient Background */}
              {/* <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        {/* Main Content Grid */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> */}
          {/* Recent Applications */}
          {/* <div className="lg:col-span-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Applications</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Latest MSME applications</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Application ID</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Company Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <code className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-purple-600 dark:text-purple-400">{app.id}</code>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{app.name}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{app.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 text-center border-t border-slate-200 dark:border-slate-700">
              <Link href="/applications" className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                View all applications →
              </Link>
            </div>
          </div> */}

          {/* Quick Actions */}
          {/* <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500/50 p-6 shadow-md text-white">
              <h3 className="text-lg font-bold mb-2">Quick Start</h3>
              <p className="text-sm text-purple-100 mb-4">Manage your credit applications efficiently</p>
              <Link href="/loans" className="inline-block w-full text-center px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors">
                New Application
              </Link>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Navigation</h3>
              <div className="space-y-2">
                <Link href="/approve" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform">✅</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Approved</span>
                </Link>
                <Link href="/applications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform">💳</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Disbursed</span>
                </Link>
                <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                  <span className="text-xl group-hover:scale-110 transition-transform">⏳</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Pending</span>
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}
