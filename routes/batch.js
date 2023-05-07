var express = require('express');
var router = express.Router();

const batchMstModel = require('../models/batchMst.model');
const remIdModel =  require('../models/remId.model');


/* create batch */
router.post('/createBatch', async (req, res) => {

    try {

        const batchExists = await batchMstModel.findOne({
            name : req.body.name
        });

        if(batchExists) return res.status(400).send({message : "Batch already exists with this name"});

        const remId = await remIdModel.findOneAndUpdate(
            {remTittle : 'RemTable'},
            {$inc : {remBatchId : 1}}
        );

        const batch = new batchMstModel({
            id : (remId.remBatchId).toString().padStart(4, '0'),
            name : req.body.name,
            type : req.body.type
        });

        batch.save((err) => {
            if (err) res.status(400).send({message : "Unable to add new batch"});
            else res.status(200).send({message : "New batch added successfully", result : batch});
        })
        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }

});


/*  get all batch */
router.get('/getBatchlist', async ( req, res ) => {

    try {

        const batchList = await batchMstModel.find();

        res.status(200).send({result : batchList})

    } catch (err) {
        res.status(400).send({message : 'Something wwnt wrong'});
    }

});



module.exports = router;