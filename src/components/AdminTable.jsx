import { useState } from "react";

export function AdminTable({ users, setUsers, fetchUsers, API }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to create user");
      }

      await fetchUsers();
      // Reset the form
      setForm({
        username: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    setError("");
    try {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="pb-3">
        <input
          onChange={handleChange}
          value={form.username}
          name="username"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          value={form.email}
          name="email"
          type="email"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          value={form.password}
          name="password"
          type="password"
          minLength={8}
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Password (8+)"
        />
        <select
          onChange={handleChange}
          value={form.role}
          name="role"
          className="bg-white mx-1 w-32 px-2 py-2 rounded border"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button
          type="submit"
          className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mx-1 rounded-4xl"
        >
          Save new user
        </button>
      </form>

      {error && <p className="pb-3 text-rose-600 font-bold">{error}</p>}

      <table className="w-full border-separate">
        <thead>
          <tr className="text-center font-bold bg-gray-200">
            <th className="border rounded-tl-lg p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border rounded-tr-lg p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white">
              <td className="border p-2 ">{user.username}</td>
              <td className="border p-2 ">{user.email}</td>
              <td className="border p-2 ">{user.role}</td>
              <td className="border p-2 ">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="cursor-pointer bg-rose-400 hover:bg-rose-500 text-white px-2 rounded-xl"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
