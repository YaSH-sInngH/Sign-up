const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LoginSignupProject')
    .then(() => {
        console.log("MongoDB connected");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });