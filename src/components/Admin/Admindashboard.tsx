"use client";
import { useState } from "react";
import ManageAdmin from "./ManageAdmin";
import ManageProperty from "./ManageProperty";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  const [selectedModule, setSelectedModule] = useState("ManageProperty");

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-dark"
    >
      {/* Sidebar */}
      <aside className="w-64 bg-gray-00 p-4 flex flex-col">
        {/* Added margin-top to move "Admin Panel" lower */}
        <h2 className="text-xl font-bold text-center mt-[2.5cm]">Admin Panel</h2>
        <nav className="space-y-2 mt-4">
          {[
            { name: "Manage Admin", key: "ManageAdmin" },
            { name: "Manage Property", key: "ManageProperty" },
            { name: "Manage Users", key: "ManageUsers" },
          ].map((item) => (
            <button
              key={item.key}
              className={`block w-full py-3 px-4 rounded-md transition-all ${
                selectedModule === item.key
                  ? "bg-blue-600 text-white font-semibold dark:text-black"
                  : "bg-gray-200 hover:bg-gray-600 dark:text-black"
              }`}
              onClick={() => setSelectedModule(item.key)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mt-20 p-8 overflow-auto">
        <div className="p-6 rounded-lg shadow-lg">
          {selectedModule === "ManageAdmin" && <ManageAdmin />}
          {selectedModule === "ManageProperty" && <ManageProperty />}
          {selectedModule === "ManageUsers" && <ManageUsers />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
