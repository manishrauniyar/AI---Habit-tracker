// import { useState } from "react";
// import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
// import { useAuth } from "../context/AuthContext.jsx";
// import { useTheme } from "../context/ThemeContext.jsx";
// import habitLogo from "../assets/habitLogo.png";


// export default function Login() {
//   const { user, login } = useAuth();
//   const { theme, toggle } = useTheme();
//   const loc = useLocation();
//   const navigate = useNavigate();


//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);


//   if (user) return <Navigate to="/dashboard" replace />;


//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);


//     try {
//       await login(email, password);


//       navigate(loc.state?.from || "/dashboard", {
//         replace: true,
//       });
//     } catch (e) {
//       setErr(e.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 md:p-6 auth-shell">


//       {/* Theme Toggle */}
//       <button
//         onClick={toggle}
//         className="fixed top-4 right-4 p-2.5 rounded-xl glass z-20"
//         aria-label="Toggle theme"
//       >
//         {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
//       </button>


//       {/* Center Login Card */}
//       <div className="w-full max-w-md auth-form-panel rounded-3xl">
//         <div className="auth-form-inner p-6 md:p-8">
//           {/* Logo */}
//           <div className="mb-8">
//             <Link to="/" className="inline-flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl flex items-center justify-center brand-mark">
//                 <img
//                   src={habitLogo}
//                   alt="Habit Tracker"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <span className="font-semibold text-lg">
//                 AI Habit Tracker
//               </span>
//             </Link>
//           </div>

//           {/* Heading */}
//           <div className="mb-7">
//             <div className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300 mb-3">
//               Sign in
//             </div>
//             <h2 className="text-3xl font-semibold tracking-[-0.035em]">
//               Welcome back
//             </h2>
//             <p className="text-sm text-muted mt-2">
//               Log in to continue your streaks.
//             </p>
//           </div>
//           {/* Login Form */}
//           <form onSubmit={submit} className="space-y-4">
//             <div>
//               <label className="label">Email</label>

//               <input
//                 className="input"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 required
//                 autoFocus
//               />
//             </div>

//             <div>
//               <label className="label">Password</label>

//               <input
//                 className="input"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />
//             </div>


//             {err && (
//               <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
//                 {err}
//               </div>
//             )}


//             <button
//               type="submit"
//               className="btn-primary w-full py-3"
//               disabled={loading}
//             >
//               {loading ? "Signing in..." : "Sign in"}

//               {!loading && <ArrowRight size={15} />}
//             </button>
//           </form>


//           {/* Register */}
//           <div className="mt-6 pt-5 border-t divider text-sm text-soft text-center">
//             Don't have an account?{" "}


//             <Link
//               to="/register"
//               className="text-brand-700 dark:text-brand-300 font-semibold hover:underline underline-offset-4"
//             >
//               Create one
//             </Link>
//           </div>

//           {/* Back To Home */}
//           <div className="mt-5 text-center">
//             <Link
//               to="/"
//               className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-700 dark:hover:text-brand-300 transition"
//             >
//               <ArrowLeft size={16} />
//               Return to home
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import habitLogo from "../assets/habitLogo.png";


export default function Login() {
  const { user, login } = useAuth();
  const { theme, toggle } = useTheme();
  const loc = useLocation();
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);


  // Already logged in
  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
        replace
      />
    );
  }


  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);


    try {
      const loggedInUser = await login(email, password);


      if (loggedInUser.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      }
      else {
        navigate(loc.state?.from || "/dashboard", {
          replace: true,
        });
      }
    }
    catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 auth-shell">


      {/* Theme Toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 right-4 p-2.5 rounded-xl glass z-20"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>


      {/* Center Login Card */}
      <div className="w-full max-w-md auth-form-panel rounded-3xl">

        <div className="auth-form-inner p-6 md:p-8">


          {/* Logo */}
          <div className="mb-8">

            <Link to="/" className="inline-flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl flex items-center justify-center brand-mark">

                <img
                  src={habitLogo}
                  alt="Habit Tracker"
                  className="w-full h-full object-contain"
                />

              </div>


              <span className="font-semibold text-lg">
                AI Habit Tracker
              </span>

            </Link>

          </div>


          {/* Heading */}
          <div className="mb-7">

            <div className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300 mb-3">
              Sign in
            </div>


            <h2 className="text-3xl font-semibold tracking-[-0.035em]">
              Welcome back
            </h2>


            <p className="text-sm text-muted mt-2">
              Log in to continue your streaks.
            </p>

          </div>


          {/* Login Form */}
          <form onSubmit={submit} className="space-y-4">


            {/* Email */}
            <div>

              <label className="label">
                Email
              </label>


              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoFocus
              />

            </div>


            {/* Password */}
            <div>

              <label className="label">
                Password
              </label>


              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

            </div>


            {/* Error */}
            {err && (
              <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {err}
              </div>
            )}


            {/* Sign In Button */}
            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}>

              {loading ? "Signing in..." : "Sign in"}

              {!loading && <ArrowRight size={15} />}

            </button>

          </form>

          {/* Register */}
          <div className="mt-6 pt-5 border-t divider text-sm text-soft text-center">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-brand-700 dark:text-brand-300 font-semibold hover:underline underline-offset-4"
            >
              Create one
            </Link>

          </div>


          {/* Back To Home */}
          <div className="mt-5 text-center">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-700 dark:hover:text-brand-300 transition"
            >
              <ArrowLeft size={16} />
              Return to home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}