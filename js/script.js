// Открыть / закрыть мобильное меню
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu.style.display === 'block') {
    menu.style.opacity = '0';
    setTimeout(() => {
      menu.style.display = 'none';
    }, 300);
  } else {
    menu.style.display = 'block';
    setTimeout(() => {
      menu.style.opacity = '1';
    }, 10);
  }
}

// Плавная прокрутка к форме записи
function scrollToForm() {
  const formSection = document.getElementById('form');
  formSection.scrollIntoView({ behavior: 'smooth' });
}

// Открыть сертификат в лайтбоксе
function openImage(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
  setTimeout(() => {
    lightbox.style.opacity = '1';
  }, 10);
}

// Закрыть лайтбокс по клику
document.getElementById('lightbox').addEventListener('click', function() {
  this.style.opacity = '0';
  setTimeout(() => {
    this.style.display = 'none';
  }, 300);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute('href'));
    const headerHeight = document.querySelector('header').offsetHeight;

    window.scrollTo({
      top: targetElement.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  });
});

// Переключение вкладок "Обо мне"
function showTab(index) {
  const tabs = document.querySelectorAll('.tab');
  const image = document.getElementById('tab-image');
  const title = document.getElementById('tab-title');
  const list = document.getElementById('tab-list');

  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });

  if (index === 0) {
    image.src = "images/about/graduate.png";
    image.alt = "Образование";
    title.innerText = "Образование";
    list.innerHTML = `
      <li><span class="check-icon">✔</span> Специализированная Школа для Одаренных Детей с Обучением на Трех Языках</li>
      <li><span class="check-icon">✔</span> Английская школа Hertfordshire Independent Boarding School, UK</li>
      <li><span class="check-icon">✔</span> Бакалавр по специальности: Английский и Китайский языки</li>
      <li><span class="check-icon">✔</span> Магистр педагогических наук</li>
    `;
  } else if (index === 1) {
    image.src = "images/about/work.png";
    image.alt = "Опыт работы";
    title.innerText = "Опыт работы";
    list.innerHTML = `
      <li><span class="check-icon">✔</span> Преподавание в частных школах</li>
      <li><span class="check-icon">✔</span> Подготовка учеников к IELTS</li>
      <li><span class="check-icon">✔</span> Разработка индивидуальных программ</li>
    `;
  } else if (index === 2) {
    image.src = "images/about/online.png";
    image.alt = "Онлайн обучение";
    title.innerText = "Онлайн обучение";
    list.innerHTML = `
      <li><span class="check-icon">✔</span> Онлайн-занятия через Zoom</li>
      <li><span class="check-icon">✔</span> Постоянная поддержка учеников</li>
      <li><span class="check-icon">✔</span> Онлайн-группы для подготовки к экзаменам</li>
    `;
  }
}

// Слайдер отзывов
let slideIndex = 1;
const slider = document.getElementById('reviews-slider');
const cards = document.querySelectorAll('.review-card');
const cardWidth = cards[0].offsetWidth + 20;
const totalCards = cards.length;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let isTransitioning = false;

function updateSlide() {
  slider.style.transition = 'transform 0.5s ease';
  slider.style.transform = `translateX(${-slideIndex * cardWidth}px)`;
}

updateSlide();

slider.addEventListener('touchstart', (e) => {
  if (isTransitioning) return; // блокируем во время перескока
  startX = e.touches[0].clientX;
  isDragging = true;
  slider.style.transition = 'none'; // выключаем плавность во время тача
  prevTranslate = -slideIndex * cardWidth;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDragging || isTransitioning) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('touchend', (e) => {
  if (isTransitioning) return;
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50) {
    moveSlide(1);
  } else if (movedBy > 50) {
    moveSlide(-1);
  } else {
    updateSlide();
  }
});

function moveSlide(direction) {
  if (isTransitioning) return;
  isTransitioning = true;
  slideIndex += direction;
  slider.style.transition = 'transform 0.5s ease';
  slider.style.transform = `translateX(${-slideIndex * cardWidth}px)`;

  slider.addEventListener('transitionend', handleTransitionEnd, { once: true });
}

function handleTransitionEnd() {
  if (slideIndex === totalCards - 1) {
    slider.style.transition = 'none';
    slideIndex = 1;
    slider.style.transform = `translateX(${-slideIndex * cardWidth}px)`;
  }
  if (slideIndex === 0) {
    slider.style.transition = 'none';
    slideIndex = totalCards - 2;
    slider.style.transform = `translateX(${-slideIndex * cardWidth}px)`;
  }
  
  setTimeout(() => {
    slider.style.transition = 'transform 0.5s ease'; // включаем обратно анимацию
    isTransitioning = false;
  }, 20); // маленькая задержка, чтобы браузер успел обработать перескок
}
