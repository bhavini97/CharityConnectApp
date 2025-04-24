const token = localStorage.getItem('token');
const addProjectForm = document.getElementById('projectForm');
if(addProjectForm){
    addProjectForm.addEventListener('submit',async (e) => {
        e.preventDefault();
        const projectForm = e.target;
        const formData = {
            name:projectForm.projectName.value,
            category:projectForm.category.value,
            goal:projectForm.goals.value
        } 
        try{
            const res = await axios.post('/projects/addNewProject',formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert('project added successfully');
            addProjectForm.reset();
            window.location.href = '/projects';

        }catch(err){
            if (err.response) {
                alert(err.response.data.message || 'Login failed');
              } else {
                alert('Something went wrong. Please try again.');
              }
        }
    })
}
const projectList = document.getElementById('projectList');

document.addEventListener('DOMContentLoaded', displayProjects);

async function displayProjects() {
  try {
    const res = await axios.get('/projects/display', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const projects = res.data.result;

    if (!projects.length) {
      projectList.innerHTML = '<p>No projects available.</p>';
      return;
    }

    projectList.innerHTML = ''; // Clear previous content if any

    projects.forEach(project => {
      const div = document.createElement('div');
      div.classList.add('project-item');
      div.innerHTML = `
        <h3>${project.projectName}</h3>
        <p><strong>Category:</strong> ${project.category}</p>
        <p><strong>Goal:</strong> ${project.goal}</p>
        <p><strong>Fund Raised:</strong> ₹${project.charityCollected}</p>
      `;
      projectList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    projectList.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
  }
}
