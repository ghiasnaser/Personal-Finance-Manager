document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#auth-form');
  console.log(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(form);

    const name = document.querySelector('#first-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name) {
      console.log(name);
    }
    const response = await fetch('/api/users/sign-up', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(await response.json().body.message);
    }
  });
});
