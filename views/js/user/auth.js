localStorage.removeItem('token')
// singn up user form
const signupForm = document.getElementById('signupForm')
if(signupForm){
signupForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    const form = e.target;
    const userData = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value
    };

    try {
      const response = await axios.post('/auth/signUp', userData);
      
      alert( 'Signup successful!');
      form.reset(); // Reset the form fields
      
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Signup failed');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  });
}

 const loginForm =  document.getElementById('loginForm')
 if(loginForm){
 loginForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    const login = e.target;
    const loginData = {
        email:login.email.value,
        password:login.password.value
    };
     try{

        const result = await axios.post('/auth/login',loginData);
        localStorage.setItem('token',result.data.token);
        login.reset();
        alert('Login successful');
        
        window.location.href='/projects/user';
     }catch(err){
        if (err.response) {
            alert(err.response.data.message || 'Signup failed');
          } else {
            alert('Something went wrong. Please try again.');
          }
     }
  })
 }
