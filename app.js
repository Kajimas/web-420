"use strict";
/**
    Title: app.js
    Author: William Egge
    Date: 18 March 2023
    Description: Setting up the app.js file
 */
// Importing the required modules
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const composerRoutes = require("./routes/Egge-composer-routes");
const personRoutes = require("./routes/Egge-person-routes");
const sessionRoutes = require("./routes/Egge-session-routes");
// using the express module as app
const app = express();
// establishing the port
const port = process.env.PORT || 3000;
const conn = "mongodb+srv://web420_user:s3cret@bellevueuniversity.hyveuqd.mongodb.net/web420DB";
// displaying the connection to the database
mongoose
    .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => {
    console.log("MongoDB connection successful.");
})
    .catch((err) => {
    console.log(err);
});
// The use statements
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Creates const options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "WEB 420 RESTful APIs",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"],
};
const openapiSpecification = swaggerJsdoc(options);
// wire up the database connection
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", composerRoutes);
app.use("/api", personRoutes);
app.use("/api", sessionRoutes);
// app.use("/api/composer", composerRoutes);
// app.use("/api/person", personRoutes);
// app.use("/api/session", sessionRoutes);
const server = http.createServer(app);
// Establishing and logging the connection to the database
server.listen(port, () => {
    console.log(`Application started and listening on port ${port}.`);
});
