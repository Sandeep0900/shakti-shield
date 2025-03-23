const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000; 

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI("AIzaSyCUfU8IiiRlckfeXVqa8dtuPWW9P_lYtlQ");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.use(express.json());

app.post("/get-response", async (req, res) => {
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }
  
    try {
      // Restrict responses to women's safety topics
      const restrictedPrompt = `Answer the following question only if it is related to women's safety or laws regarding women's safety. If not, respond with "I can only answer questions related to women's safety." Question: ${prompt}`;
  
      const result = await model.generateContent(restrictedPrompt);
      const responseText = result.response.text();
  
      res.json({ response: responseText });
    } catch (error) {
      console.error("Error fetching AI response:", error.message || error);
      res.status(500).json({ error: "Failed to fetch AI response." });
    }
  });



// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Use express-ejs-layouts
app.use(ejsLayouts);

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Shakti Shield' });
});

app.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings' });
});

app.get('/contacts', (req, res) => {
    res.render('contacts', { title: 'Contacts' });
  });
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
  });
  app.get('/aboutus', (req, res) => {
    res.render('aboutus', { title: 'AboutUs' });
  });
  app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
  });
  app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup' });
  });

  app.get('/crime-reports', (req, res) => {
    res.render('crime-reports', { title: 'Crime-Reports'});
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});