"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  if (status === "loading") return <p>Yükleniyor...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p className="mb-6">Hoş geldin, {session?.user?.name}</p>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">İsim</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
