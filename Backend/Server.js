const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UserRoutes");
const routes = require("./routes/ToDoRoutes");
const path = require("path");
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Backend Folder path
const _dirname = path.resolve();

// Middleware


app.use(express.json());
// CORS configuration

// Define allowed origins
const allowedOrigins = ['https://todo-mern-6j2q.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoutes);
app.use("/api", routes);



app.use(express.static(path.join(_dirname,"/Frontend/Todos/dist")));
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "Frontend", "Todos" ,"dist" , "index.html"))
})


app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
