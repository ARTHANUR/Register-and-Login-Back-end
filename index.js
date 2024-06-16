const mongoose = require("mongoose");
require("./models/schema");
const app = require("./routes/app");

mongoose
    .connect(`mongodb+srv://sarthanur:12345@crudproject.lysxqfb.mongodb.net/`)
    .then(() => {
        console.log("mongo connection is successful");
        app.listen(8000, () => {
            console.log("server is up and running");
        });
    })
    .catch((err) => {
        console.log("mongo connection failed", err);
    });
