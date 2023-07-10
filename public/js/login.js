document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#auth-form');
  const responseText = document.querySelector('#response');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    try {
      const response = await api.loginUser({ email, password });

      if (response.status === 200) {
        document.location.replace('/dashboard');
      }
    } catch (error) {
      responseText.textContent = error.response.data.message;

      setTimeout(() => {
        responseText.textContent = '';
      }, 3000);

      return;
    }
  });
});
