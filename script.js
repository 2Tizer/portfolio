// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Закрываем меню на мобильном
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Валидация формы
const form = document.getElementById('feedback-form');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

if (form && emailInput) {
    // Валидация в реальном времени
    emailInput.addEventListener('input', function() {
        if (!this.value) {
            emailError.style.display = 'none';
            return;
        }
        
        if (!validateEmail(this.value)) {
            emailError.textContent = 'Введите корректный email (например: name@example.com)';
            emailError.style.display = 'block';
            this.style.borderColor = '#ff4757';
        } else {
            emailError.style.display = 'none';
            this.style.borderColor = '#4a6cf7';
        }
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const emailValue = emailInput.value;
        
        // Проверяем обязательные поля
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff4757';
                isValid = false;
            } else {
                field.style.borderColor = '#4a6cf7';
            }
        });
        
        // Проверяем email
        if (!validateEmail(emailValue)) {
            emailError.textContent = 'Пожалуйста, введите корректный email';
            emailError.style.display = 'block';
            emailInput.style.borderColor = '#ff4757';
            isValid = false;
        }
        
        // Если всё ок
        if (isValid) {
            alert('Сообщение успешно отправлено! Спасибо за обратную связь.');
            form.reset();
            
            // Сбрасываем стили
            emailInput.style.borderColor = '#e0e0e0';
            emailError.style.display = 'none';
        }
    });
}

// Автоматический год в футере
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});