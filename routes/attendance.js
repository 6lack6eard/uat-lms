var express = require('express');
var router = express.Router();
const multer = require('multer');

const userModel = require('../models/users.model');
const lmsCourseModel = require('../models/lmsCourse.model');
const crashCourseModel = require('../models/crashCourse.model');
const topicModel = require('../models/topic.model');
const liveClassModel = require('../models/liveClass.model');
const remIdModel = require('../models/remId.model');
const batchMstModel = require('../models/batchMst.model');
const batchDateTypeModel = require('../models/batchDateType.model');


// create new batch
router.post('/create-batch', async ( req, res ) => {

    try {
    
        /* valid batch */
        const invaildBatch = await batchMstModel.findOne({
            name : req.body.name
        });
        if (invaildBatch) return res.status(400).send({message : 'Batch Already Exists'});
        
        /* batch id update */
        const remId = await remIdModel.findOne({remTittle : 'RemTable'});
        const id = (remId.remBatchId + 1);
        const remIdUpdate = await remIdModel.findOneAndUpdate(
            {remTittle : 'RemTable'},
            {remBatchId : id}
        );
        remIdUpdate.save();
    
        /* create batch */
        const batch = new batchMstModel ({
            id: (remIdUpdate.remBatchId).toString().padStart(4, '0'),
            type: req.body.type,
            name: req.body.name
        });
    
        /* save batch */
        batch.save(function (err) {
            if(err) return res.status(400).send({message: 'Unable to create Batch'});
            else return res.status(200).send({message: 'New Batch created', batchDetails: batch});
        });

    } 
    catch (err) {
        res.status(400).send({message : 'Something wwnt wrong'});
    }
});


// get all batch
router.get('/get-batchlist', async ( req, res ) => {

    try {

        /* find all batches */
        const batchList = await batchMstModel.find();

        res.status(200).send({result : batchList})

    } 
    catch (err) {
        res.status(400).send({message : 'Something wwnt wrong'});
    }

});


/* add batch date */
router.post('/batch-date-type', async (req, res) => {

    try {

        const dateExist = await batchDateTypeModel.findOne({
            batchId: req.body.batchId,
            date: req.body.date
        });
        if (dateExist) return res.status(400).send({ message: "Date already marked" });

        const date = new batchDateTypeModel({
            batchId: req.body.batchId,
            date: req.body.date,
            type: req.body.type
        });

        date.save(function (err) {
            if (err) return res.status(400).send({ message: 'Unable to add Date' });
            else return res.status(200).send({ message: 'Date marked successfully', result: date });
        });

    } catch (err) {
        res.status(400).send({ message: "Something went wrong" });
    }

});


/* get all batch dates */
router.get('/get-batch-dates/:batchId', async (req, res) => {
    try {

        const date = await batchDateTypeModel.find({
            batchId: req.params.batchId
        }).sort({date:1});

        res.status(200).send({ result: date });

    } 
    catch (err) {
        res.status(400).send({ message: "Something went wrong" });
    }
});


/* get single batch date */
router.get('/get-batch-date-type/:batchId/:date', async (req, res) => {
    try {

        const date = await batchDateTypeModel.findOne({
            batchId: req.params.batchId,
            date: req.params.date,
        });

        res.status(200).send({ result: date });

    } 
    catch (err) {
        res.status(400).send({ message: "Something went wrong" });
    }
});



module.exports = router;