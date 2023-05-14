/**
 Title: populateDatabase.js
 Author: William Egge
 Date: 14 May 2023
 Description: This code creates a connection to MongoDB Atlas and inserts sample data into a collection named "teams".
 */

"use strict";

const mongoose = require("mongoose");
const Team = require("./models/Egge-team");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://web420_user:s3cret@bellevueuniversity.hyveuqd.mongodb.net/web420DB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");

  // Sample teams and players
  const sampleTeams = [
    {
      name: "Team A",
      mascot: "Mascot A",
      players: [
        { firstName: "John", lastName: "Doe", salary: 100000 },
        { firstName: "Jane", lastName: "Doe", salary: 120000 },
      ],
    },
    {
      name: "Team B",
      mascot: "Mascot B",
      players: [
        { firstName: "James", lastName: "Smith", salary: 130000 },
        { firstName: "Emily", lastName: "Johnson", salary: 110000 },
      ],
    },
  ];

  // Insert sample data
  sampleTeams.forEach(async (teamData) => {
    const team = new Team(teamData);
    await team.save();
  });

  // Close the connection after a delay to allow data insertion to complete
  setTimeout(() => {
    mongoose.connection.close();
    console.log("Disconnected from MongoDB!");
  }, 5000);
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to MongoDB: ", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB!");
});
