import React, { useState } from "react";
import Ticket from "./Ticket";
import "./TicketList.css";

const TicketList = ({
  tickets,
  onDeleteTicket,
  onBookTicket,
  onEditTicket,
}) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Фільтрація квитків
  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  // Сортування квитків
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date) - new Date(b.date);
      case "price":
        return a.price - b.price;
      case "from":
        return a.from.localeCompare(b.from);
      default:
        return 0;
    }
  });

  if (tickets.length === 0) {
    return (
      <div className="ticket-list">
        <div className="empty-state">
          <h3>🎫 Немає доданих квитків</h3>
          <p>Додайте перший квиток, використовуючи форму вище</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <div className="list-header">
        <h2>📋 Список квитків ({sortedTickets.length})</h2>

        <div className="controls">
          <div className="filter-control">
            <label>Фільтр:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Всі</option>
              <option value="available">Доступні</option>
              <option value="booked">Заброньовані</option>
            </select>
          </div>

          <div className="sort-control">
            <label>Сортувати:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">За датою</option>
              <option value="price">За ціною</option>
              <option value="from">За пунктом</option>
            </select>
          </div>
        </div>
      </div>

      <div className="tickets-grid">
        {sortedTickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            onDelete={onDeleteTicket}
            onBook={onBookTicket}
            onEdit={onEditTicket}
          />
        ))}
      </div>

      <div className="list-stats">
        <p>
          Всього: {tickets.length} | Доступні:{" "}
          {tickets.filter((t) => t.status === "available").length} |
          Заброньовані: {tickets.filter((t) => t.status === "booked").length}
        </p>
      </div>
    </div>
  );
};

export default TicketList;
