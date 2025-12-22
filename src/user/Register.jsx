import { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import registerImg from "../assets/register (7).png";
import { auth } from "../firebase/Firebase.init";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleRegistration = async (data) => {
    const result = await createUser(data.email, data.password);
    console.log(result.user);
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`,
      formData
    );

    await updateUserProfile({
      displayName: data.name,
      photoURL: res.data.data.display_url,
    });

    await auth.currentUser.reload();
    navigate("/");
  };

  const handleGoogle = async () => {
    await googleLogin();
    navigate("/");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center">
      <img src={registerImg} className="hidden md:block h-full object-cover" />

      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4">Register</h2>

        <form onSubmit={handleSubmit(handleRegistration)}>
          <input
            {...register("name")}
            placeholder="Name"
            className="input input-bordered w-full mb-2"
          />
          <input
            {...register("email")}
            placeholder="Email"
            className="input input-bordered w-full mb-2"
          />
          <input
            type="file"
            {...register("photo")}
            className="file-input w-full mb-2"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input input-bordered w-full mb-3"
          />

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <button onClick={handleGoogle} className="btn btn-outline w-full mt-3">
          Register with Google
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
