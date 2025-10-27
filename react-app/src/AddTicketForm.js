import React, { useState } from "react";
import "./AddTicketForm.css";

const AddTicketForm = ({ onAddTicket }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очищаємо помилку при зміні поля
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.from.trim()) {
      newErrors.from = "Введіть пункт відправлення";
    }

    if (!formData.to.trim()) {
      newErrors.to = "Введіть пункт призначення";
    }

    if (!formData.date) {
      newErrors.date = "Виберіть дату";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Дата не може бути в минулому";
      }
    }

    if (formData.from === formData.to) {
      newErrors.to = "Пункти не можуть співпадати";
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = "Введіть коректну ціну";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onAddTicket(formData);
      setFormData({
        from: "",
        to: "",
        date: "",
        passengers: "1",
        price: "",
      });
      setErrors({});
      alert("Квиток успішно додано!");
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="add-ticket-form">
      <h2>📝 Додати новий квиток</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Звідки:</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              placeholder="Наприклад, Київ"
              className={errors.from ? "error" : ""}
            />
            {errors.from && <span className="error-text">{errors.from}</span>}
          </div>

          <div className="form-group">
            <label>Куди:</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="Наприклад, Львів"
              className={errors.to ? "error" : ""}
            />
            {errors.to && <span className="error-text">{errors.to}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Дата:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? "error" : ""}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label>Пасажири:</label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
            >
              <option value="1">1 пасажир</option>
              <option value="2">2 пасажири</option>
              <option value="3">3 пасажири</option>
              <option value="4">4 пасажири</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Ціна (грн):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Наприклад, 450"
            className={errors.price ? "error" : ""}
          />
          {errors.price && <span className="error-text">{errors.price}</span>}
        </div>

        <button type="submit" className="submit-btn">
          ➕ Додати квиток
        </button>
      </form>
    </div>
  );
};

export default AddTicketForm;
