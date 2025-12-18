import { useContext, useState } from "react";

import { AuthContext } from "../Context/Authcontext";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => navigate(from))
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => navigate(from))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full mb-3 p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-2 p-2 border"
        />

        <p className="text-sm text-blue-600 cursor-pointer mb-2">
          Forgot Password?
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-2 mt-3">
          Login
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="w-full border py-2 mt-3">
        Login with Google
      </button>

      <p className="text-center mt-4">
        New here?{" "}
        <Link className="text-blue-600" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
