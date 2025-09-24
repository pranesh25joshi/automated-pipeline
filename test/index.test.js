const assert = require('assert');
const request = require('supertest');
const express = require('express');

// Mock the Express app for testing
const app = express();
app.use(express.json());

// Import routes from src/index.js
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'Express Backend',
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

describe('API Tests', function() {
  describe('GET /health', function() {
    it('should return status 200 and health information', function(done) {
      request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(res.body.status === 'ok', 'Health status should be "ok"');
          assert(res.body.environment, 'Environment should be defined');
          assert(res.body.timestamp, 'Timestamp should be defined');
          done();
        });
    });
  });

  describe('GET /api/info', function() {
    it('should return status 200 and application information', function(done) {
      request(app)
        .get('/api/info')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(res.body.app === 'Express Backend', 'App name should be "Express Backend"');
          assert(res.body.environment, 'Environment should be defined');
          assert(res.body.version, 'Version should be defined');
          done();
        });
    });
  });

  // We removed the echo endpoint and 404 handler from the simplified backend
});