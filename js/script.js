function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu.style.display === 'block') {
    menu.style.opacity = '0';
    setTimeout(() => { menu.style.display = 'none'; }, 300);
  } else {
    menu.style.display = 'block';
    setTimeout(() => { menu.style.opacity = '1'; }, 10);
  }
}

function scrollToForm() {
  const formSection = document.getElementById('form');
  formSection.scrollIntoView({ behavior: 'smooth' });
}

function openImage(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
  setTimeout(() => { lightbox.style.opacity = '1'; }, 10);
}

document.getElementById('lightbox').addEventListener('click', function() {
  this.style.opacity = '0';
  setTimeout(() => { this.style.display = 'none'; }, 300);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({ top: targetElement.offsetTop - headerHeight, behavior: 'smooth' });
  });
});

function showTab(index) {
  const tabs = document.querySelectorAll('.tab');
  const image = document.getElementById('tab-image');
  const title = document.getElementById('tab-title');
  const list = document.getElementById('tab-list');

  tabs.forEach((tab, i) => tab.classList.toggle('active', i === index));

  if (index === 0) {
    image.src = "images/about/graduate.png";
    image.alt = "Образование";
    title.innerText = "Образование";
    list.innerHTML = `
      <li><span class="check-icon">✔</span> Специализированная школа для одарённых детей</li>
      <li><span class="check-icon">✔</span> Hertfordshire Independent Boarding School (UK)</li>
      <li><span class="check-icon">✔</span> Бакалавр: английский и китайский языки</li>
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

document.querySelectorAll('.thumbnail-row img').forEach(thumb => {
  thumb.addEventListener('click', function () {
    const mainImage = document.querySelector('.main-certificate img');
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.src = this.src;
      mainImage.style.opacity = '1';
    }, 200);
  });
});

let slideIndex = 0;

function moveSlide(direction) {
  const slider = document.getElementById('reviews-slider');
  const cards = document.querySelectorAll('.review-card');
  const visibleCards = window.innerWidth <= 768 ? 1 : 3;
  const totalSlides = cards.length - visibleCards;

  slideIndex += direction;
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex > totalSlides) slideIndex = totalSlides;

  const cardWidth = cards[0].offsetWidth + 20;
  slider.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
}

function changeCertificate(src) {
  const mainImage = document.getElementById('main-cert-image');
  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = src;
    mainImage.style.opacity = '1';
  }, 150);
}

function openWhatsApp() {
  const phoneNumber = '+77473165588';
  const message = encodeURIComponent("Здравствуйте! Я хочу записаться на занятия по английскому языку.");
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function openTelegram() {
  window.open('https://t.me/kullinank', '_blank');
}

function getCurrentTranslateX() {
  const style = window.getComputedStyle(slider);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

window.addEventListener('resize', () => moveSlide(0));

const slider = document.getElementById('reviews-slider');
let startX = 0;
let isSwiping = false;
let initialTransform = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
  initialTransform = getCurrentTranslateX();
  slider.style.transition = 'none';
});

slider.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  slider.style.transform = `translateX(${initialTransform + diff}px)`;
});

slider.addEventListener('touchend', (e) => {
  if (!isSwiping) return;
  isSwiping = false;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  const threshold = 50;

  if (diff < -threshold) {
    moveSlide(1);
  } else if (diff > threshold) {
    moveSlide(-1);
  } else {
    moveSlide(0);
  }
  slider.style.transition = 'transform 0.5s ease';
});
