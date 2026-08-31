/* NovaTech Solutions — Main JavaScript | 3LOGY Bootcamp 2026 */
document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initNavScroll();
    initScrollToTop();
    initContactForm();
    initServiceModal();
    initPortfolioFilter();
    initPortfolioModal();
});

function initMobileNav() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
        const open = menu.classList.toggle('active');
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });
}

function initNavScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    function update() { header.classList.toggle('scrolled', window.scrollY > 50); }
    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initScrollToTop() {
    const button = document.getElementById('scroll-top-btn');
    if (!button) return;
    window.addEventListener('scroll', function () {
        button.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    button.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const fields = {
        name: document.getElementById('full-name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    const errors = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        subject: document.getElementById('subject-error'),
        message: document.getElementById('message-error')
    };
    const success = document.getElementById('form-success');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearError(key) {
        if (errors[key]) errors[key].textContent = '';
        if (fields[key]) fields[key].classList.remove('input-error');
    }
    function showError(key, message) {
        if (errors[key]) errors[key].textContent = message;
        if (fields[key]) fields[key].classList.add('input-error');
    }
    Object.keys(fields).forEach(function (key) {
        fields[key].addEventListener('input', function () { clearError(key); });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        Object.keys(errors).forEach(clearError);
        if (success) success.textContent = '';
        let valid = true;

        if (!fields.name.value.trim()) { showError('name', 'Please enter your full name.'); valid = false; }
        if (!fields.email.value.trim()) { showError('email', 'Please enter your email address.'); valid = false; }
        else if (!emailPattern.test(fields.email.value.trim())) { showError('email', 'Please enter a valid email address.'); valid = false; }
        if (!fields.subject.value.trim()) { showError('subject', 'Please enter a subject.'); valid = false; }
        if (!fields.message.value.trim()) { showError('message', 'Please enter your message.'); valid = false; }
        else if (fields.message.value.trim().length < 10) { showError('message', 'Message must be at least 10 characters.'); valid = false; }

        if (valid && success) {
            success.textContent = 'Thank you! Your message has been validated successfully. We will get back to you soon.';
            form.reset();
        }
    });
}

function initServiceModal() {
    const triggers = document.querySelectorAll('.modal-trigger');
    const modal = document.getElementById('service-modal');
    if (!modal || !triggers.length) return;
    const closeButton = document.getElementById('modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const list = document.getElementById('modal-features');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            title.textContent = this.dataset.title;
            description.textContent = this.dataset.description;
            list.innerHTML = '';
            (this.dataset.features || '').split('|').forEach(function (feature) {
                const li = document.createElement('li');
                li.textContent = '✓ ' + feature.trim();
                list.appendChild(li);
            });
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    if (closeButton) closeButton.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

function initPortfolioFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-card');
    if (!buttons.length || !cards.length) return;
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const filter = this.dataset.filter;
            buttons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');
            cards.forEach(function (card) {
                const show = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !show);
            });
        });
    });
}

function initPortfolioModal() {
    const triggers = document.querySelectorAll('.portfolio-detail');
    const modal = document.getElementById('portfolio-modal');
    if (!modal || !triggers.length) return;
    const close = document.getElementById('portfolio-modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const title = document.getElementById('portfolio-modal-title');
    const desc = document.getElementById('portfolio-modal-description');
    function closeModal() { modal.classList.remove('active'); document.body.style.overflow = ''; }
    triggers.forEach(function (button) {
        button.addEventListener('click', function () {
            title.textContent = this.dataset.title;
            desc.textContent = this.dataset.description;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    if (close) close.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}
