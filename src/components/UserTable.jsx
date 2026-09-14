export function UserTable({ users }) {
  console.log("passed to User Table:", users);
  return (
    <div>
      <table className="w-full border-separate">
        <thead>
          <tr className="bg-gray-200">
            <th className="border rounded-tl-lg p-2">Name</th>
            <th className="border p-2">Last name</th>
            <th className="border p-2 rounded-tr-lg">Position</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
