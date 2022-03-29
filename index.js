require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const router = express.Router();
/*var corsOptions = {
    origin: "http://localhost:3000/"
};*/

app.use(cors());
const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// Parse requests of content-type - application/json
app.use(bodyParser.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Starting route
app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client', 'build', 'index.html'));
});

// Routes
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/item.routes")(app);

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

