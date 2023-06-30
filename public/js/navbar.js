const userMenuButton = document.getElementById('user-menu-button');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const userMenu = document.querySelector('#profile-dropdown div[role="menu"]');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileIconOpen = document.querySelector(
  '#mobile-menu-button svg:last-of-type'
);
const mobileIconClose = document.querySelector(
  '#mobile-menu-button svg:first-of-type'
);

const toggleMenu = (button, menu, mobile) => {
  if (button.ariaExpanded === 'false') {
    button.ariaExpanded = 'true';
    menu.classList.add(
      'transition',
      'ease-in',
      'duration-75',
      'transform',
      'opacity-0',
      'scale-95'
    );
    menu.setAttribute('style', 'display: none;');
    if (mobile) {
      mobileIconOpen.classList.remove('block');
      mobileIconOpen.classList.add('hidden');
      mobileIconClose.classList.remove('hidden');
      mobileIconClose.classList.remove('block');
    }
  } else {
    console.log(mobile);
    button.ariaExpanded = 'false';
    menu.classList.add(
      'transition',
      'ease-out',
      'duration-100',
      'transform',
      'opacity-100',
      'scale-100'
    );
    menu.setAttribute('style', '');
    if (mobile) {
      mobileIconClose.classList.remove('block');
      mobileIconClose.classList.add('hidden');
      mobileIconOpen.classList.remove('hidden');
      mobileIconOpen.classList.remove('block');
    }
  }
};

toggleMenu(userMenuButton, userMenu);
toggleMenu(mobileMenuButton, mobileMenu, true);

userMenuButton.addEventListener(
  'click',
  toggleMenu.bind(null, userMenuButton, userMenu)
);

mobileMenuButton.addEventListener(
  'click',
  toggleMenu.bind(null, mobileMenuButton, mobileMenu, true)
);

userMenuButton.addEventListener('blur', () => {
  if (userMenuButton.ariaExpanded === 'false') {
    toggleMenu(userMenuButton, userMenu);
  }
});
