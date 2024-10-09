const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const {errorhandler} = require("./middelwares/errorhandling");
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: "http://localhost:3000"
    }
));

// Mongoose
connectDB();


// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/post"));
app.use("/api/comment" , require("./routes/comment"))


// Error Handler Must after routes
app.use(errorhandler);

// Listen 
app.listen(process.env.PORT, () => {    
    console.log(`Server started on port ${process.env.PORT}`);
})