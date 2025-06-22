import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import "./CardDetails.css";

function CardDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [card, setCard] = useState(null);

  useEffect(() => {
    axios
      .get(`/cards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCard(res.data))
      .catch((err) => console.error("Failed to fetch card:", err));
  }, [id, token]);

  if (!card) return <p>Loading card details...</p>;

  return (
    <div className="card-details-container">
      <h2>{card.title}</h2>
      <img
        src={card.imageUrl || "https://via.placeholder.com/600x400"}
        alt={card.title}
      />
      <p>
        <strong>Description:</strong> {card.description}
      </p>
      <p>
        <strong>Phone:</strong> {card.phone}
      </p>
      <p>
        <strong>Address:</strong> {card.address}
      </p>
      <p>
        <strong>Email:</strong> {card.email}
      </p>
    </div>
  );
}

export default CardDetails;
