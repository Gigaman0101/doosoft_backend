require('dotenv').config();
require('./middleware/passport');

const db = require('./models');
const express = require('express');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users/", userRoutes);
app.use("/admin/", adminRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ message: err.message });
});

const portBack = process.env.PORT || 8000;

app.listen(portBack, () => {
    console.log(`server is running at port ${portBack}`)
});

db.sequelize.sync({ force: false })
    .then(() => { console.log("Database connected!!"); })
    .catch(err => { console.log(err); });