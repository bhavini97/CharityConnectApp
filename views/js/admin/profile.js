const login= document.getElementById('loginForm');

if(login){
    login.addEventListener('submit',async (e)=>{
      e.preventDefault(); 
      const loginForm = e.target;
      const password = loginForm.password.value;
      try{

        const response = await axios.post('/admin/login',{password})
        console.log(response)
        localStorage.setItem('token',response.data.token)
        alert(response.data.message || 'Login Successful');
        loginForm.reset();
        window.location.href = '/admin/dashboard'

      }catch(err){
        if (err.response) {
            alert(err.response.data.message || 'Login failed');
          } else {
            alert('Something went wrong. Please try again.');
          }
      }
    })
}