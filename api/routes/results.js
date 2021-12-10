const express = require("express");
const ResultDao = require("../data/ResultDao");
const ApiError = require("../models/ApiError");
const result = new ResultDao();
const router = express.Router();


router.get("/api/results", async (req, res, next) => {
    try{
        const data = await result.readAll();
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.get("/api/results/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await result.read(id);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.post("/api/results", async (req, res, next) => {
    try {
        const { command } = req.body;

        if (command === undefined) {
            throw new ApiError(400, "Require command string");
        } 
        const data = await result.create(command);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.put("/api/results/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        let { data, image } = req.body;

        if (data === undefined && image === undefined) {
            throw new ApiError(400, "Require values inorder to update");
        }
        data = await result.update(id, { data, image} );
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

router.delete("/api/results/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await result.delete(id);
        res.status(200).json({data});
    } catch (err) {
        next(err);
    }
});

module.exports = router;