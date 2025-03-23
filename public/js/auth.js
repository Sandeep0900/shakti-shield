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
  
  // Login Form Submission
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = '/crime-reports';
    } catch (error) {
      document.getElementById('errorMessage').textContent = error.message;
    }
  });
  
  // Signup Form Submission
  document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      window.location.href = '/crime-reports';
    } catch (error) {
      document.getElementById('errorMessage').textContent = error.message;
    }
  });
  
  // Logout Button
  document.getElementById('logoutButton')?.addEventListener('click', async () => {
    await auth.signOut();
    window.location.href = '/login';
  });