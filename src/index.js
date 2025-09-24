const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: ENV,
    timestamp: new Date().toISOString()
  });
});

// Sample API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'Express Backend',
    environment: ENV,
    version: '1.0.2'
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${ENV} mode on port ${PORT}`);
});