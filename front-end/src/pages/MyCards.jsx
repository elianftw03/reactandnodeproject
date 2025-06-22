import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./MyCards.css";

function MyCards() {
  const [summary, setSummary] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get("/cards/dashboard-summary", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Failed to fetch dashboard summary:", err));
  }, [token]);

  if (!summary) return <p>Loading dashboard...</p>;

  return (
    <div className="card-list-container">
      <h2>My Business Dashboard</h2>
      <p>
        <strong>Total Cards Created:</strong> {summary.totalCreated}
      </p>
      <p>
        <strong>Total Cards Favorited:</strong> {summary.totalFavorited}
      </p>

      <div className="createnewcard">
        <Link to="/cards/new">
          <button>Create New Card</button>
        </Link>
      </div>

      <h3>Recent Cards</h3>
      <div className="card-grid">
        {summary.recentCards.map((card) => (
          <div key={card._id} className="card">
            <img
              src={
                card.imageUrl ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={card.title}
            />
            <h4>{card.title}</h4>
            <p>{card.description}</p>
            <Link to={`/cards/${card._id}/edit`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCards;
