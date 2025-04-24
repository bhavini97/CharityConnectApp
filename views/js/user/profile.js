const token = localStorage.getItem("token");

// Fetch user details on load
async function userDetails() {
  try {
    const response = await axios.get("/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = response.data.result;
    document.getElementById("name").value = user.username;
    document.getElementById("email").value = user.email;
  } catch (err) {
    console.error("Error fetching user details:", err.message);
  }
}

// Enable inputs for editing
function enableEdit() {
  document.getElementById("name").disabled = false;
  document.getElementById("email").disabled = false;
  document.getElementById("saveBtn").disabled = false;
}

// Save updated user profile
async function saveProfile() {
  const updatedData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  };

  try {
    await axios.put("/user/profile", updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    alert("Profile updated successfully!");

    // disable inputs again
    document.getElementById("name").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("saveBtn").disabled = true;
  } catch (err) {
    console.error("Error updating profile:", err.message);
    alert("Failed to update profile.");
  }
}

// getting the charity file from db
async function downloadCharityFiles() {
  // Add your download logic here
  try{
    const response = await fetch(`user/download`,{
        headers : {Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    console.log(response)
    if(response.status === 200){
        // backend is sending the download link
        // which gets automatically downloaded when clicked
        const data = await response.json();
  const a = document.createElement('a');
  a.href = data.fileUrl;
  a.download = 'myCharityContribution.csv';
 

        a.click();
    }else{
        throw new Error(response.data.message)
    }
    console.log('download button clicked')
}catch(err){
    console.error('socmething went wrong when clicked on download button');
}
}

const fileDownloadList = document.getElementById("fileDownloadList");

async function fetchDownloadedFiles() {
    try {
        const response = await fetch("user/prevDownloads", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        console.log("Fetched Data: ", data);  // Log the data
        displayDownloadedFiles(data.downloads);
    } catch (err) {
        console.error("Error fetching downloaded files:", err);
    }
}

function displayDownloadedFiles(files) {
    const fileDownloadList = document.getElementById("fileDownloadList");
    fileDownloadList.innerHTML = ""; // Clear existing list items

    // Iterate over each file in the files array
    files.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${file.fileUrl}" target="_blank" style="color:black">${new Date(file.downloadedAt).toLocaleString()} - ${file.fileUrl}</a>`;
        fileDownloadList.appendChild(li);
    });
}


fetchDownloadedFiles();


window.addEventListener("DOMContentLoaded", userDetails);
