import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("http://localhost:3000/leads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setLeads(data.data || []);
      } catch (err) {
        console.error("Failed to load leads", err);
      }
    }

    if (token) {
      fetchLeads();
    }
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRM Dashboard</h1>

      <p>Welcome back 👋</p>

      <h2>Leads</h2>

      {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        <ul>
          {leads.map((lead) => (
            <li key={lead.id}>
              <strong>{lead.name}</strong> — {lead.email}
            </li>
          ))}
        </ul>
      )}
    <button onClick={() => window.location.reload()}>
        Logout
    </button>
    </div>
  );
}