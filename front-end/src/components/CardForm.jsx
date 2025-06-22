import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axiosConfig";
import "./CardForm.css";

function CardForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios
        .get(`/cards/${id}`)
        .then((res) => {
          setForm({
            title: res.data.title,
            description: res.data.description,
            phone: res.data.phone,
            email: res.data.email,
            address: res.data.address,
            imageUrl: res.data.imageUrl,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch card:", err);
        });
    }
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!/^\d{9,}$/.test(form.phone))
      newErrors.phone =
        "Phone must be at least 9 digits and contain only numbers";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`/cards/${id}`, form);
        alert("Card updated successfully");
      } else {
        await axios.post("/cards", form);
        alert("Card created successfully");
      }
      navigate("/my-cards");
    } catch (err) {
      console.error("Failed to save card:", err);
      alert("Error saving card");
    }
  };

  return (
    <div className="card-form">
      <h2>{isEditing ? "Edit Card" : "Create Card"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        {errors.title && <p className="error">{errors.title}</p>}

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">
          {isEditing ? "Update Card" : "Create Card"}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
