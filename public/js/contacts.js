// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Firebase Configuration
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
  
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();
  
    // DOM Elements
    const loginButton = document.getElementById('loginButton');
    const addContactButton = document.getElementById('addContactButton');
    const contactsContainer = document.getElementById('contactsContainer');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contactForm');
    const modalTitle = document.getElementById('modalTitle');
  
    let currentUserId = null;
  
    // Login/Logout Functionality
    loginButton.addEventListener('click', async () => {
      if (auth.currentUser) {
        await auth.signOut();
        location.reload();
      } else {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          await auth.signInWithPopup(provider);
        } catch (error) {
          console.error("Login Error:", error.message);
        }
      }
    });
  
    // Listen for Authentication State Changes
    auth.onAuthStateChanged(user => {
      if (user) {
        currentUserId = user.uid;
        loginButton.textContent = 'Logout';
        loadContacts();
      } else {
        currentUserId = null;
        loginButton.textContent = 'Login';
        contactsContainer.innerHTML = '<p>Please log in to view your contacts.</p>';
      }
    });
  
    // Load Contacts from Firebase
    function loadContacts() {
      contactsContainer.innerHTML = '';
      if (!currentUserId) return;
  
      const contactsRef = database.ref(`users/${currentUserId}/contacts`);
      contactsRef.on('value', snapshot => {
        const contacts = snapshot.val();
        if (!contacts) {
          contactsContainer.innerHTML = '<p>No contacts found. Add a new contact!</p>';
          return;
        }
  
        contactsContainer.innerHTML = '';
        Object.keys(contacts).forEach(key => {
          const contact = contacts[key];
          const contactCard = createContactCard(key, contact);
          contactsContainer.appendChild(contactCard);
        });
      });
    }
  
    // Create Contact Card
    function createContactCard(id, contact) {
      const card = document.createElement('div');
      card.classList.add('contact-card');
  
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('contact-info');
      infoDiv.innerHTML = `
        <h3>${contact.name}</h3>
        <p><i class="fas fa-phone-alt"></i> ${contact.phone}</p>
        <p><i class="fas fa-envelope"></i> ${contact.email || 'N/A'}</p>
      `;
  
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('contact-actions');
  
      const editButton = document.createElement('button');
      editButton.classList.add('edit-button');
      editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
      editButton.addEventListener('click', () => openModalForEdit(id, contact));
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
      deleteButton.addEventListener('click', () => deleteContact(id));
  
      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);
  
      card.appendChild(infoDiv);
      card.appendChild(actionsDiv);
      return card;
    }
  
    // Open Modal for Adding or Editing Contact
    addContactButton.addEventListener('click', () => openModalForEdit(null, {}));
  
    function openModalForEdit(id, contact) {
      document.getElementById('contactId').value = id || '';
      document.getElementById('name').value = contact.name || '';
      document.getElementById('phone').value = contact.phone || '';
      document.getElementById('email').value = contact.email || '';
  
      modalTitle.textContent = id ? 'Edit Contact' : 'Add New Contact';
      contactModal.style.display = 'block';
    }
  
    // Save Contact
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!currentUserId) return;
  
      const id = document.getElementById('contactId').value;
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
  
      if (!name || !phone) return;
  
      const contactsRef = database.ref(`users/${currentUserId}/contacts`);
      if (id) {
        await contactsRef.child(id).update({ name, phone, email });
      } else {
        await contactsRef.push({ name, phone, email });
      }
  
      closeModal.click();
    });
  
    // Delete Contact
    function deleteContact(id) {
      if (!currentUserId || !id) return;
      const contactsRef = database.ref(`users/${currentUserId}/contacts`);
      contactsRef.child(id).remove();
    }
  
    // Close Modal
    closeModal.addEventListener('click', () => {
      contactModal.style.display = 'none';
      contactForm.reset();
    });
  });