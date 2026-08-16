const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelector('[data-preview-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  document.querySelector('.form-note').textContent = "You're on the list, Betties. (Preview only—email service connects before launch.)";
});

const mediaInput = document.querySelector('#broadway-media');
const uploadPreview = document.querySelector('[data-upload-preview]');
const submissionForm = document.querySelector('[data-submission-form]');

mediaInput.addEventListener('change', () => {
  uploadPreview.replaceChildren();
  Array.from(mediaInput.files).forEach((file) => {
    const chip = document.createElement('div');
    chip.className = 'upload-chip';
    chip.innerHTML = `<b>${file.type.startsWith('video/') ? '▶' : '▣'}</b><span></span>`;
    chip.querySelector('span').textContent = file.name;
    uploadPreview.append(chip);
  });
});

submissionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submissionForm.querySelector('.submission-status').textContent = 'Looks fabulous. This preview is ready; secure media delivery will be connected before launch.';
});
