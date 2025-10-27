import React, { useState } from "react";
import "./Ticket.css";

const Ticket = ({ ticket, onDelete, onBook, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    from: ticket.from,
    to: ticket.to,
    date: ticket.date,
    price: ticket.price,
  });

  const handleEdit = () => {
    if (isEditing) {
      onEdit(ticket.id, editData);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditData({
      from: ticket.from,
      to: ticket.to,
      date: ticket.date,
      price: ticket.price,
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBook = () => {
    onBook(ticket.id);
  };

  const handleDelete = () => {
    if (window.confirm("Ви впевнені, що хочете видалити цей квиток?")) {
      onDelete(ticket.id);
    }
  };

  const statusColors = {
    available: "#27ae60",
    booked: "#e74c3c",
  };

  const statusText = {
    available: "Доступний",
    booked: "Заброньовано",
  };

  return (
    <div
      className="ticket-card"
      style={{ borderLeftColor: statusColors[ticket.status] }}
    >
      <div className="ticket-header">
        {isEditing ? (
          <input
            type="text"
            name="from"
            value={editData.from}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <h3>{ticket.from}</h3>
        )}
        <span className="arrow">→</span>
        {isEditing ? (
          <input
            type="text"
            name="to"
            value={editData.to}
            onChange={handleChange}
            className="edit-input"
          />
        ) : (
          <h3>{ticket.to}</h3>
        )}
      </div>

      <div className="ticket-details">
        <div className="detail">
          <span className="label">📅 Дата:</span>
          {isEditing ? (
            <input
              type="date"
              name="date"
              value={editData.date}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <span>{ticket.date}</span>
          )}
        </div>

        <div className="detail">
          <span className="label">👥 Пасажири:</span>
          <span>{ticket.passengers}</span>
        </div>

        <div className="detail">
          <span className="label">💰 Ціна:</span>
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleChange}
              className="edit-input"
            />
          ) : (
            <span>{ticket.price} грн</span>
          )}
        </div>

        <div className="detail">
          <span className="label">📊 Статус:</span>
          <span
            className="status-badge"
            style={{ backgroundColor: statusColors[ticket.status] }}
          >
            {statusText[ticket.status]}
          </span>
        </div>

        {ticket.createdAt && (
          <div className="detail">
            <span className="label">🕒 Створено:</span>
            <span>{ticket.createdAt}</span>
          </div>
        )}
      </div>

      <div className="ticket-actions">
        {ticket.status === "available" && !isEditing && (
          <button className="book-btn" onClick={handleBook}>
            🎫 Забронювати
          </button>
        )}

        <button
          className={isEditing ? "save-btn" : "edit-btn"}
          onClick={handleEdit}
        >
          {isEditing ? "💾 Зберегти" : "✏️ Редагувати"}
        </button>

        {isEditing ? (
          <button className="cancel-btn" onClick={handleCancel}>
            ❌ Скасувати
          </button>
        ) : (
          <button className="delete-btn" onClick={handleDelete}>
            🗑️ Видалити
          </button>
        )}
      </div>
    </div>
  );
};

export default Ticket;
