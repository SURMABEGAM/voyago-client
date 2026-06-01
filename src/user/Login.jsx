import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import loginImg from "../assets/Login.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";

const Login = () => {
  const { googleLogin, resetPassword, setUser, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // ✅ Already logged in হলে redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(from, { replace: true });
    }
  }, []);

  // ── Toast style helper ───────────────────────────────────
  const toastStyle = (borderColor = "#1e293b") => ({
    background: "#0f172a",
    color: "#f1f5f9",
    border: `1px solid ${borderColor}`,
    borderRadius: "12px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "12px 18px",
  });

  // ── Email/Password Login ─────────────────────────────────
  const handleLogin = async (data) => {
    setIsSubmitting(true);
    setLoading(true);
    const loadingToast = toast.loading("Signing you in...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        data,
      );
      localStorage.setItem("token", res.data.token);
      setUser({
        role: res.data.role,
        email: data.email,
        token: res.data.token,
      });
      toast.dismiss(loadingToast);
      toast.success("Welcome back! 👋", {
        duration: 2500,
        style: toastStyle(),
        iconTheme: { primary: "#6366f1", secondary: "#f1f5f9" },
      });
      setTimeout(() => navigate(from, { replace: true }), 800);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || "Invalid email or password", {
        duration: 3000,
        style: toastStyle("#ef4444"),
        iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" },
      });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // ── Google Login ─────────────────────────────────────────
  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading("Connecting with Google...");
    try {
      const userCredential = await googleLogin();
      const email = userCredential.user.email;
      const name = userCredential.user.displayName;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/google-login`,
        { email, name },
      );
      localStorage.setItem("token", res.data.token);
      setUser({ role: res.data.role, email, token: res.data.token });
      toast.dismiss(loadingToast);
      toast.success(`Welcome, ${name?.split(" ")[0] || "back"}! 👋`, {
        duration: 2500,
        style: toastStyle(),
        iconTheme: { primary: "#6366f1", secondary: "#f1f5f9" },
      });
      setTimeout(() => navigate(from, { replace: true }), 800);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Google login failed. Try again.", {
        style: toastStyle("#ef4444"),
        iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" },
      });
    }
  };

  // ── Forgot Password ──────────────────────────────────────
  const handleForgot = async () => {
    const email = watch("email");
    if (!email) {
      toast("Please enter your email first", {
        icon: "✉️",
        style: toastStyle(),
      });
      return;
    }
    const loadingToast = toast.loading("Sending reset link...");
    try {
      await resetPassword(email);
      toast.dismiss(loadingToast);
      toast.success("Reset link sent! Check your inbox.", {
        duration: 3000,
        style: toastStyle(),
        iconTheme: { primary: "#6366f1", secondary: "#f1f5f9" },
      });
    } catch {
      toast.dismiss(loadingToast);
      toast.error("Failed to send reset email.", {
        style: toastStyle("#ef4444"),
        iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" },
      });
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { marginTop: "60px" },
        }}
      />

      <div className="min-h-screen flex">
        {/* ── Left Panel ── */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#080c14]">
          <img
            src={loginImg}
            alt="travel"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-900/60 to-transparent" />

          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            <div>
              <span className="text-white font-bold text-2xl tracking-tight">
                VOYAGO
              </span>
            </div>

            <div>
              <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                Your journey
                <br />
                <span className="text-indigo-400">starts here.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                Book tickets, track trips, and explore destinations — all in one
                place.
              </p>
              <div className="mt-10 flex gap-6">
                {["50K+ Routes", "200+ Cities", "4.9★ Rating"].map((s) => (
                  <div key={s}>
                    <p className="text-white font-semibold text-sm">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-slate-600 text-xs">
              © 2025 Voyago. All rights reserved.
            </p>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0f1a] px-6 py-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-white text-3xl font-bold tracking-tight mb-2">
                Sign in
              </h2>
              <p className="text-slate-500 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Create one free
                </Link>
              </p>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 mb-6 cursor-pointer"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-600 text-xs uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <MdOutlineEmail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full bg-white/5 border ${
                      errors.email ? "border-red-500/60" : "border-white/10"
                    } hover:border-white/20 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-slate-600 text-sm transition-all duration-200`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleForgot}
                    className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <MdLockOutline
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full bg-white/5 border ${
                      errors.password ? "border-red-500/60" : "border-white/10"
                    } hover:border-white/20 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-10 pr-11 py-3.5 text-white placeholder-slate-600 text-sm transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={18} />
                    ) : (
                      <AiOutlineEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3.5 text-sm transition-all duration-200 mt-2 cursor-pointer"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
