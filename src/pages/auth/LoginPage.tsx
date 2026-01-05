import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import userService from '../../services/userService';
import { authService } from '../../services/authService';
import { redirectToRoleSubdomain } from '../../utils/subdomain';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await userService.login({ email, password });
      
      if (response.status === 'success') {
        authService.setCurrentUser(response.data.user);
        authService.setToken(response.data.token);
        
        // Redirect to appropriate subdomain based on role
        redirectToRoleSubdomain(response.data.user.role);
      } else {
        setError(response.error?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-gray-900 selection:bg-[#D0771E]/30 transition-colors">
      {/* --- LEFT SIDE: LOGIN FORM --- */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-12 lg:p-20 relative">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#F3F0EB]/50 dark:bg-gray-800/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"></div>

        {/* Top Bar with Logo and Vendor Link */}
        <div className="flex justify-between items-center mb-16 lg:mb-24">
          <div className="text-[#D0771E] font-black text-4xl tracking-tighter uppercase italic">Àriyá</div>
          <Link to="/auth/vendor-signup" className="group flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-400 group-hover:text-[#D0771E] transition-colors duration-300">Are you a vendor?</span>
            <div className="h-10 px-6 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-[#D0771E] border border-gray-100 dark:border-gray-700 group-hover:bg-[#D0771E] group-hover:text-white group-hover:border-[#D0771E] transition-all duration-300">
              Join Ariya Pro
            </div>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0 flex-1 flex flex-col justify-center">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-[#1D2939] dark:text-white mb-4 uppercase tracking-tighter">Welcome Back</h1>
            <p className="text-[11px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-widest leading-relaxed">
              Log in to your dashboard to continue planning your spectacular events.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white ml-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white">Password</label>
                <button type="button" className="text-[10px] font-black text-[#D0771E] uppercase tracking-widest hover:text-[#1D2939] dark:hover:text-white transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-16 px-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-[#D0771E] transition-all text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-500 hover:text-[#D0771E] transition-colors"
                >
                  {showPassword ? <EyeIcon className="w-6 h-6" /> : <EyeSlashIcon className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-6 h-6 border-gray-100 dark:border-gray-700 rounded-lg text-[#D0771E] focus:ring-[#D0771E]/20 transition-all cursor-pointer bg-white dark:bg-gray-800"
                />
                <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest group-hover:text-[#1D2939] dark:group-hover:text-white transition-colors">Remember my account</span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-[#D0771E] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-orange-100 dark:shadow-none hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300 !mt-10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging In...' : 'Log In to Dashboard'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-50 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 bg-white dark:bg-gray-900 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600">Security Layer</span>
            </div>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-4 h-16 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1D2939] dark:text-white">Google Sync</span>
            </button>
            <button className="flex items-center justify-center gap-4 h-16 bg-[#1D2939] dark:bg-gray-800 border border-[#1D2939] dark:border-gray-700 rounded-2xl hover:opacity-90 dark:hover:bg-gray-700 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 group">
              <img src="https://www.svgrepo.com/show/303108/apple-black-logo.svg" alt="Apple" className="w-5 h-5 invert dark:invert-0 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Apple ID</span>
            </button>
          </div>

          <div className="text-center mt-12">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              First time here? <Link to="/auth/signup" className="text-[#D0771E] ml-2 border-b border-[#D0771E]/20 pb-0.5 hover:border-[#D0771E] transition-all cursor-pointer hover:text-[#D0771E]/80">CREATE AN ACCOUNT</Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex gap-10 mt-12 py-6 border-t border-gray-50 dark:border-gray-800 lg:absolute lg:bottom-12 lg:left-20 lg:right-20 lg:border-none">
          <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Privacy</button>
          <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors">Terms</button>
          <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300 dark:text-gray-600 hover:text-[#D0771E] transition-colors ml-auto hidden sm:block">Ariya © 2024</button>
        </div>
      </div>

      {/* --- RIGHT SIDE: VISUAL PANE --- */}
      <div className="hidden lg:flex w-1/2 relative min-h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop"
          alt="Couple"
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[20s]"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#1D2939]/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D2939] via-transparent to-transparent opacity-90"></div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-24">
          <div className="max-w-xl">
            <div className="w-12 h-1 bg-[#D0771E] mb-10"></div>
            <h2 className="text-white text-5xl xl:text-6xl font-black leading-[1.1] mb-8 uppercase tracking-tighter">
              Architecting <br /> Memorable <br /> <span className="text-[#D0771E]">Experiences.</span>
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1D2939] overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">Trusted by 5k+ Planners</p>
            </div>
          </div>
        </div>

        {/* Glassmorphic Badge */}
        <div className="absolute top-20 right-20 p-8 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <p className="text-white text-[10px] font-black uppercase tracking-[0.5em] mb-1">Ariya Intelligence</p>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#D0771E] w-3/4 animate-pulse"></div>
            </div>
            <span className="text-white text-[10px] font-black">75%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
