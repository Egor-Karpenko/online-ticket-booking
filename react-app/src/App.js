import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    price: "",
  });
  const [filter, setFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Завантаження з localStorage
  useEffect(() => {
    const savedTickets = localStorage.getItem("trainTickets");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  // Збереження в localStorage
  useEffect(() => {
    localStorage.setItem("trainTickets", JSON.stringify(tickets));
  }, [tickets]);

  // Автоматична зміна слайдів
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.from || !formData.to || !formData.date || !formData.price) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }

    const newTicket = {
      id: Date.now(),
      ...formData,
      status: "available",
      createdAt: new Date().toLocaleString(),
    };

    setTickets([...tickets, newTicket]);
    setFormData({
      from: "",
      to: "",
      date: "",
      passengers: "1",
      price: "",
    });

    alert("Квиток успішно додано!");
  };

  const deleteTicket = (id) => {
    if (window.confirm("Видалити цей квиток?")) {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    }
  };

  const bookTicket = (id) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "booked" } : ticket
      )
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const slides = [
    {
      image:
        "https://via.placeholder.com/800x400/4CAF50/white?text=Електронне+бронювання",
      text: "Електронне бронювання",
    },
    {
      image:
        "https://via.placeholder.com/800x400/2196F3/white?text=Вибір+місць",
      text: "Вибір місць у вагоні",
    },
    {
      image:
        "https://via.placeholder.com/800x400/FF9800/white?text=Мобільний+доступ",
      text: "Мобільний доступ",
    },
  ];

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <h1>🚂 React - Онлайн бронювання квитків</h1>
          <nav>
            <a href="#booking">Бронювання</a>
            <a href="#tickets">Квитки</a>
            <a href="#contacts">Контакти</a>
          </nav>
        </div>
      </header>

      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <h2>Зручне бронювання залізничних квитків</h2>
          <p>Оберіть маршрут, вагон та місце - все в кілька кліків!</p>
        </section>

        {/* Slider */}
        <section className="slider-section">
          <h3>Наші послуги</h3>
          <div className="slider">
            <div
              className="slides"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slide">
                  <img src={slide.image} alt={slide.text} />
                  <p>{slide.text}</p>
                </div>
              ))}
            </div>
            <button
              className="slider-btn prev"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
            >
              ‹
            </button>
            <button
              className="slider-btn next"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
            >
              ›
            </button>
          </div>
        </section>

        {/* Booking Form */}
        <section id="booking" className="booking-form">
          <h3>📝 Додати новий квиток</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Звідки:</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="Київ"
                  required
                />
              </div>

              <div className="form-group">
                <label>Куди:</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Львів"
                  required
                />
              </div>

              <div className="form-group">
                <label>Дата:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Пасажири:</label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
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
                onChange={handleInputChange}
                placeholder="450"
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              ➕ Додати квиток
            </button>
          </form>
        </section>

        {/* Tickets List */}
        <section id="tickets" className="tickets-section">
          <div className="section-header">
            <h3>🎫 Список квитків ({filteredTickets.length})</h3>
            <div className="filters">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Всі квитки</option>
                <option value="available">Доступні</option>
                <option value="booked">Заброньовані</option>
              </select>
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            <div className="empty-state">
              <p>Немає квитків. Додайте перший квиток!</p>
            </div>
          ) : (
            <div className="tickets-grid">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className={`ticket-card ${ticket.status}`}>
                  <div className="ticket-header">
                    <h3>
                      {ticket.from} → {ticket.to}
                    </h3>
                    <span className="ticket-price">{ticket.price} грн</span>
                  </div>

                  <div className="ticket-details">
                    <p>
                      <strong>📅 Дата:</strong> {ticket.date}
                    </p>
                    <p>
                      <strong>👥 Пасажири:</strong> {ticket.passengers}
                    </p>
                    <p>
                      <strong>📊 Статус:</strong>
                      <span className={`status ${ticket.status}`}>
                        {ticket.status === "available"
                          ? "Доступний"
                          : "Заброньовано"}
                      </span>
                    </p>
                    <p>
                      <strong>🕒 Створено:</strong> {ticket.createdAt}
                    </p>
                  </div>

                  <div className="ticket-actions">
                    {ticket.status === "available" && (
                      <button
                        className="btn btn-success"
                        onClick={() => bookTicket(ticket.id)}
                      >
                        🎫 Забронювати
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      🗑️ Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer id="contacts" className="app-footer">
        <div className="container">
          <p>© 2025 React - Онлайн бронювання квитків</p>
          <p>Телефон: +380-12-345-67-89 | Email: tickets@railway.ua</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
