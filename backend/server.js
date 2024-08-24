import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import dotenv from 'dotenv';
import  {di}from './utils/dependencyInjector.js';
import TaskService from './services/taskService.js';

dotenv.config();

const app = express();
app.use(express.json());

// Dependency Injection Registration
di.register('taskService', TaskService);
// console.log(TaskService)

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/',async(req,res)=>{
    try {
        res.send('hey this is home route for the task management') 
    } catch (error) {
        res.send('oops error in home route')
    }
})


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connecting to MongoDB', error);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
