import express from 'express';
import cors from 'cors';
import productsRouter from '../server/routes/products.js';
import quotesRouter from '../server/routes/quotes.js';
import adminRouter from '../server/routes/admin.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Mount API routes
app.use('/api', productsRouter);
app.use('/api', quotesRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BODHILIGHTNING Quote & Catalog API (Vercel Serverless)',
    timestamp: new Date().toISOString()
  });
});

export default app;
