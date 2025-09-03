"use client";

import React, { useState } from "react";
import {
  Users as UsersIcon,
  Plus,
  Edit,
  Trash2,
  Shield,
  User,
  Crown,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "employee" | "user";
  joinDate: string;
  lastLogin: string;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  {
    id: "USR001",
    name: "Marco Bellacorte",
    email: "marco@bellavista.com",
    role: "admin",
    joinDate: "2020-01-15",
    lastLogin: "2025-01-15 09:30",
    status: "active",
  },
  {
    id: "USR002",
    name: "Sofia Rodriguez",
    email: "sofia@bellavista.com",
    role: "employee",
    joinDate: "2021-03-20",
    lastLogin: "2025-01-15 08:45",
    status: "active",
  },
  {
    id: "USR003",
    name: "John Smith",
    email: "john@email.com",
    role: "user",
    joinDate: "2024-12-01",
    lastLogin: "2025-01-14 19:20",
    status: "active",
  },
  {
    id: "USR004",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    role: "user",
    joinDate: "2024-11-15",
    lastLogin: "2025-01-13 18:30",
    status: "active",
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState("all");

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "employee":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4" />;
      case "employee":
        return <Shield className="w-4 h-4" />;
      case "user":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const promoteUser = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const newRole =
            user.role === "user"
              ? "employee"
              : user.role === "employee"
              ? "admin"
              : "admin";
          return { ...user, role: newRole as "admin" | "employee" | "user" };
        }
        return user;
      })
    );
  };

  const demoteUser = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          const newRole =
            user.role === "admin"
              ? "employee"
              : user.role === "employee"
              ? "user"
              : "user";
          return { ...user, role: newRole as "admin" | "employee" | "user" };
        }
        return user;
      })
    );
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) => roleFilter === "all" || user.role === roleFilter
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">
            Manage user accounts and permissions
          </p>
        </div>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {users.length}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <UsersIcon className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Crown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Employees</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {users.filter((u) => u.role === "employee").length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">
                {users.filter((u) => u.role === "user").length}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="employee">Employees</option>
            <option value="user">Customers</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleIcon(user.role)}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => promoteUser(user.id)}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors text-xs"
                        >
                          Promote
                        </button>
                      )}
                      {user.role !== "user" && (
                        <button
                          onClick={() => demoteUser(user.id)}
                          className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition-colors text-xs"
                        >
                          Demote
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
