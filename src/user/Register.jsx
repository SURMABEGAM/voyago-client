import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import registerImg from "../assets/register (7).png";
import { AuthContext } from "../Context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineEmail,
  MdLockOutline,
  MdPersonOutline,
  MdOutlinePhoto,
} from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoName, setPhotoName] = useState("");

  const { googleLogin, createUser, updateUserProfile, setUser, setLoading } =
    useContext(AuthContext);

  // ✅ useEffect দিয়ে token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const toastStyle = (borderColor = "#1e293b") => ({
    background: "#0f172a",
    color: "#f1f5f9",
    border: `1px solid ${borderColor}`,
    borderRadius: "12px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "12px 18px",
  });

  // ── Google Register ──────────────────────────────────────
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
      toast.success(`Welcome aboard, ${name?.split(" ")[0] || ""}! 🎉`, {
        duration: 2500,
        style: toastStyle(),
        iconTheme: { primary: "#6366f1", secondary: "#f1f5f9" },
      });

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Google login failed. Try again.", {
        style: toastStyle("#ef4444"),
        iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" },
      });
    }
  };

  // ── Image Upload ─────────────────────────────────────────
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
      { method: "POST", body: formData },
    );
    const data = await res.json();
    return data.data.display_url;
  };

  // ── Register ─────────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoFile = e.target.photo.files[0];

    if (!photoFile) {
      toast("Please select a profile photo", {
        icon: "📸",
        style: toastStyle(),
      });
      setIsSubmitting(false);
      setLoading(false);
      return;
    }

    const loadingToast = toast.loading("Creating your account...");

    try {
      // 1. Image upload
      const photoURL = await handleImageUpload(photoFile);

      // 2. Firebase user create
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });

      // 3. Backend এ save
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        name,
        email,
        password,
        role: "user",
        photoURL,
      });

      // 4. ✅ Login করে JWT নাও
      const loginRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { email, password },
      );

      localStorage.setItem("token", loginRes.data.token);
      setUser({
        role: loginRes.data.role,
        email,
        token: loginRes.data.token,
      });

      toast.dismiss(loadingToast);
      toast.success("Account created! Welcome 🎉", {
        duration: 2500,
        style: toastStyle(),
        iconTheme: { primary: "#6366f1", secondary: "#f1f5f9" },
      });

      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      toast.dismiss(loadingToast);

      // ✅ Firebase duplicate email error handle
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login.", {
          style: toastStyle("#ef4444"),
          iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" },
        });
      } else {
        toast.error(
          err.response?.data?.message || "Registration failed. Try again.",
          {
            style: toastStyle("#ef4444"),
            iconTheme: { primary: "#ef4444", secondary: "#f1f5f9" },
          },
        );
      }
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ style: { marginTop: "60px" } }}
      />

      <div className="min-h-screen flex">
        {/* ── Left Panel ── */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#080c14]">
          <img
            src={registerImg}
            alt="register"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
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
                Join millions
                <br />
                <span className="text-indigo-400">of travelers.</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                Create your free account and start exploring the world, one
                ticket at a time.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: "Free to join", icon: "✦" },
                  { label: "Instant booking", icon: "⚡" },
                  { label: "Secure payments", icon: "🔒" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-indigo-400 text-xs">{item.icon}</span>
                    <p className="text-slate-400 text-xs">{item.label}</p>
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
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0f1a] px-6 py-12 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-white text-3xl font-bold tracking-tight mb-2">
                Create account
              </h2>
              <p className="text-slate-500 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 mb-6 cursor-pointer"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-600 text-xs uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <MdPersonOutline
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-slate-600 text-sm transition-all duration-200"
                  />
                </div>
              </div>

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
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-10 pr-4 py-3.5 text-white placeholder-slate-600 text-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                  Profile Photo
                </label>
                <label className="flex items-center gap-3 w-full bg-white/5 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3.5 cursor-pointer transition-all duration-200 group">
                  <MdOutlinePhoto
                    size={18}
                    className="text-slate-500 group-hover:text-indigo-400 transition-colors flex-shrink-0"
                  />
                  <span className="text-sm text-slate-500 group-hover:text-slate-400 truncate transition-colors">
                    {photoName || "Choose a photo..."}
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    required
                    className="hidden"
                    onChange={(e) =>
                      setPhotoName(e.target.files[0]?.name || "")
                    }
                  />
                </label>
              </div>

              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <MdLockOutline
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={6}
                    placeholder="Min. 6 characters"
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl pl-10 pr-11 py-3.5 text-white placeholder-slate-600 text-sm transition-all duration-200"
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
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3.5 text-sm transition-all duration-200 mt-2 cursor-pointer"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-center text-slate-600 text-xs mt-6">
              By registering, you agree to our{" "}
              <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
                Terms
              </span>
              {" & "}
              <span className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
