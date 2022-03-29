var express = require('express');
var router = express.Router();
const multer = require('multer');

const userModel = require('../models/users.model');
const lmsCourseModel = require('../models/lmsCourse.model');
const crashCourseModel = require('../models/crashCourse.model');
const topicModel = require('../models/topic.model');
const liveClassModel = require('../models/liveClass.model');
const remIdModel = require('../models/remId.model');


// create new crash course
router.post('/create-crash-course', async ( req, res ) => {

    // crash Course id Update
    const remId = await remIdModel.findOne({remTittle : 'RemTable'});
    const id = (remId.remCrashCourseId + 1);
    const remIdUpdate = await remIdModel.findOneAndUpdate(
        {remTittle : 'RemTable'},
        {remCrashCourseId : id}
    );
    remIdUpdate.save();

    // subject of the crashc ourse
    function subjectFinder(crashCourseType){
        if(crashCourseType === "JEE"){
            crashCourseSubject = ["Physics", "Chemistry", "Math"];
        }
        else if(crashCourseType=== "NEET"){
            crashCourseSubject = ["Physics", "Chemistry", "Biology"];
        }
        else if(crashCourseType=== "COMMON"){
            crashCourseSubject = ["Physics", "Chemistry", "Math", "Biology", "Mat", "Sst"];
        }
        
        return crashCourseSubject;
    };

    const vaildCourse = await crashCourseModel.findOne({
        crashCourseName : req.body.crashCourseName
    });
    if (vaildCourse) return res.status(400).send('Course Already Exists');

    const crashCourse = new crashCourseModel ({
        crashCourseId: (remIdUpdate.remCrashCourseId).toString().padStart(3, '0'),
        crashCourseType: req.body.crashCourseType,
        crashCourseName: req.body.crashCourseName,
        crashCourseSubject: subjectFinder(req.body.crashCourseType),
        crashCourseDes: req.body.crashCourseDes,
        crashCoursePrice: req.body.crashCoursePrice,
        lmsCourseName: req.body.lmsCourseName,
    });

    crashCourse.save(function (err) {
        if(err){
            res.status(400).send({message: 'Unable to create test'});
        }
        else{
            res.status(200).send({message: 'Test created successfully', courseDetails: crashCourse});
        }
    });
});


// get all crash courses
router.get('/get-crash-courses', async ( req, res ) => {
    crashCourseModel.find(function(err, crashCourseList){
        if (err) {
            res.status(400).send({message: 'Some error occured'})
        } else {
            res.status(200).send({result : crashCourseList})
        }
    })
});


// get one crash course
router.get('/get-crash-course/:crashCourseId', async ( req, res ) => {
    try {
        const crashCourse = await crashCourseModel.findOne({
            crashCourseId : req.params.crashCourseId
        });
        res.status(200).send(crashCourse);
    } catch (err) {
        res.status(400).json({message : 'Something went wrong'});
    }
});


// delete crash course
router.delete('/delete-crash-course/:crashCourseId', async (req, res) => {
    try {

        await crashCourseModel.findByIdAndDelete(req.params.crashCourseId);

        res.status(200).send({message : 'Crash course deleted successfully'});
        
    } catch (error) {
        res.status(400).send({message : 'Something went wrong'});
    }
})


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
        res.status(200).send({message : 'Course deleted successfully'});
    } catch (err) {
        res.status(400).send({message : 'Something went wrong'});
    }
});


module.exports = router;