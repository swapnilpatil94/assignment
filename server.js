const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const dbConnected = require("./config/db")
const cors = require('cors')

app.use(cors());

dbConnected();

// Init Middleware 
app.use(express.json({
    extended: false
}));

app.use('/api/users', require('./routes/api/registeruser'));  //register user 
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})


