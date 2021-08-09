require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authentication');
const postRouter = require('./routes/post');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.lvaty.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("DB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();

const app = express();
// enable server to read json objects
app.use(express.json());
app.use(cors());


// Authentication routes
app.use('/api/auth', authRouter);
// Posts routes
app.use('/api/posts', postRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Started at PORT: ${PORT}`);
});