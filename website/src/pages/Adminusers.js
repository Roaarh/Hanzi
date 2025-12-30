// src/pages/AdminUsers.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Admin-panel.css";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users);
        setLoading(false);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchUsers();
  }, [navigate]);

  const startEditUser = (user) => {
    setEditingUser(user.id);
    setUserForm({ name: user.name, email: user.email });
  };

  const cancelEditUser = () => {
    setEditingUser(null);
    setUserForm({ name: "", email: "" });
  };

  const saveUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5001/api/admin/users/${id}`, userForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(u => u.id === id ? { ...u, ...userForm } : u));
      cancelEditUser();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <div className="admin-section"><h2 className="admin-section-title">Loading...</h2></div>;

  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Users Management</h2>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      value={userForm.name}
                      onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                      className="admin-table input"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser === user.id ? (
                    <input
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      className="admin-table input"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  <span className={user.role === 'admin' ? 'admin-role' : 'user-role'}>
                    {user.role}
                  </span>
                </td>
                <td>
                  {editingUser === user.id ? (
                    <>
                      <button onClick={() => saveUser(user.id)} className="admin-small-btn primary">Save</button>
                      <button onClick={cancelEditUser} className="admin-small-btn">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditUser(user)} className="admin-small-btn primary">Edit</button>
                      <button onClick={() => deleteUser(user.id)} className="admin-small-btn danger">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
