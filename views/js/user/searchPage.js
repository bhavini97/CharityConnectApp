
// Check token and redirect if not authorized
const token = localStorage.getItem('token');
if (!token) {
  alert('You are not authorized');
  window.location.href = '/';
}

// DOM loaded
let searchInput;
let currentPage = 1;
let limit = 3;

let cashfree;


window.addEventListener('DOMContentLoaded', () => {
    cashfree = Cashfree({
        mode: "sandbox",
      });
  searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keyup', () => {
    currentPage = 1;
    fetchAndDisplayProjects();
  });

  // Initial load
  fetchAndDisplayProjects();
});

async function fetchAndDisplayProjects() {
  const query = searchInput.value.trim();
  try {
    const res = await axios.get(`/projects/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        page: currentPage,
        limit: limit,
      },
    });

    const projects = res.data.projects;
    const totalPages = res.data.totalPages;
    renderProjects(projects);
    renderPagination(totalPages);
  } catch (err) {
    console.error('Error fetching projects', err);
  }
}

function renderProjects(projects) {
    const list = document.getElementById('projectList');
    list.innerHTML = '';
  
    if (projects.length === 0) {
      list.innerHTML = '<p>No projects found.</p>';
      return;
    }
  
    const ul = document.createElement('ul');
  
    projects.forEach((project) => {
      const li = document.createElement('li');
      li.classList.add('project-item');
      li.innerHTML = `
        <strong>${project.projectName}</strong><br>
        Category: ${project.category}<br>
        Goal: ${project.goal}<br>
        Total Fund Raised : ₹${project.charityCollected}<br>
      <button class="pay-btn">Pay</button>
    `;

    // Add event listener for the Pay button
    li.querySelector('.pay-btn').addEventListener('click', () => {
         makePayment(project);
    });

      ul.appendChild(li);
    });
  
    list.appendChild(ul);
  }
  

function renderPagination(totalPages) {
  const paginationDiv = document.getElementById('pagination');
  paginationDiv.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener('click', () => {
      currentPage = i;
      fetchAndDisplayProjects();
    });
    paginationDiv.appendChild(btn);
  }
}
async function  makePayment(project) {
      // fetch session id from backend
      try{
        // Send the data in the body of the request
    const response = await axios.post(
        'http://localhost:3000/order/pay',
        { // Send data in the request body
          charity_project_name: project.projectName,
          charity_id: project.charity_id,
        },
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
          
          const data = response.data;
          
        const paymentSessionId = data.paymentSessionId;
        const orderId = data.orderId
 
        //initaiate checkout options
        let checkoutOptions = {
         paymentSessionId : paymentSessionId,
 
         //new page payment option
         redirectTarget : "_modal" //default
        }
 
        // start checkout process
        const result = await new Promise(resolve => {
         setTimeout(async () => {
             try {
                 const checkoutResult = await cashfree.checkout(checkoutOptions);
                 resolve(checkoutResult);
             } catch (error) {
                 reject(error); // If checkout fails, handle it properly
             }
         }, 500);
     });
        if(result.error){
         console.error(result.error)
        }
 
        if(result.paymentDetails){
         console.log(result.paymentDetails.paymentMessage)
         const response = await axios.get(`http://localhost:3000/order/payment-status`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
            params: {
              orderId: orderId,
              charity_project_name: project.projectName,
              charity_id: project.charity_id,
            },
          });
          
          const data = response.data;
         console.log(data)
         alert("your payment is "+data.orderStatus)
         window.location.href = "http://localhost:3000/projects/user";
        }
     }catch(err){
       console.log('error ',err.message)
     }
 
}
document.getElementById('profileBtn').addEventListener('click',()=>{
    window.location.href = '/user'
});


