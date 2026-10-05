import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import productsRouter from './routes/products.js';
import quotesRouter from './routes/quotes.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API Routes
app.use('/api', productsRouter);
app.use('/api', quotesRouter);
app.use('/api/admin', adminRouter);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BODHILIGHTNING Quote & Catalog API',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if available
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  // If not API request, send index.html
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(clientDistPath, 'index.html');
    res.sendFile(indexPath, err => {
      if (err) {
        res.status(200).send(`
          <html>
            <head><title>BODHILIGHTNING API</title></head>
            <body style="font-family:sans-serif;padding:40px;text-align:center;">
              <h2>⚡ BODHILIGHTNING API Server Active</h2>
              <p>Frontend is running or can be built with <code>npm run build</code>.</p>
              <p><a href="/api/products">View Products API</a> | <a href="/api/health">API Health</a></p>
            </body>
          </html>
        `);
      }
    });
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ BODHILIGHTNING Server running on http://localhost:${PORT}`);
});
