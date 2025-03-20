const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const roles = () => mongoose.connection.db.collection('roles')



router.get("/role", async (req, res) => {
    try {
        const user = await roles().find({}).toArray();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in fetching data",
        });
    }
});


module.exports = router