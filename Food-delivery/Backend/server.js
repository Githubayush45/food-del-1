import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';

const app = express();

// ✅ PORT from env (Render uses this)
const port = process.env.PORT || 4000;

// ✅ CORS: Allow Vercel frontends
app.use(cors({
  origin: [
    'https://fog-gslw.vercel.app',  // user
    'https://fog-ochre.vercel.app'  // admin
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Static folder for image uploads
app.use('/images', express.static('uploads'));

// ✅ API Routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);

// ✅ DB Connect
connectDB();

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
