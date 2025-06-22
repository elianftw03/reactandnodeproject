import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./CardList.css";

function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("/cards");
        setCards(response.data);
      } catch (err) {
        console.error("Failed to fetch cards:", err);
      }
    };

    fetchCards();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/cards/${id}`);
      setCards(cards.filter((card) => card._id !== id));
    } catch (err) {
      console.error("Failed to delete card:", err);
    }
  };

  const handleToggleFavorite = async (cardId) => {
    try {
      await axios.patch(`/cards/${cardId}/favorite`);
      // Refresh cards after toggling favorite
      const response = await axios.get("/cards");
      setCards(response.data);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <div className="card-list-container">
      <h2>All Cards</h2>
      {user?.role === "business" && (
        <div className="createnewcard">
          <Link to="/cards/new">+ Create New Card</Link>
        </div>
      )}
      <div className="card-grid">
        {cards.map((card) => (
          <Link to={`/cards/${card._id}`} key={card._id} className="card-link">
            <div className="card">
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

              {user && (
                <button
                  className={`favorite-button ${
                    card.favoritedBy?.includes(user.id) ? "favorited" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation
                    handleToggleFavorite(card._id);
                  }}
                >
                  {card.favoritedBy?.includes(user.id)
                    ? "★ Unfavorite"
                    : "☆ Favorite"}
                </button>
              )}

              {user?.role === "business" && user.id === card.userId && (
                <div className="card-actions">
                  <Link
                    to={`/cards/${card._id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(card._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardList;
