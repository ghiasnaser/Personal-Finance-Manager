document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#auth-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#first-name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    const response = await api.signupUser({ name, email, password });

    if (response.status === 200) {
      document.location.replace('/dashboard');
    } else {
      alert(response.data.message);
    }
  });
});
