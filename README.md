# Shakti Shield

Shakti Shield is a web application designed to empower women with tools and resources for personal safety, legal guidance, and support. The platform offers features such as SOS alerts, trusted contacts management, crime report uploads, and a chatbot powered by Gemini AI for safety-related questions.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

1. **SOS Alerts**:
   - Users can trigger an SOS alert that sends immediate notifications to their trusted contacts with their location.
   - A chatbot powered by Gemini AI provides responses related to women's safety.

2. **Trusted Contacts Management**:
   - Users can add, edit, and delete trusted contacts for emergency situations.
   - Contacts are stored securely in the Firebase Realtime Database.

3. **Crime Report Upload**:
   - Users can upload documents, text, and images related to crimes they have faced.
   - Images are stored as Base64-encoded strings in the Firebase Realtime Database.

4. **Login and Signup**:
   - Users can log in using Google Authentication or create a new account.
   - Firebase Authentication ensures secure user management.

5. **Responsive Design**:
   - The application is fully responsive and works seamlessly on both desktop and mobile devices.

---

## Technologies Used

- **Node.js**: Backend framework for handling server-side logic.
- **Express.js**: Web framework for building RESTful APIs.
- **Firebase**:
  - **Firebase Authentication**: Handles user login and signup.
  - **Firebase Realtime Database**: Stores user-specific data such as contacts and crime reports.
- **Google Generative AI (Gemini)**:
  - Provides AI-powered responses for the chatbot.
- **Font Awesome**: Used for icons in the UI.
- **EJS**: Templating engine for rendering dynamic HTML pages.

---

## Setup Instructions

### **Prerequisites**
- **Node.js**: Installed locally on your machine.
- **npm**: Installed locally on your machine.

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/shakti-shield.git
   cd shakti-shield


2. **Install Dependencies**:
      ```bash
          npm install

3. **Set Environment Variables**:
      Create a .env file in the root directory and add the following variables:
       ```bash
           FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
           FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
           FIREBASE_DATABASE_URL=YOUR_FIREBASE_DATABASE_URL
           FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
           FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
           FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
           FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
           FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID
           GEMINI_API_KEY=YOUR_GEMINI_API_KEY

4. **Start the Development Server**:
   ```bash
       npm start

5. Access the Application :
      Open http://localhost:3000 in your browser to view the application.

Deployment
To Render
Create a Render Account :
Sign up for a free account at Render .
Connect GitHub Repository :
In the Render dashboard, connect your GitHub repository where this project is hosted.


Deployment
To Render
Create a Render Account :
Sign up for a free account at Render .
Connect GitHub Repository :
In the Render dashboard, connect your GitHub repository where this project is hosted.


Deploy :
Click the Deploy button to deploy your application.
Access the Live Site :
Once deployed, visit the URL provided by Render.


EJS : For templating.

---

### **Explanation of the README File**

1. **Overview**:
   - Briefly describes the purpose of the project and its key features.

2. **Features**:
   - Lists the main functionalities of the application.

3. **Technologies Used**:
   - Mentions the technologies and tools used to build the application.

4. **Setup Instructions**:
   - Provides step-by-step instructions for cloning the repository, installing dependencies, and starting the development server.

5. **Deployment**:
   - Explains how to deploy the application to Render, including setting up environment variables.

6. **Contributing**:
   - Guides contributors on how to fork, make changes, and submit pull requests.

7. **License**:
   - Specifies the license under which the project is released.

8. **Credits**:
   - Acknowledges the tools and services used in the project.

---

### **Final Notes**

- Ensure you replace `YOUR_FIREBASE_API_KEY`, `YOUR_GEMINI_API_KEY`, etc., with the actual values.
- The `.env` file is not committed to the repository for security reasons. Add it to your `.gitignore` file:

.env
  ```bash
Let me know if you need further refinements or additional sections!
