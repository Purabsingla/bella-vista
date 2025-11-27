"use client";

import React, { useEffect, useState } from "react";
import {
  Users as UsersIcon,
  Plus,
  Edit,
  Trash2,
  Shield,
  User,
  Crown,
  Search,
} from "lucide-react";

import EmployeeRegistrationModal, {
  EmployeeData,
} from "@/components/admin/EmployeeRegistration";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee" | "user";
  createdAt: string;
  lastLogin: string | null | undefined;
  status: "active" | "inactive";
}

// Keep mock data for initial render or fallback
const mockUsers: UserData[] = [
  {
    id: "USR001",
    name: "Marco Bellacorte",
    email: "marco@bellavista.com",
    role: "admin",
    createdAt: "2020-01-15",
    lastLogin: null,
    status: "active",
  },
  // ... (keep your existing mock data if needed for testing)
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState("all");
  const [open, setOpen] = React.useState(false);

  // Fetch Users
  useEffect(() => {
    const handleGetApiCall = async () => {
      try {
        const res = await fetch("/api/admin/users", { method: "GET" });
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    handleGetApiCall();
  }, []);

  const HandleClose = () => setOpen(false);

  const HandleSubmit = async (data: EmployeeData) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
          role: data.role,
        }),
      });

      const response = await res.json();
      if (response.success) {
        alert("User created successfully");
        // Optionally refresh user list here
      } else {
        alert("Error: " + response.error);
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred");
    }
    setOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-amber-950/30 text-amber-500 border-amber-500/20 ring-1 ring-amber-500/20";
      case "employee":
        return "bg-blue-950/30 text-blue-400 border-blue-500/20 ring-1 ring-blue-500/20";
      case "user":
        return "bg-stone-800 text-stone-400 border-stone-700";
      default:
        return "bg-stone-800 text-stone-400";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3 h-3" />;
      case "employee":
        return <Shield className="w-3 h-3" />;
      case "user":
        return <User className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    // Add API call here to delete from backend
  };

  const filteredUsers = users.filter(
    (user) => roleFilter === "all" || user.role === roleFilter
  );

  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return (
    <div
      className={`p-6 md:p-10 space-y-8 text-stone-200 ${manrope.className}`}
    >
      {/* Employee Registration Form */}
      <EmployeeRegistrationModal
        isOpen={open}
        onClose={HandleClose}
        onSubmit={HandleSubmit}
      />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-2`}
          >
            User Management
          </h1>
          <p className="text-stone-400 text-sm">
            Manage accounts, roles, and permissions.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-amber-600 text-white px-6 py-3 rounded-sm hover:bg-amber-500 transition-all duration-300 flex items-center gap-2 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Total Users
              </p>
              <p className={`${playfair.className} text-3xl text-white`}>
                {users.length}
              </p>
            </div>
            <div className="bg-stone-800 p-3 rounded-full">
              <UsersIcon className="w-5 h-5 text-stone-400" />
            </div>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Admins
              </p>
              <p className={`${playfair.className} text-3xl text-amber-500`}>
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <div className="bg-amber-900/20 p-3 rounded-full border border-amber-500/20">
              <Crown className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Employees
              </p>
              <p className={`${playfair.className} text-3xl text-blue-400`}>
                {users.filter((u) => u.role === "employee").length}
              </p>
            </div>
            <div className="bg-blue-900/20 p-3 rounded-full border border-blue-500/20">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Customers
              </p>
              <p className={`${playfair.className} text-3xl text-stone-300`}>
                {users.filter((u) => u.role === "user").length}
              </p>
            </div>
            <div className="bg-stone-800 p-3 rounded-full">
              <User className="w-5 h-5 text-stone-400" />
            </div>
          </div>
        </div>
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-6 mb-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-stone-950 border border-stone-800 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-stone-600 text-sm"
            />
          </div>
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full md:w-48 bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="employee">Employees</option>
              <option value="user">Customers</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- USERS TABLE --- */}
      <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-stone-950 border-b border-stone-800">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  User Profile
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Email Address
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Join Date
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Last Login
                </th>
                <th className="px-6 py-5 text-right text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-stone-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-300 font-bold text-sm border border-stone-700">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-white">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-300">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-400">
                      {formatDate(user.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-400">
                      {formatDate(user.lastLogin)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      {user.role === "admin" ? (
                        <button className="p-2 text-stone-500 hover:text-white hover:bg-stone-800 rounded-full transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-stone-500 hover:text-red-500 hover:bg-red-950/20 rounded-full transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
