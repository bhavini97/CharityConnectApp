const token = localStorage.getItem("token");

// Fetch user details on load
async function userDetails() {
  try {


    const response = await axios.get("/projects/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });



    const user = response.data.result;

    document.getElementById("name").value = user.charityname;
    document.getElementById("email").value = user.email;
    document.getElementById("location").value = user.location;
    document.getElementById("info").value = user.info;

   
  } catch (err) {
    console.error("Error fetching user details:", err.message);
  }
}

// Enable inputs for editing
function enableEdit() {
  document.getElementById("name").disabled = false;
  document.getElementById("email").disabled = false;
  document.getElementById("location").disabled = false;
  document.getElementById("info").disabled= false;
  document.getElementById("saveBtn").disabled = false;
}

// Save updated user profile
async function saveProfile() {
  const updatedData = {
    charityName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    location:document.getElementById('location').value,
    info:document.getElementById('info').value
  };

  try {
    await axios.put("/projects/profile", updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    alert("Profile updated successfully!");

    // disable inputs again
    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("location").disabled = true;
    document.getElementById("info").disabled= true;
    document.getElementById("saveBtn").disabled = true;
  } catch (err) {
    console.error("Error updating profile:", err.message);
    alert("Failed to update profile.");
  }
}

/// this will upload pdf to the  backend
const uploadForm = document.getElementById("uploadForm");
if(uploadForm){

uploadForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post("/charity/send-report", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert(res.data.message);
  } catch (err) {
    alert("Failed to send report");
    console.error(err);
  }
});
}
window.addEventListener("DOMContentLoaded", userDetails);