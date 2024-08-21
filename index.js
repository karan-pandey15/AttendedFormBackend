 

import express from "express";
import cors from "cors";
import db from "./database/db.js"; 
import userRoutes from './routes/userRoutes.js'; // Import user routes

const app = express(); 
db; // Ensure the database connection is established

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "https://marasimpex.com",
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use('/api/users', userRoutes); // Use user routes

// Start server
const port = 5005;
app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
