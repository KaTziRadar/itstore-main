const express = require("express");
const ProductModel = require("../models/Products.js");
const bcrypt = require('bcrypt');

require('dotenv').config();
const router = express.Router();

router.post("/addProducts", async (req, res) => {
    console.log(req.body.data);
    try {
        ProductModel.insertMany(req.body.data);
        console.log('\nAdded products successfully !');
        res.json({ message: "Added products successfully !" });
    } catch (err) {
        console.log('err: ' + err)
        res.json({ message: err });
    }
});

router.post("/getAllProducts", async (req, res) => {
    console.log('Trying to get all products: ');
    const products = await ProductModel.find();

    if (!products) {
        console.log("There are no products")
        return res.status(400).json({ message: "There are no products" });
    }

    res.status(200).send(products);
});

module.exports = { productRouter: router };