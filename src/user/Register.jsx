import { useContext, useState } from "react";

import { AuthContext } from "../Context/Authcontext";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain an uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must contain a lowercase letter");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    createUser(email, password)
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          required
          className="w-full mb-2 p-2 border"
        />
        <input
          name="email"
          placeholder="Email"
          required
          className="w-full mb-2 p-2 border"
        />
        <input
          name="photo"
          placeholder="Photo URL"
          className="w-full mb-2 p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-2 p-2 border"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-2 mt-3">
          Register
        </button>
      </form>

      <button onClick={handleGoogleLogin} className="w-full border py-2 mt-3">
        Register with Google
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-blue-600" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
