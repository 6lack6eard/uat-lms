var express = require('express');
var router = express.Router();
const multer = require('multer');

const userModel = require('../models/users.model');
const moduleCourseModel = require('../models/moduleCourse.model');
const moduleTopicModel = require('../models/moduleTopic.model');
const moduleQuestionModel = require('../models/moduleQuestion.model');
const remIdModel = require('../models/remId.model');


// Document Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!file) {
            return null;
        } else {
            return cb(null, "./module-note")
        }
    },
    filename: (req, file, cb) => {
        if (!file) {
            return null;
        } else {
            return cb(null, `${file.fieldname}_${Date.now()}.pdf`);
        }
    }
});
const document = multer({
    storage: storage,
    limits: 20000000
});


// create new module course
router.post('/create-module', async ( req, res ) => {

    function subjectFinder(courseType){
        if(courseType==="JEE"){
            courseSubject = ["Physics", "Chemistry", "Math"];
        }
        else if(courseType==="NEET"){
            courseSubject = ["Physics", "Chemistry", "Biology"];
        }
        else if(courseType==="COMMON"){
            courseSubject = ["Physics", "Chemistry", "Math", "Biology", "Mat", "Sst", "Computer", "English"];
        }
        return courseSubject;
    };

    const vaildModule = await moduleCourseModel.findOne({mName : req.body.mName});
    if (vaildModule) return res.send({status : 400 , message : 'Module Already Exists'});

    const moduleCourse = new moduleCourseModel ({
        mType : req.body.mType,
        mName : req.body.mName,
        mSubject : subjectFinder(req.body.mType)
    });

    moduleCourse.save(function (err, courseObj) {
        if(err){
            res.send({status: 500, message: 'Unable to create Module'});
        }
        else{
            res.send({status: 200, message: 'Module created successfully', courseDetails: moduleCourse});
        }
    });
});


// get all modules
router.get('/get-modules', async ( req, res ) => {
    moduleCourseModel.find(function(err, moduleCourseList){
        if (err) {
            res.send({status: 500, message: 'Some error occured'})
        } else {
            res.send({status: 200, result: moduleCourseList})
        }
    })
});


// get one module
router.get('/get-module/:moduleId', async ( req, res ) => {
    try {
        const moduleCourse = await moduleCourseModel.findById(req.params.moduleId);
        res.json(moduleCourse);
    } catch (err) {
        res.json({message : err});
    }
});


// delete one module
router.put('/delete-module/:moduleId', async ( req, res ) => {
    try {
        const moduleCourse = await moduleCourseModel.findByIdAndDelete(req.params.moduleId);
        
        // delete course for every user also
        const userList = await userModel.find(function( err, userList ){
            for (let i = 0; i < userList.length; i++) {
                if(userList[i].moduleCourse.includes(moduleCourse.mName)){
                    for (let j = 0; j < (userList[i].moduleCourse).length; j++) {
                        if(userList[i].moduleCourse[j] === moduleCourse.mName) {
                            userList[i].moduleCourse.splice(j, 1);
                            // console.log(userList[i].lmsCourse.splice(j, 1));
                            // console.log(userList[i].lmsCourse);
                        }
                    }
                    userList[i].save();
                }
            }
        });
        res.json(moduleCourse);
    } catch (err) {
        res.json({message : err});
    }
});


// get subjects of the module
router.get('/get-subject/:mName', async (req, res) => {
    try {
        const course = await moduleCourseModel.findOne({mName : req.params.mName});
        res.json(course.mSubject);
    } 
    catch (err) {
        res.json({message : err});
    }
});


// create new topic
router.post('/create-module-topic', async (req, res) => {
    const topicExist = await moduleTopicModel.findOne({
        topicName : req.body.topicName, 
        subjectId : req.body.subjectId, 
        moduleId : req.body.moduleId
    });
    if(topicExist) return res.send({status: 400, message: 'Topic already exist'});

    const remId = await remIdModel.findOne({remTittle : 'RemTable'});
    const id = (remId.remModuleTopicId + 1);

    const remIdUpdate = await remIdModel.findOneAndUpdate(
        {remTittle : 'RemTable'},
        {remModuleTopicId : id}
    );
    remIdUpdate.save();
    
    const topic = await new moduleTopicModel({
        moduleId : req.body.moduleId,
        subjectId : req.body.subjectId,
        topicId : (remIdUpdate.remModuleTopicId).toString().padStart(4, '0'),
        topicName : req.body.topicName
    });

    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to create topic'});
        }
        else{
            res.send({status: 200, message: 'Topic created successfully', topicDetails: topic});
        }
    });
});


// delete topic
router.delete('/delete-module-topic/:topicId', async (req, res) => {
    try {
        await moduleTopicModel.findByIdAndDelete(req.params.topicId);
        res.send({message : "Module topic deleted successfully."});
    }
    catch(err){
        res.send(err);
    }
})


// get all module topics for the subject of the course
router.get('/get-module-topic/:moduleId/:subjectId', async ( req, res ) => {
    moduleTopicModel.find({moduleId : req.params.moduleId, subjectId : req.params.subjectId}, function(err, moduleTopicList){
        if (err) {
            res.send({status: 500, message: 'Some error occured'})
        } else {
            res.send({status: 200, result: moduleTopicList})
        }
    });
});


// add new module solution to existing course
router.put('/add-module-topic-question-solution', document.single('moduleNote'), async (req, res) => {

    // for extracting video id
    function extractVideoId(video){
        let videoId = video.split('/').pop();
        return videoId;
    }

    // for verfiying that image exists in the request
    function file(){
        if (req.file) {
            return req.file.filename;
        } 
    }

    const topic = await moduleTopicModel.findOneAndUpdate(
        {
            moduleId : req.body.moduleId, 
            subjectId : req.body.subjectId, 
            topicId : req.body.topicId
        },
        {
            $addToSet : {
                questionList : {
                    questionId : req.body.questionId,
                    videoId : extractVideoId(req.body.video),
                    note : `${req.protocol}://${req.get("host")}/module-note/${file()}`
                }
            }
        }
    );

    const moduleQuestion = new moduleQuestionModel({
        moduleId : req.body.moduleId, 
        subjectId : req.body.subjectId, 
        topicId : req.body.topicId,
        topicName : topic.topicName,
        questionId : req.body.questionId,
        videoId : extractVideoId(req.body.video),
        note : `${req.protocol}://${req.get("host")}/module-note/${file()}`
    });

    moduleQuestion.save(function (err){
        if(err){
            res.status(400).send({message : "Unable to add data to separate question list"});
        }
    });

    topic.save(function (err) {
        if(err){
            res.send({status: 400, message: 'Unable to create module topic'});
        }
        else{
            res.send({status: 200, message: 'Module Topic created successfully', topicDetails: topic});
        }
    });
});


// get module topic question solution
router.get('/get-module-topic-question-solution/:moduleId/:subjectId/:topicId', async ( req, res ) => {
    try {
        const topic = await moduleTopicModel.findOne(
            {
                moduleId : req.params.moduleId, 
                subjectId : req.params.subjectId, 
                topicId : req.params.topicId
            }
        );    
        res.send({result: topic});        
    } catch (err) {
        res.json({message : err});
    }
});


// change selected lecture of the topic
/* router.put('/change-module-topic-question-solution/:topicId', async( req, res ) => {
    const topic = await moduleTopicModel.findOne(
        {topicId : req.params.topicId}
    );

    for (let i = 0; i < topic.questionList.length; i++) {
        if (topic.videoList[i] === req.body.videoId) {
            topic.videoList.splice(i, 1, (req.body.changeVideoId));
        }            
    }

    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to change lecture'});
        }
        else{
            res.send({status: 200, message: 'Topic changed successfully', topicDetails: topic});
        }
    });
}); */


// delete selected lecture of the topic
router.delete('/delete-module-topic-question-solution/:topicId/:_id', async( req, res ) => {
    const topic = await moduleTopicModel.findOne(
        {topicId : req.params.topicId}
    );

    for (let i = 0; i < topic.questionList.length; i++) {
        if ((topic.questionList[i]._id).toString() === req.params._id) {
            topic.questionList.splice(i, 1);
        }            
    }

    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to delete lecture'});
        }
        else{
            res.send({status: 200, message: 'Question removed succeccfully', topicDetails: topic});
        }
    });
});


// search questionId from a topic in module
/* router.put('/get-module-topic-question-solution', async( req, res )=>{
    try {
        const topic = await moduleTopicModel.findOne(
            {topicId : req.body.topicId}
        );
        var genQuestionId, genVideoId;
    
        for (let i = 0; i < topic.questionList.length; i++) {
            if(topic.questionList[i].questionId === req.body.questionId){
                genQuestionId = topic.questionList[i].questionId;
                genVideoId = topic.questionList[i].videoId;
                break;
            }        
        }

        res.send({status: 200 , result: {questionId: genQuestionId, videoId: genVideoId}});
        
    } catch (err) {
        res.send(err);
    }
    
}); */


module.exports = router;