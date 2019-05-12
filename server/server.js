const express = require("express"),
      app = express(),
      config = require("config"),
      cors = require("cors"),
      mongoose = require("mongoose"),
      createError = require("./helpers/createError.js");


//Middleware

    //Parse request body
    app.use(express.json());

    //Enable cors
    app.use(cors());


    //Import routes
    app.use("/api/auth", require("./routes/api/auth.js"));



    //Error Handling Middleware
    app.use("/", (err, req, res, next) => {
        if (!err.status) {
            err = createError("Server Error", 500);
        }
        res.status(err.status).json({message: err.message});
    })

    //Connect to database
    mongoose.connect(config.get("MongoURI"))
    .then(() => console.log("Mongoose connected"))
    .catch(err => console.log(err));

app.listen(8082, () => {
    console.log("works")
})


      
