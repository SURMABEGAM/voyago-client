import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";

import { useForm } from "react-hook-form";
import loginImg from "../assets/Login.jpg";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInUser, googleLogin, resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    await signInUser(data.email, data.password);
    navigate(from);
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
    navigate(from);
  };

  const handleForgot = async () => {
    const email = watch("email");
    if (!email) return alert("Enter email first");
    await resetPassword(email);
    alert("Password reset email sent");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center">
      <img src={loginImg} className="hidden md:block h-full object-cover" />

      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="input input-bordered w-full mb-3"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500"> email is required </p>
          )}
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-2"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500"> Password is required </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500"> Password is required </p>
          )}
          <p
            onClick={handleForgot}
            className="text-sm text-blue-600 cursor-pointer"
          >
            Forgot password?
          </p>

          <button className="btn btn-primary w-full mt-4">Login</button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
        >
          Login with Google
        </button>

        <p className="text-center mt-4">
          New here?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
