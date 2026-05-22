import { useContext } from "react";
import { AuthContext } from "../../Context/Authcontext";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card bg-base-100 shadow-xl p-6 max-w-lg">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt=""
          className="w-28 h-28 rounded-full border-4 border-primary"
        />

        <h2 className="text-2xl font-bold mt-4">{user?.displayName}</h2>

        <p>{user?.email}</p>

        <div className="badge badge-primary mt-2">Admin</div>
      </div>
    </div>
  );
};

export default AdminProfile;
