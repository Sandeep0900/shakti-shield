// document.getElementById('sos-button').addEventListener('mousedown', function () {
//     alert('SOS Alert triggered! Your emergency contacts have been notified.');
//   });



//   pop7===================================
// Open Popup

document.getElementById('safeRouteButton4').addEventListener('click', () => {
    document.getElementById('popupOverlay').style.display = 'block';
  });
  
  // Close Popup Box
  const closeButton = document.querySelector('.close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      const popup = document.getElementById('popupOverlay');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  }
  
  // Handle Form Submission
  document.getElementById('sosForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Show status message
    const statusMessage = document.getElementById('alertStatus');
    statusMessage.textContent = 'Fetching location and sending alert...';
    statusMessage.style.color = '#ff6f61';
  
    try {
      // Fetch the user's location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const timestamp = new Date().toLocaleString();
  
      // Populate hidden fields with location and time
      document.getElementById('timestamp').value = timestamp;
      document.getElementById('latitude').value = latitude;
      document.getElementById('longitude').value = longitude;
  
      // Submit the form programmatically
      const form = document.getElementById('sosForm');
      form.submit();
  
      // Display success message
      statusMessage.textContent = `Alert sent successfully to ${document.getElementById('email').value}!`;
      statusMessage.style.color = 'green';
    } catch (error) {
      // Handle errors (e.g., location access denied)
      statusMessage.textContent = 'Failed to fetch location or send alert.';
      statusMessage.style.color = 'red';
      console.error(error);
    }
  });

//   popup7====================





// safty chat popbox=============================
// Open Chatbot Popup
document.getElementById('safetyTipsButton').addEventListener('click', () => {
    document.getElementById('chatbotOverlay').style.display = 'block';
  });
  
  // Close Chatbot Popup
  function closeChatbot() {
    document.getElementById('chatbotOverlay').style.display = 'none';
  }
  
  // Handle Chatbot Form Submission
document.getElementById('chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Get user input
    const userInput = document.getElementById('userInput').value;
  
    // Append user message to chat
    appendMessage(userInput, 'user-message');
  
    // Clear input field
    document.getElementById('userInput').value = '';
  
    try {
      // Call backend API
      const response = await fetch("http://localhost:3000/get-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure JSON content type
        },
        body: JSON.stringify({ prompt: userInput }), // Send the prompt as JSON
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Append bot response to chat
        appendMessage(data.response, 'bot-message');
      } else {
        // Handle errors
        appendMessage(data.error || "Sorry, I couldn't process your request at the moment.", 'bot-message');
      }
    } catch (error) {
      console.error("Error Details:", error);
      appendMessage("Sorry, I couldn't process your request at the moment. Please try again later.", 'bot-message');
    }
  });
  
  // Function to Append Messages to Chat
  function appendMessage(message, className) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
  
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
// safty chat popbox=============================



 // safeRoad8==========================================
  
  // Open Popup Box 1
  document.getElementById('safeRouteButton').addEventListener('click', () => {
    document.getElementById('popupOverlay1').style.display = 'block';
  });

  // Open Popup Box 2
  document.getElementById('safeRouteButton2').addEventListener('click', () => {
    document.getElementById('popupOverlay1').style.display = 'block';
  });

   // Open Popup Box 3
   document.getElementById('safeRouteButton3').addEventListener('click', () => {
    document.getElementById('popupOverlay1').style.display = 'block';
  });
  
  // Close Popup Box
  function closePopup() {
    document.getElementById('popupOverlay1').style.display = 'none';
  }

  
   // safeRoad8==========================================



document.getElementById('sos-button').addEventListener('mouseup', function () {
    // Handle release of button if needed
  });

  function toggleMenu() {
    var navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
  }
  


  // Get DOM elements
const addContactButton = document.getElementById('addContactButton');
const addContactModal = document.getElementById('addContactModal');
const closeModalButton = document.querySelector('.close-modal');

// Open modal
addContactButton.addEventListener('click', () => {
  addContactModal.style.display = 'block';
});

// Close modal
closeModalButton.addEventListener('click', () => {
  addContactModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === addContactModal) {
    addContactModal.style.display = 'none';
  }
});

// Handle form submission
document.querySelector('.add-contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  // Log the new contact (replace with actual backend logic later)
  console.log('New Contact:', { name, phone, email });

  // Clear form fields
  document.getElementById('name').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';

  // Close modal
  addContactModal.style.display = 'none';

  alert('Contact added successfully!');
});

document.querySelector('.login-button').addEventListener('click', () => {
    window.location.href = '/login'; // Redirect to the login page
  });
  

//   contact=============

  // Simulate form submission success
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Hide the form
    document.getElementById('contactForm').style.display = 'none';

    // Show the success message
    document.getElementById('successMessage').style.display = 'block';
  });


