import { useState } from "react";
import API from "../../api/api";

export default function AddMember() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/members", {
        ...form,
        role: "member",
      });

      alert("Member created successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to create member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="input"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="input"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="input"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="input"
      />

      <button disabled={loading} type="submit">
        {loading ? "Creating..." : "Add Member"}
      </button>
    </form>
  );
}