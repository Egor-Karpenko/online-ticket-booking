// Слайдер зображень
class ImageSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".slide");
    this.totalSlides = this.slides.length;
    this.init();
  }

  init() {
    // Додаємо обробники подій для кнопок
    document
      .querySelector(".prev")
      .addEventListener("click", () => this.prevSlide());
    document
      .querySelector(".next")
      .addEventListener("click", () => this.nextSlide());

    // Автоматична зміна слайдів
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlider();
  }

  updateSlider() {
    const slidesContainer = document.querySelector(".slides");
    slidesContainer.style.transform = `translateX(-${
      this.currentSlide * 100
    }%)`;

    // Оновлюємо активний клас
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentSlide);
    });
  }
}

// Валідація форми
class FormValidator {
  constructor() {
    this.form = document.getElementById("ticketForm");
    this.messageDiv = document.getElementById("formMessage");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.validateForm(e));
  }

  validateForm(event) {
    event.preventDefault();

    const formData = {
      from: document.getElementById("from").value.trim(),
      to: document.getElementById("to").value.trim(),
      date: document.getElementById("date").value,
      passengers: document.getElementById("passengers").value,
    };

    // Перевірка заповненості полів
    if (
      !formData.from ||
      !formData.to ||
      !formData.date ||
      !formData.passengers
    ) {
      this.showMessage("Будь ласка, заповніть всі поля", "error");
      return;
    }

    // Перевірка дати
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.showMessage("Дата не може бути в минулому", "error");
      return;
    }

    // Перевірка маршруту
    if (formData.from === formData.to) {
      this.showMessage(
        "Пункт відправлення та призначення не можуть співпадати",
        "error"
      );
      return;
    }

    // Якщо все валідно
    this.showMessage(
      `Успішно! Знайдено квитки з ${formData.from} до ${formData.to} на ${formData.date} для ${formData.passengers} пасажирів`,
      "success"
    );

    // Додаємо знайдений квиток
    this.addFoundTicket(formData);

    // Очищаємо форму
    this.form.reset();
  }

  showMessage(text, type) {
    this.messageDiv.textContent = text;
    this.messageDiv.className = `message ${type}`;

    // Ховаємо повідомлення через 5 секунд
    setTimeout(() => {
      this.messageDiv.textContent = "";
      this.messageDiv.className = "message";
    }, 5000);
  }

  addFoundTicket(formData) {
    const ticketsList = document.getElementById("ticketsList");
    const ticketId = Date.now();

    const ticketCard = document.createElement("div");
    ticketCard.className = "ticket-card";
    ticketCard.innerHTML = `
            <h4>${formData.from} → ${formData.to}</h4>
            <p><strong>Дата:</strong> ${formData.date}</p>
            <p><strong>Пасажири:</strong> ${formData.passengers}</p>
            <p><strong>Статус:</strong> Доступний</p>
            <p><strong>Ціна:</strong> ${
              parseInt(formData.passengers) * 450
            } грн</p>
            <button onclick="bookTicket(${ticketId})" class="book-btn">Забронювати</button>
        `;

    ticketsList.appendChild(ticketCard);
  }
}

// Менеджер квитків
class TicketManager {
  constructor() {
    this.tickets = [];
    this.init();
  }

  init() {
    // Додаємо обробник для кнопки додавання тестового квитка
    document
      .getElementById("addTicketBtn")
      .addEventListener("click", () => this.addSampleTicket());
  }

  addSampleTicket() {
    const routes = [
      { from: "Київ", to: "Львів", price: 450 },
      { from: "Харків", to: "Одеса", price: 620 },
      { from: "Дніпро", to: "Ужгород", price: 780 },
    ];

    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    const randomDate = new Date(
      Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0];

    const formData = {
      from: randomRoute.from,
      to: randomRoute.to,
      date: randomDate,
      passengers: Math.floor(Math.random() * 4) + 1,
      price: randomRoute.price,
    };

    // Використовуємо метод валідатора для додавання квитка
    const validator = new FormValidator();
    validator.addFoundTicket(formData);
  }
}

// Функція для бронювання квитка
function bookTicket(ticketId) {
  alert(`Квиток #${ticketId} успішно заброньовано!`);

  // Оновлюємо статус квитка (в реальному додатку тут був би запит до сервера)
  const bookButtons = document.querySelectorAll(".book-btn");
  bookButtons.forEach((btn) => {
    if (btn.textContent === "Забронювати") {
      btn.textContent = "Заброньовано";
      btn.style.background = "#27ae60";
      btn.disabled = true;
    }
  });
}

// jQuery функції для демонстрації
$(document).ready(function () {
  // Плавна прокрутка до секцій
  $("nav a").on("click", function (e) {
    e.preventDefault();
    const target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800
      );
    }
  });

  // Анімація карток квитків при появі
  $(".ticket-card").hover(
    function () {
      $(this).animate(
        {
          backgroundColor: "#e8f4fc",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        },
        200
      );
    },
    function () {
      $(this).animate(
        {
          backgroundColor: "#f8f9fa",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        },
        200
      );
    }
  );
});

// Ініціалізація всіх класів при завантаженні сторінки
document.addEventListener("DOMContentLoaded", function () {
  new ImageSlider();
  new FormValidator();
  new TicketManager();

  console.log("Онлайн-сервіс бронювання квитків ініціалізовано!");
});
