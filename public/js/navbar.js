const initNavbar = () => {
  const mobileMenuBtn = document.querySelector('#mobile-menu-button');
  const profileMenuBtn = document.querySelector('#user-menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');
  const profileMenu = document.querySelector('#user-profile-links');
  const mobileIcons = document.querySelectorAll('#mobile-menu-button i');
  const profileMenuLinks = document.querySelector('#user-profile-links');

  if (profileMenuBtn) {
    profileMenuBtn.addEventListener('click', () => {
      if (profileMenuBtn.getAttribute('aria-expanded') === 'true') {
        profileMenuBtn.setAttribute('aria-expanded', 'false');
        profileMenuLinks.querySelectorAll('a').forEach((link) => {
          link.setAttribute('tabindex', '-1');
        });
      } else {
        profileMenuBtn.setAttribute('aria-expanded', true);
        profileMenuLinks.querySelectorAll('a').forEach((link) => {
          link.setAttribute('tabindex', '0');
        });
      }
      profileMenu.classList.toggle('hidden');
      profileMenu.classList.toggle('block');
    });
  }
  mobileMenuBtn.addEventListener('click', () => {
    mobileIcons.forEach((icon) => {
      icon.classList.toggle('hidden');
      icon.classList.toggle('block');
    });
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('block');
  });
};

document.addEventListener('DOMContentLoaded', initNavbar);
