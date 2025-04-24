localStorage.removeItem('token');
const charitySignUpForm = document.getElementById('charitySignUpForm')

if(charitySignUpForm){
charitySignUpForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const orgData = {
    name: form.name.value,
    email :form.email.value,
    password: form.password.value,
    location: form.location.value,
    info: form.info.value
  };

  try {
    const response = await axios.post('/charity/signUp', orgData);
    alert('Charity Registered Successfully!');
    form.reset();
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || 'Registration failed');
    } else {
      alert('Something went wrong. Please try again.');
    }
  }
});
}

const loginForm = document.getElementById('loginForm');

if(loginForm){
  loginForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    const login = e.target;
    const loginData = {
      email: login.email.value,
      password: login.password.value
    }

    try{
      const response = await axios.post('/charity/login', loginData);
      localStorage.setItem('token',response.data.token)
      alert('Charity Login Successful!');
      loginForm.reset();
      window.location.href ='/projects';
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'Login failed');
      } else {
        alert('Something went wrong. Please try again.');
      }

    }
  })
}