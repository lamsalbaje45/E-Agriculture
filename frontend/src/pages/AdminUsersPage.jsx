import { useEffect, useState } from "react";
import api from "../api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const removeUser = async (id) => {
    await api.delete(`/users/${id}`);
    loadUsers();
  };

  return (
    <div className="glass rounded-[2rem] p-4 shadow-panel sm:p-6">
      <h1 className="font-display text-3xl text-bark sm:text-4xl">User management</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-bark/10 text-sm uppercase tracking-[0.2em] text-bark/60">
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Email</th>
              <th className="px-3 py-3">Role</th>
              <th className="px-3 py-3">Region</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-bark/10">
                <td className="px-3 py-4">{user.full_name}</td>
                <td className="px-3 py-4">{user.email}</td>
                <td className="px-3 py-4 capitalize">{user.role}</td>
                <td className="px-3 py-4">{user.region}</td>
                <td className="px-3 py-4">
                  <button className="rounded-full bg-clay px-3 py-2 text-sm font-semibold text-white" onClick={() => removeUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
