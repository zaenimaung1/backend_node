require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./router/user_router');
const cateRouter = require('./router/category_router');
const fileUpload = require('express-fileupload');
const { saveSingleFile , saveMultipleFiles , deleteImageByLink , deleteImageByName} = require('./utils/gallery');

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

// routes
app.use('/user', userRouter);
app.use('/category', cateRouter);

app.post("/image", saveSingleFile, (req, res ,next) => {
    res.json({
        con: true,
        imgLink: req.imgLink
    })
}
);

app.post("/images" , saveMultipleFiles , (req, res , next) => {
    res.json({
        con: true,
        imgLinks: req.imgLinks
    })
});

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
