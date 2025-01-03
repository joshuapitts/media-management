import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import db from './models/index.js';

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
import userRouter from './routes/Users.js';
app.use("/auth", userRouter);

// Port
const PORT = process.env.PORT || 3000

db.sequelize.sync().then(()=> {
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
});