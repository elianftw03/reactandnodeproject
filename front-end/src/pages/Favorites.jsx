import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../components/CardList.css";

function Favorites() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/cards/favorites");
        setCards(response.data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="spinner">Loading favorites...</div>;
  }

  return (
    <div className="card-list-container">
      <h2>My Favorite Cards</h2>
      <div className="createnewcard">
        <Link to="/cards">← Back to All Cards</Link>
      </div>
      <div className="card-grid">
        {cards.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            You haven't added any favorite cards yet.
          </p>
        ) : (
          cards.map((card) => (
            <div key={card._id} className="card">
              <img
                src={
                  card.imageUrl ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={card.title}
              />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <p>{card.phone}</p>
              <p>{card.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
