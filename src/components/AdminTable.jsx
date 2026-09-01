import { useState } from "react";

export function AdminTable({ users, setUsers, fetchUsers, API }) {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    position: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create user");
      await fetchUsers();
      // Reset the form
      setForm({
        name: "",
        lastname: "",
        position: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="pb-3">
        <input
          onChange={handleChange}
          value={form.name}
          name="name"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          value={form.lastname}
          name="lastname"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Last name"
        />
        <input
          onChange={handleChange}
          value={form.position}
          name="position"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Position"
        />
        <button
          type="submit"
          className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mx-1 rounded-4xl"
        >
          Save new user
        </button>
      </form>
      <table className="w-full border-separate">
        <thead>
          <tr className="text-center font-bold bg-gray-200">
            <th className="border rounded-tl-lg p-2">Name</th>
            <th className="border p-2">Last name</th>
            <th className="border p-2">Position</th>
            <th className="border rounded-tr-lg p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white">
              <td className="border p-2 ">{user.name}</td>
              <td className="border p-2 ">{user.lastname}</td>
              <td className="border p-2 ">{user.position}</td>
              <td className="border p-2 ">
                <button
                  onClick={() => handleDelete(user.id)}
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
