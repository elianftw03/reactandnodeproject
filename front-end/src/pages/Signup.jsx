import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isBusiness: false,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (form.firstName.trim().length < 2) {
      newErrors.firstName = '"first" length must be at least 2 characters long';
    }

    if (!/^05\d{8}$/.test(form.phone)) {
      newErrors.phone = 'user "phone" must be a valid phone number';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'user "mail" must be a valid mail';
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{9,}$/.test(
        form.password
      )
    ) {
      newErrors.password =
        'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*';
    }

    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.street.trim()) newErrors.street = "Street is required";
    if (!form.houseNumber.trim())
      newErrors.houseNumber = "House number is required";

    return newErrors;
  };

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch("http://localhost:5050/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>REGISTER</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 48%" }}>
            <input
              name="firstName"
              placeholder="First name *"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}

            <input
              name="middleName"
              placeholder="Middle name"
              value={form.middleName}
              onChange={handleChange}
            />

            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div style={{ flex: "1 1 48%" }}>
            <input
              name="imageUrl"
              placeholder="Image url"
              value={form.imageUrl}
              onChange={handleChange}
            />

            <input
              name="imageAlt"
              placeholder="Image alt"
              value={form.imageAlt}
              onChange={handleChange}
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
            />

            <input
              name="country"
              placeholder="Country *"
              value={form.country}
              onChange={handleChange}
            />
            {errors.country && <p className="error">{errors.country}</p>}

            <input
              name="city"
              placeholder="City *"
              value={form.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}

            <input
              name="street"
              placeholder="Street *"
              value={form.street}
              onChange={handleChange}
            />
            {errors.street && <p className="error">{errors.street}</p>}

            <input
              name="houseNumber"
              placeholder="House number *"
              value={form.houseNumber}
              onChange={handleChange}
            />
            {errors.houseNumber && (
              <p className="error">{errors.houseNumber}</p>
            )}

            <input
              name="zip"
              placeholder="Zip"
              value={form.zip}
              onChange={handleChange}
            />
          </div>
        </div>

        <label style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            name="isBusiness"
            checked={form.isBusiness}
            onChange={handleChange}
          />{" "}
          Signup as business
        </label>

        <div className="button-group">
          <button type="button" className="cancel-button">
            CANCEL
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
