"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Table } from "../ui/Table";
import { Card } from "../ui/Card";

interface Admin {
  id: number;
  name: string;
  email: string;
}

const ManageAdmin = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  // Add new admin
  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return;
    setAdmins([...admins, { id: Date.now(), ...newAdmin }]);
    setNewAdmin({ name: "", email: "" });
  };

  // Delete admin
  const deleteAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  // Modify admin details
  const modifyAdmin = (id: number, key: keyof Admin, value: string) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, [key]: value } : admin
      )
    );
  };

  return (
    <div className="">
      <Card className="p-4 mb-4 border-black dark:border-white">
      <h2 className="text-xl mb-2">Manage Admin</h2>

      {/* Add Admin Form */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <Input
          placeholder="Enter Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <Button onClick={addAdmin} className="bg-blue-600">Add</Button>
      </div>
      </Card>

      {/* Admins Table */}
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="text-xl mb-2">
                <Input
                  value={admin.name}
                  onChange={(e) => modifyAdmin(admin.id, "name", e.target.value)}
                />
              </td>
              <td>
                <Input
                  value={admin.email}
                  onChange={(e) => modifyAdmin(admin.id, "email", e.target.value)}
                />
              </td>
              <td className="flex gap-2">
                <Button onClick={() => modifyAdmin(admin.id, "name", admin.name)} className="bg-green-500">Modify</Button>
                <Button onClick={() => deleteAdmin(admin.id)} className="bg-red-600">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageAdmin;
