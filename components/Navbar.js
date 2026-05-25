"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ employeeId, role, avatarSrc }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const initials = (employeeId || role || 'U')
    .toString()
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#001529] to-[#0a2351] shadow-lg z-50 h-16 flex items-center justify-between px-4 md:px-8 backdrop-blur-sm border-b border-blue-900/30">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
         <Image 
                        src="/suryodaylogo.png"
                        alt="Suryoday Bank"
                        width={150}
                        height={80}
                        priority
                        className="object-contain brightness-110"
                      />
        {/* <div className="hidden md:flex h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 items-center justify-center">
          <span className="text-white font-bold text-lg">S</span>
        </div> */}
        <Link href="/dashboard" className="text-xs md:text-sm flex items-center font-bold text-orange-600 hover:text-blue-200 transition-colors">
          <span className="hidden md:inline">SURYODAY-BANK OF SMILES</span>
          <span className="sm:hidden">SDB</span>
        </Link>
      </div>

      {/* Right Section - User Profile & Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Status Badge */}
        {/* <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/50"> */}
          {/* <span className="h-2 w-2 bg-green-400 rounded-full "></span> */}
          {/* <p className="text-xs font-medium text-blue-200">{role}</p> */}
        {/* </div> */}

        {/* User Profile & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2  md:gap-3 p-2 rounded-lg hover:bg-blue-900/40 transition-colors"
          >
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-purple-400 ring-2 ring-purple-300/30 animate-pulse"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-600 text-xs font-bold text-white border-2 border-purple-300 ring-2 ring-purple-300/30">
                {initials}
              </div>
            )}
            <div className="hidden sm:flex flex-col items-start">
              <p className="text-xs font-semibold text-white">{employeeId}</p>
              <p className="text-xs text-blue-300">{role}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden z-10">
              <div className="px-4 py-3 border-b border-slate-700 bg-slate-900/50">
                <p className="text-sm font-semibold text-white">{employeeId}</p>
                <p className="text-xs text-slate-400">{role}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                <span>🚪</span>
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}