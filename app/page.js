import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const LOGIN_URL = "https://msme.suryodaybank.co.in/api/ibm/login";

  return (
    // Modern Banking Background
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="group">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          
          {/* Card Content */}
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-slate-700/50 space-y-8">
            
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Suryoday Bank</h1>
              <p className="text-sm text-purple-300 font-semibold tracking-wider">CREDIT PORTAL</p>
              <p className="text-slate-400 text-sm mt-2">Empowering MSME Growth</p>
            </div>

            {/* Logo Section */}
            <div className="relative w-full h-24 flex items-center justify-center bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl border border-slate-600/50 p-4">
              <Image 
                src="/suryodaylogo.png"
                alt="Suryoday Bank"
                width={300}
                height={80}
                priority
                className="object-contain brightness-110"
              />
            </div>

            {/* Features List */}
            {/* <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-1">🏦</span>
                <div>
                  <p className="text-sm font-semibold text-white">Quick Processing</p>
                  <p className="text-xs text-slate-400">Fast-track MSME credit applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-1">🔒</span>
                <div>
                  <p className="text-sm font-semibold text-white">Secure Portal</p>
                  <p className="text-xs text-slate-400">Bank-level security protocols</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-1">📊</span>
                <div>
                  <p className="text-sm font-semibold text-white">Real-time Tracking</p>
                  <p className="text-xs text-slate-400">Monitor your application status</p>
                </div>
              </div>
            </div> */}

            {/* Login Button */}
            <Link 
              href={LOGIN_URL}
              className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base uppercase tracking-wide relative overflow-hidden group/btn"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                Login to Portal
                <span>→</span>
              </span>
            </Link>

            {/* Footer Text */}
            <div className="text-center space-y-2 border-t border-slate-700/50 pt-6">
              <p className="text-xs text-slate-500">This portal is exclusively for</p>
              <p className="text-xs font-semibold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                Authorized Bank & MSME Partners
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600"></div>
    </main>
  );
}
