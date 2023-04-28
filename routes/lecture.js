var express = require('express');
var router = express.Router();

const multer = require('multer');

const userModel = require('../models/users.model');
const lmsCourseModel = require('../models/lmsCourse.model');
const topicModel = require('../models/topic.model');
const liveClassModel = require('../models/liveClass.model');
const remIdModel = require('../models/remId.model');
const registrationCodeModel = require('../models/registrationCode.model');

// Document Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!file) {
            return null;
        } else {
            return cb(null, "./document")
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

// create new course
router.post('/create-course', async ( req, res ) => {

    function courseFinder(courseType){
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

    const vaildCourse = await lmsCourseModel.findOne({cName : req.body.cName});
    if (vaildCourse) return res.status(400).send('Course Already Exists');

    const lmsCourse = new lmsCourseModel ({
        cType : req.body.cType,
        cName : req.body.cName,
        cSubject : courseFinder(req.body.cType)
    });

    lmsCourse.save(function (err, courseObj) {
        if(err){
            res.send({status: 500, message: 'Unable to create test'});
        }
        else{
            res.send({status: 200, message: 'Test created successfully', courseDetails: lmsCourse});
        }
    });
});


// get all courses
router.get('/get-courses', async ( req, res ) => {
    lmsCourseModel.find(function(err, lmsCourseList){
        if (err) {
            res.send({status: 500, message: 'Some error occured'})
        } else {
            res.send({status: 200, result : lmsCourseList})
        }
    })
});


// get one course
router.get('/get-course/:courseId', async ( req, res ) => {
    try {
        const lmsCourse = await lmsCourseModel.findById(req.params.courseId);
        res.json(lmsCourse);
    } catch (err) {
        res.json({message : err});
    }
});


// delete one course
router.put('/delete-course/:courseId', async ( req, res ) => {
    try {
        const lmsCourse = await lmsCourseModel.findByIdAndDelete(req.params.courseId);
        
        // delete course for every user also
        const userList = await userModel.find(function( err, userList ){
            for (let i = 0; i < userList.length; i++) {
                if(userList[i].lmsCourse.includes(lmsCourse.cName)){
                    for (let j = 0; j < (userList[i].lmsCourse).length; j++) {
                        if(userList[i].lmsCourse[j] === lmsCourse.cName) {
                            userList[i].lmsCourse.splice(j, 1);
                            // console.log(userList[i].lmsCourse.splice(j, 1));
                            // console.log(userList[i].lmsCourse);
                        }
                    }
                    userList[i].save();
                }
            }
        });
        res.json(lmsCourse);
    } catch (err) {
        res.json({message : err});
    }
});


// get subjects of the course
router.get('/get-subject/:cName', async (req, res) => {
    try {
        const course = await lmsCourseModel.findOne({cName : req.params.cName});
        res.json(course.cSubject);
    } 
    catch (err) {
        res.json({message : err});
    }
});


// create new topic
router.post('/create-topic', async (req, res) => {
    const topicExist = await topicModel.findOne({topicName : req.body.topicName, subjectId : req.body.subjectId, courseId : req.body.courseId});
    if(topicExist) return res.send({status: 400, message: 'Topic already exist'});

    const remId = await remIdModel.findOne({remTittle : 'RemTable'});
    const id = (remId.remTopicId + 1);

    const remIdUpdate = await remIdModel.findOneAndUpdate(
        {remTittle : 'RemTable'},
        {remTopicId : id}
    );
    remIdUpdate.save();
    
    const topic = await new topicModel({
        courseId : req.body.courseId,
        subjectId : req.body.subjectId,
        topicId : (remIdUpdate.remTopicId).toString().padStart(3, '0'),
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
router.delete('/delete-topic/:_id', async (req, res) => {
    try {
        await topicModel.findByIdAndDelete(req.params._id);
        res.send({message : "topic deleted successfully"});
    }
    catch(err){
        res.send(err);
    }
})


// get all topics for the subject
router.get('/get-topic/:courseId/:subjectId', async ( req, res ) => {
    topicModel.find({courseId : req.params.courseId, subjectId : req.params.subjectId}, function(err, topicList){
        if (err) {
            res.send({status: 500, message: 'Some error occured'})
        } else {
            res.send({status: 200, result: topicList})
        }
    });
});


// add new lecture to existing course
router.put('/add-topic-lecture', async (req, res) => {

    function extractVideoId(video){
        let videoId = video.split('/').pop();
        return videoId;
    }

    const topic = await topicModel.findOneAndUpdate(
        {
            courseId : req.body.courseId, 
            subjectId : req.body.subjectId, 
            topicId : req.body.topicId
        },
        {
            $addToSet : {
                videoList : extractVideoId(req.body.video)
            }
        }
    );

    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to create topic'});
        }
        else{
            res.send({status: 200, message: 'Topic created successfully', topicDetails: topic});
        }
    });
});


// get all lectures for the topic
router.get('/get-topic-lecture/:courseId/:subjectId/:topicId', async ( req, res ) => {
    try {
        const topic = await topicModel.findOne(
            {
                courseId : req.params.courseId, 
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
router.put('/change-topic-lecture/:topicId/:videoId/:changeVideoId', async( req, res ) => {
    const topic = await topicModel.findOne(
        {topicId : req.params.topicId}
    );

    for (let i = 0; i < topic.videoList.length; i++) {
        if (topic.videoList[i] === req.params.videoId) {
            topic.videoList.splice(i, 1, (req.params.changeVideoId));
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
});


// delete selected lecture of the topic
router.delete('/delete-topic-lecture/:topicId/:videoId', async( req, res ) => {
    const topic = await topicModel.findOne(
        {topicId : req.params.topicId}
    );

    for (let i = 0; i < topic.videoList.length; i++) {
        if (topic.videoList[i] === req.params.videoId) {
            topic.videoList.splice(i, 1);
        }            
    }

    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to delete lecture'});
        }
        else{
            res.send({status: 200, message: 'Topic created successfully', topicDetails: topic});
        }
    });
});


// add live class link
router.post('/create-live-class-link', async( req , res )=> {

    const liveClass = await new liveClassModel({
        courseId : req.body.courseId,
        subjectId : req.body.subjectId,
        topic : req.body.topic,
        teacherName : req.body.teacherName,
        startTime : req.body.startTime,
        duration : req.body.duration,
        description : req.body.description,
        link : req.body.link
    });

    liveClass.save(function(err) {
        if(err){
            res.send(err).status(500);
        }
        else{
            res.status(200).send({liveClassDetails : liveClass});
        }
    });
}); 


// get all links
router.get('/get-live-class-link/:courseId', async (req, res) => {
    liveClassModel.find({courseId : req.params.courseId}, function(err, liveClassList) {
        if (err) {
            res.send(err).status(400);
        }
        else{
            res.send({result : liveClassList}).status(200);
        }
    })
});


// delete link
router.delete('/delete-live-class-link/:classLink', async (req, res) => {
    try {
        await liveClassModel.findByIdAndDelete(req.params.classLink);
        res.send({message : "Live Class Link deleted successfully"});
    }
    catch(err){
        res.send(err);
    } 
});


// add new document to existing course
router.put('/add-topic-document', document.single('documentList'), async (req, res) => {

    // for verfiying that image exists in the request
    function file(){
        if (req.file) {
            return req.file.filename;
        } 
    }

    const topic = await topicModel.findOneAndUpdate(
        {
            courseId : req.body.courseId, 
            subjectId : req.body.subjectId, 
            topicId : req.body.topicId
        },
        {
            $addToSet : {
                documentList : `${req.protocol}://${req.get("host")}/document/${file()}`
            }
        }
    );

    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to create topic'});
        }
        else{
            res.send({status: 200, message: 'Topic created successfully', topicDetails: topic});
        }
    });
});


// delete selected note of the topic
router.put('/delete-topic-note/:topicId', async( req, res ) => {
    const topic = await topicModel.findById(req.params.topicId);
        
    // console.log(req.body.document);
    
    for (let i = 0; i < topic.documentList.length; i++) {
        if (topic.documentList[i] === req.body.document) {
            topic.documentList.splice(i, 1);
        }            
    }
    
    topic.save(function (err) {
        if(err){
            res.send({status: 500, message: 'Unable to delete lecture'});
        }
        else{
            res.send({status: 200, message: 'Topic created successfully', topicDetails: topic});
        }
    });
});


// create new or reset registration code
router.get('/reset-registration-code', async (req, res) => {
    try {        
        regCode = await registrationCodeModel.findOne({
            regCodeTittle : "registrationCode"
        });

        function randCode(){
            var code = "Gravity-";
            var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
            
            for (i = 1; i <= 5; i++) {
                var char = Math.floor(Math.random() * str.length + 1);
                code = code + str.charAt(char);
            }

            return code;
        }

        if(!(regCode)){
            genRegCode = new registrationCodeModel({
                regCodeTittle : "registrationCode",
                regCode : randCode()
            });

            genRegCode.save(function(err){
                if(err){
                    res.status(400).send({message : "Registration Code generation failed"});
                }
                else{
                    res.status(200).send({message : "Registration Code generated successfully", regCode : genRegCode.regCode});
                }
            });
        }
        else{

            regCode.regCode = randCode();

            regCode.save(function(err){
                if(err){
                    res.status(400).send({message : "Registration Code updation failed"});
                }
                else{
                    res.status(200).send({message : "Registration Code updated successfully", regCode : regCode.regCode});
                }
            });
        }

    } 
    catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }
});


// get current registration code
router.get('/get-registration-code', async (req, res) => {
    try {

        const regCode = await registrationCodeModel.find({
            regCodeTittle : "registrationCode"
        });

        res.status(200).send({result : regCode});
        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }
});


module.exports = router;