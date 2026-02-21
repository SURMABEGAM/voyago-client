import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Context/Authcontext";

const Role = () => {
  const { user,loading } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const axiosSecure = UseAxiosSecure(); // ✅ hook call

  useEffect(() => {
    if (loading) {
    
      return; // wait until loading is false
    } 
    const fetchRole = async () => {
      if (!user?.email) {
        setRole("");
        setRoleLoading(false);
        return;
      }

      try {
        const encodedEmail = encodeURIComponent(user.email);
        const res = await axiosSecure.get(`/users/role/${encodedEmail}`); // ✅ correct route
        setRole(res.data.role || "user");
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        setRole("user"); // default
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user,loading, axiosSecure]);

  return { role, roleLoading };
};

export default Role;
