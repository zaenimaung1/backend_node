require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./router/user_router');

app.use(express.json());

// routes
app.use('/user', userRouter);

// error handler (must be at bottom)
app.use((err, req, res, next) => {
    res.status(500).json({
        con: false,
        msg: err.message
    });
});

// DB + server start
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Server running on port " + process.env.PORT);
        });
    })
    .catch(err => {
        console.log("DB Error:", err.message);
    });