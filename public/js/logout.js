const logout = async () => {
  const response = await api.logoutUser();
  if (response.status === 204) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout-btn')?.addEventListener('click', logout);
