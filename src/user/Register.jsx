import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { auth } from "../firebase/Firebase.init";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import registerImg from "../assets/register (7).png";
import { AuthContext } from "../Context/Authcontext";

const Register = () => {
  const navigate = useNavigate();
  const { googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");

  const axiosSecure = UseAxiosSecure();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(); // already handled in AuthContext
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    return data.data.display_url;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoFile = e.target.photo.files[0];

    if (!name || !email || !password || !photoFile) {
      return setError("All fields are required");
    }

    if (!/[a-z]/.test(password))
      return setError("Password must include a lowercase letter");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    try {
      // Upload photo first
      const photoURL = await handleImageUpload(photoFile);

      // Create Firebase user
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(result.user, { displayName: name, photoURL });

      // Send user info to backend (without password!)
      await axiosSecure.post("/api/register", {
        name,
        email,
        photoURL,
        role: "user",
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to CodeGuru 🎉",
        confirmButtonColor: "#6366f1",
      }).then(() => navigate("/"));
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered!");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center">
      <img src={registerImg} className="hidden md:block h-full object-cover" />
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Name"
            className="input input-bordered w-full mb-2"
          />
          <input
            name="email"
            placeholder="Email"
            className="input input-bordered w-full mb-2"
          />
          <input type="file" name="photo" className="file-input w-full mb-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full mb-3"
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
        >
          Register with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
