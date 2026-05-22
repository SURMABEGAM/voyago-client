import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("access-token");

    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
  };

  const updateRole = async (id, role) => {
    await axios.patch(`http://localhost:5000/api/users/role/${id}`, { role });

    Swal.fire({
      icon: "success",
      title: `User is now ${role}`,
    });

    fetchUsers();
  };

  const markFraud = async (id) => {
    await axios.patch(`http://localhost:5000/api/users/fraud/${id}`);

    Swal.fire({
      icon: "warning",
      title: "Vendor marked as fraud",
    });

    fetchUsers();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr className="bg-gray-500">
            <th className="text-shadow-black">Name</th>
            <th className="text-shadow-black">Email</th>
            <th className="text-shadow-black">Role</th>
            <th className="text-shadow-black">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="text-shadow-black">{user.name}</td>

              <td className="text-shadow-black">{user.email}</td>

              <td className="text-shadow-black">{user.role}</td>

              <td className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updateRole(user._id, "admin")}
                  className="btn btn-primary btn-sm"
                >
                  Make Admin
                </button>

                <button
                  onClick={() => updateRole(user._id, "vendor")}
                  className="btn btn-secondary btn-sm"
                >
                  Make Vendor
                </button>

                {user.role === "vendor" && (
                  <button
                    onClick={() => markFraud(user._id)}
                    className="btn btn-error btn-sm"
                  >
                    Mark Fraud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
