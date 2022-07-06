var express = require('express');
var router = express.Router();

const verify = require('./verifyToken');
const fast2sms = require('fast-two-sms');

const userModel = require('../models/users.model');
const remIdModel = require('../models/remId.model');
const lmsCourseModel = require('../models/lmsCourse.model');
const topicModel = require('../models/topic.model');
const schoolDocumentModel = require('../models/schoolDocument.model');



// Trim spaces
function trimSpace(value){
    return value.trim();
  }
  
  // Trim spaces
  function lowerString(value){
    return value.toLowerCase();
  }


/* get school profile */
router.get('/profile/:schoolId', verify, async (req, res) => {

    try {

        const school = await userModel.findOne({
            userId: req.params.schoolId
        });

        res.status(200).send({ result: school });

    } catch (err) {
        res.status(400).send({ message: "Something went wrong" });
    }

});


/* add student */
router.post('/add-student/:schoolId', verify, async (req, res) => {

    try {
        req.body.email = lowerString(trimSpace(req.body.email));
        req.body.mobile = lowerString(trimSpace(req.body.mobile));

        // check if mobile already exists
        const mobileExist = await userModel.findOne({
            mobile: req.body.mobile
        });
        if (mobileExist) return res.status(400).send({message : "Mobile no. is already registered"});

        // check if email is already registered
        const emailExist = await userModel.findOne({
            email: req.body.email
        });
        if (emailExist) return res.status(400).send({message : "Email no. is already registered"});

        let c_class = req.body.class;
        let c_stream = req.body.stream;
        let c_session = req.body.session;

        // gen session
        function sessionGen(c_session) {
            let g_session;

            if (c_session === "2020-21") {
                g_session = "20";
            }
            else if (c_session === "2021-22") {
                g_session = "21";
            }
            else if (c_session === "2022-23") {
                g_session = "22";
            }
            else if (c_session === "2023-24") {
                g_session = "23";
            }
            else if (c_session === "2024-25") {
                g_session = "24";
            }
            else if (c_session === "2025-26") {
                g_session = "25";
            }

            return g_session;
        }

        // gen stream
        function streamGen(c_stream) {
            let g_stream;

            if (c_stream === "JEE") {
                g_stream = "JE";
            }
            else if (c_stream === "NEET") {
                g_stream = "NT";
            }

            return g_stream;
        }

        let g_session = sessionGen(c_session);
        let g_stream = streamGen(c_stream);

        // gen userid
        function genrate_id(c_class, g_session, g_stream, srno) {
            let genId = `GRSH${c_class}${g_session}${g_stream}${srno}`;

            return genId;
        }

        // incrementing student id
        const remId = await remIdModel.findOne({ remTittle: 'RemTable' });
        const id = (remId.remStudentId + 1);
        const remIdUpdate = await remIdModel.findOneAndUpdate(
            { remTittle: 'RemTable' },
            { remStudentId: id }
        );
        remIdUpdate.save();

        let srno = (remIdUpdate.remStudentId).toString().padStart(6, '0');


        // create new user
        const user = new userModel({
            userId: genrate_id(c_class, g_session, g_stream, srno),
            name: req.body.name,
            mobile: req.body.mobile,
            pMobile: req.body.pMobile,
            email: req.body.email,
            class: req.body.class,
            board: req.body.board,
            batchTime: req.body.batchTime,
            center: req.params.schoolId,
            stream: req.body.stream,
            session: req.body.session,
            school: req.body.school,
            address: req.body.address,
            pass: "gravity000",
            status: "1",
            role: "student",
            schoolRefId: req.params.schoolId
        });

        // send sms to the no.
        fast2sms.sendMessage({
            authorization: process.env.FAST_2_SMS,
            message: `Gravity LMS Login Details:-\nUserId : ${user.email}\nPassword : ${user.pass}\n`,
            numbers: [user.mobile]
        });

        /* // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          // host: "smtp.ethereal.email",
          // port: 587,
          // secure: false, // true for 465, false for other ports
          service: 'gmail',
          auth: {
            user: 'gravityitwork@gmail.com', // user
            pass: 'gravityitwork@123', // password
          }
        });
        
        let content = `
        <h2>Registration Successful</h2>
        <p>Your User Id and Password for Gravity LMS Account</p>
        <h4>User Id : ${user.email}</h4>
        <h4>Password : ${user.pass}</h4>
        <br>
        <br>
        <p>Login Link : <a href="https://gravitydigital.com/">www.gravitydigital.com</a></p>
        <p>For any queries, Call : <a href="tel:+918429981577">+91 84299 81577</a>
        `;
        
        // send mail with defined transport object
        await transporter.sendMail({
          from: '"Gravity LMS" <gravityitwork@gmail.com>', // sender address
          to: user.email, // list of receivers
          subject: "Gravity LMS Registration", // Subject line
          html: content, // html body
        }); */

        user.save(function (err) {
            if (err) {
                res.status(400).send({ message: 'Unable to add student' });
            }
            else {
                res.status(200).send({ message: 'User added successfully. Login Details are sent to given no.', result: user });
            }
        });


    } catch (error) {
        res.status(400).send({ message: "Something went wrong" });
    }
});


/* get all school student */
router.get('/get-school-student/:schoolId', verify, async (req, res) => {
    try {
        const usersList = await userModel.find(
            { schoolRefId: req.params.schoolId }
        );
        // console.log(usersList);
        res.status(200).send({ result: usersList });

    } catch (err) {
        res.status(500).send({message : "Something went wrong"});
    }
});


/* STUDENT LIST WITH FILTER */
router.put('/filter-student/:schoolId', verify, async (req, res) => {
    try {
        const usersList = await userModel.find(
            {$and: [
                {$or: [
                    { class: req.body.class },
                    { session: req.body.session },
                    { mobile: req.body.id },
                    { email: req.body.id },
                    { userId: req.body.id }
                ]}, 
                { schoolRefId: req.params.schoolId }
            ]}
        );
        // console.log(usersList);
        res.status(200).send({ result: usersList });

    } catch (err) {
        res.status(500).send({message : "Something went wrong"});
    }
});


/* attendence add date in absent array */
router.put('/absent/:schoolId', verify, async (req, res) => {
    try {
        console.log(req.body);

        const student = await userModel.findOneAndUpdate(
            {
                userId : req.body.userId,
                schoolRefId : req.params.schoolId
            }, 
            {
                $addToSet : {
                    absentDate : req.body.date
                }
            }
        );


        student.save(function(err) {
            if (err) {
                res.status(400).send({message : "Unable to absent student"});
            } 
            else {
                res.status(200).send({message : "Student absent successfully"});
            }
        });
        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }
});


/* attendence remove date in absent array */
router.put('/present/:schoolId', verify, async (req, res) => {
    try {
        console.log(req.body);
        const student = await userModel.findOneAndUpdate(
            {
                userId : req.body.userId,
                schoolRefId : req.params.schoolId
            }, 
            {
                $pull : {
                    absentDate : req.body.date
                }
            }
        );

        student.save(function(err) {
            if (err) {
                res.status(400).send({message : "Unable to present student"});
            } 
            else {
                res.status(200).send({message : "Student present successfully"});
            }
        });
        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }
});


/* assign lms course */
router.post('/assign-lmscourse/:schoolId', verify, async (req, res) => {

    try {

        const school = await userModel.findOne({
            userId : req.params.schoolId
        });

        if(school.lmsCourse.includes(req.body.lmsCourse)) {
            const student = await userModel.findOne({
                $or : [
                    {userId : req.body.studentId},
                    {email : req.body.studentId},
                    {mobile : req.body.studentId}
                ],
                role : "student"
            });
            if(!student) return res.status(400).send({message : "Invalid student id"});

            if(!(student.lmsCourse.includes(req.body.lmsCourse))){
                student.lmsCourse.push(req.body.lmsCourse);
            }

            student.save(function(err) {
                if (err) {
                    res.status(400).send({message : "Course not assigned"});
                } 
                else {
                    res.status(200).send({message : "Course assigned successfully"});
                }
            });
        }
        else {
            res.status(400).send({message : "You can't assign this course"});
        }

        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }

});


/* get lms course */
router.get('/get-lmscourse/:schoolId/:courseId', verify, async (req, res) => {

    try {

        const school = await userModel.findOne({
            userId : req.params.schoolId
        });

        if(school.lmsCourse.includes(req.params.courseId)) {
            const lmsCourse = await lmsCourseModel.findOne({
                cName : req.params.courseId
            });

            res.status(200).send({result : lmsCourse});
        }
        else {
            res.status(400).send({message : "You can't assign this course"});
        }

        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }

});


/* Get topics details for lms Course and subject */
router.get('/get-lmscourse/:schoolId/:courseId/:subjectId', verify, async (req, res) => {
    try {
      const user = await userModel.findOne({userId : req.params.schoolId});
      if(user.lmsCourse.includes(req.params.courseId)){
        topicModel.find(
          {
            courseId : req.params.courseId, 
            subjectId : req.params.subjectId
          }, 
          function(err, topicList){
            if (err) {
              res.send({status: 500, message: 'Some error occured'})
            } else {
              res.send({status: 200, result: topicList})
            }
          }
        );
      }
      else{
        res.send({message : "The course is not assigned to you"});
      }
    }
    catch(err){
      res.send(err);
    }  
  });


/* STUDENT LIST WITH COURSE FILTER */
/* router.put('/filterStudentByCourse/:schoolId', async (req, res) => {
    try {
        const filteredUserList = [];
        await userModel.find(function (err, userList) {
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].lmsCourse.includes(req.body.courseId)) {
                    filteredUserList.push(userList[i]);
                }
            }
        });
        res.status(200).send({ result: filteredUserList });

    } catch (err) {
        res.status(500).send(err);
    }
}); */
  

/* get notice */
router.get('/get-notice', verify, async (req, res) => {
    try {
        const notice = await schoolDocumentModel.find(
            {type : "Notice"}
        ).sort(
            {createdTime : -1}
        );

        res.status(200).send({result : notice});
        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }
});
  

/* get notice */
router.get('/get-report/:schoolId', verify, async (req, res) => {
    try {
        const report = await schoolDocumentModel.find(
            {
                type : "Report",
                schoolId : req.params.schoolId
            }
        ).sort(
            {createdTime : -1}
        );

        res.status(200).send({result : report});
        
    } catch (err) {
        res.status(400).send({message : "Something went wrong"});
    }
});







module.exports = router;
