// // src/pages/auth/Login.jsx
// import React, { useState } from 'react';
// import { login, register } from '../../api/apiRoutes';
// import useAuth from '../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { loginUser } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       let res;
//       if (isLogin) {
//         res = await login({ email: email.trim(), password });
//       } else {
//         res = await register({ name, email: email.trim(), password });
//       }
//       loginUser(res.data);
//       navigate(res.data.role === 'admin' ? '/admin/dashboard' : '/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
//       {/* === GLASS CARD === */}
//       <div className="w-full max-w-md">
//         <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
//           {/* === LOGO / TITLE === */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
//               <Lock className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-2">
//               {isLogin ? 'Welcome Back' : 'Create Account'}
//             </h1>
//             <p className="text-white/70">
//               {isLogin ? 'Login to continue' : 'Register to get started'}
//             </p>
//           </div>

//           {/* === TABS === */}
//           <div className="flex mb-8 bg-white/10 rounded-xl p-1">
//             <button
//               onClick={() => setIsLogin(true)}
//               className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
//                 isLogin
//                   ? 'bg-white text-slate-900 shadow-md'
//                   : 'text-white/70 hover:text-white'
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLogin(false)}
//               className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
//                 !isLogin
//                   ? 'bg-white text-slate-900 shadow-md'
//                   : 'text-white/70 hover:text-white'
//               }`}
//             >
//               Register
//             </button>
//           </div>

//           {/* === FORM === */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {!isLogin && (
//               <div className="relative group">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required={!isLogin}
//                   className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                 />
//               </div>
//             )}

//             <div className="relative group">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//               />
//             </div>

//             <div className="relative group">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-white transition-colors" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//               />
//             </div>

//             {/* === SUBMIT BUTTON === */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   {isLogin ? 'Sign In' : 'Create Account'}
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* === FOOTER LINK === */}
//           <p className="text-center mt-6 text-white/60 text-sm">
//             {isLogin ? "Don't have an account? " : "Already have an account? "}
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-white font-medium hover:underline"
//             >
//               {isLogin ? 'Register' : 'Login'}
//             </button>
//           </p>
//         </div>

//         {/* === BRAND FOOTER === */}
//         <p className="text-center mt-8 text-white/50 text-sm">
//           © 2025 BrightHoRIZon. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;