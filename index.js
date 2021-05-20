const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const connect = require('./config/db');
const path = require('path');
const router = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');
require('dotenv').config();
const app = express();

// connect mongodb database
// connect();

const URL = process.env.URL;

mongoose.connect(URL,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>
    console.log('DB connected')
).catch((err)=>{
    console.log('DB connection error')
});


app.use(bodyParser.json());
app.use('/', router);
app.use('/', postRoutes);
app.use('/', profileRoutes);
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build/')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
app.listen(PORT, () => {
	console.log('Your app is running');
});
