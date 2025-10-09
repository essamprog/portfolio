// تأثير شريط التنقل عند التمرير
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// قائمة الجوال (الهاتف المحمول)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');

    if (navLinks.classList.contains('active')) {
        // إذا القائمة مفتوحة، غير الأيقونة إلى X
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        // إذا أغلقت، أعد الأيقونة إلى bars
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// تفعيل ظهور العناصر عند التمرير
const observerOptions = {
    root: null,
    rootMargin: '0px',
    /* تعديل قيمة الظهور 
       0.05 = عندما يكون 5% من العنصر مرئيًا، سيظهر
    */
    threshold: 0.01
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));