document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyARK0med9WrtdwbVc52PlDlBH_S03mLr0s",
      authDomain: "shakti-shield.firebaseapp.com",
      databaseURL: "https://shakti-shield-default-rtdb.firebaseio.com",
      projectId: "shakti-shield",
      storageBucket: "shakti-shield.firebasestorage.app",
      messagingSenderId: "834755553611",
      appId: "1:834755553611:web:af0dd04049495fd419e0ce",
      measurementId: "G-Y4L58ND7VD"
    };
  
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();
  
    let currentUserId = null;
  
    // Listen for Authentication State Changes
    auth.onAuthStateChanged(user => {
      if (user) {
        currentUserId = user.uid;
        loadReports();
      } else {
        window.location.href = '/login';
      }
    });
  
    // Load Reports from Firebase
    function loadReports() {
      const reportsContainer = document.getElementById('reportsContainer');
      reportsContainer.innerHTML = '';
  
      const reportsRef = database.ref(`users/${currentUserId}/reports`);
      reportsRef.on('value', snapshot => {
        const reports = snapshot.val();
        if (!reports) {
          reportsContainer.innerHTML = '<p>No reports found. Add a new report!</p>';
          return;
        }
  
        reportsContainer.innerHTML = '';
        Object.keys(reports).forEach(key => {
          const report = reports[key];
          const reportCard = createReportCard(key, report);
          reportsContainer.appendChild(reportCard);
        });
      });
    }
  
    // Create Report Card
    function createReportCard(id, report) {
      const card = document.createElement('div');
      card.classList.add('report-card');
  
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('report-info');
      infoDiv.innerHTML = `
        <h3>${report.title}</h3>
        <p>${report.description}</p>
      `;
  
      if (report.image) {
        const img = document.createElement('img');
        img.src = report.image;
        img.alt = 'Uploaded Image';
        img.style.maxWidth = '100px';
        img.style.marginTop = '10px';
        infoDiv.appendChild(img);
      }
  
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('report-actions');
  
      const editButton = document.createElement('button');
      editButton.classList.add('edit-button');
      editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
      editButton.addEventListener('click', () => openModalForEdit(id, report));
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
      deleteButton.addEventListener('click', () => deleteReport(id));
  
      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);
  
      card.appendChild(infoDiv);
      card.appendChild(actionsDiv);
      return card;
    }
  
    // Open Modal for Adding or Editing Report
    document.getElementById('addReportButton').addEventListener('click', () => openModalForEdit(null, {}));
  
    function openModalForEdit(id, report) {
      document.getElementById('reportId').value = id || '';
      document.getElementById('title').value = report.title || '';
      document.getElementById('description').value = report.description || '';
      document.getElementById('image').value = ''; // Clear file input
  
      const modalTitle = document.getElementById('modalTitle');
      modalTitle.textContent = id ? 'Edit Report' : 'Add New Report';
  
      const reportModal = document.getElementById('reportModal');
      reportModal.style.display = 'block';
    }
  
    // Save Report
    document.getElementById('reportForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const id = document.getElementById('reportId').value;
      const title = document.getElementById('title').value.trim();
      const description = document.getElementById('description').value.trim();
      const imageFile = document.getElementById('image').files[0];
  
      if (!title || !description) {
        alert('Title and description are required.');
        return;
      }
  
      let imageBase64 = null;
      if (imageFile) {
        try {
          imageBase64 = await convertImageToBase64(imageFile);
        } catch (error) {
          alert('Failed to process the image.');
          return;
        }
      }
  
      const reportsRef = database.ref(`users/${currentUserId}/reports`);
      if (id) {
        await reportsRef.child(id).update({ title, description, image: imageBase64 });
      } else {
        await reportsRef.push({ title, description, image: imageBase64 });
      }
  
      closeModal();
    });
  
    // Convert Image File to Base64
    function convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  
    // Delete Report
    function deleteReport(id) {
      if (!currentUserId || !id) return;
      const reportsRef = database.ref(`users/${currentUserId}/reports`);
      reportsRef.child(id).remove();
    }
  
    // Close Modal
    function closeModal() {
      const reportModal = document.getElementById('reportModal');
      reportModal.style.display = 'none';
      document.getElementById('reportForm').reset();
    }
  
    // Close Modal on Clicking Outside or Close Button
    document.querySelector('.close-modal').addEventListener('click', closeModal);
  });