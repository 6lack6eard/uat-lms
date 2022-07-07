var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const nodemailer = require('nodemailer');
const fast2sms = require('fast-two-sms');
const jsSHA = require('jssha');
const request = require('request');
const multer = require('multer');

const userModel = require('../models/users.model');
const remIdModel = require('../models/remId.model');
const lmsCourseModel = require('../models/lmsCourse.model');
const crashCourseModel = require('../models/crashCourse.model');
const topicModel = require('../models/topic.model');
const moduleCourseModel = require('../models/moduleCourse.model');
const moduleTopicModel = require('../models/moduleTopic.model');
const moduleQuestionModel = require('../models/moduleQuestion.model');
const liveClassModel = require('../models/liveClass.model');
const schoolDocumentModel = require('../models/schoolDocument.model');
const dateTypeModel = require('../models/dateType.model');


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
      return cb(null, `${file.originalname}_${file.fieldname}_${Date.now()}.pdf`);
    }
  }
});
const document = multer({
  storage: storage,
  limits: 20000000
});

// Trim spaces
function trimSpace(value){
  return value.trim();
}

// Trim spaces
function lowerString(value){
  return value.toLowerCase();
}



/* ========== STUDENT PART =========== */

/* REGISTER new demo user */
router.post('/demo-register', async (req, res) => {
  // check if mobile already exists
  const mobileExist = await userModel.findOne({
    mobile : req.body.mobile
  });
  if(mobileExist) return res.status(400).send("Mobile no. is already registered");

  // check if email is already registered
  const emailExist = await userModel.findOne({
    email: req.body.email
  });
  if(emailExist) return res.status(400).send("Email is already already registered");

  // gen stream
  function streamGen(stream){
    let g_stream;
    
    if(stream === "JEE"){
      g_stream = "JE";
    }
    else if(stream === "NEET"){
      g_stream = "NT";
    }
    else if(stream === "COMMON"){
      g_stream = "CO";
    }

    return g_stream;
  }

  // gen demo lmscourse
  function lmscourseGen(userClass, userStream){
    let course;

    if(userClass === "8"){
      course = "Class 8 Demo";
    }
    else if(userClass === "9"){
      course = "Class 9 Demo";
    }
    else if(userClass === "10"){
      course = "Class 10 Demo";
    }
    else if((userClass === "11") && (userStream === "JEE")){
      course = "Class 11 JEE Demo";
    }
    else if((userClass === "11") && (userStream === "NEET")){
      course = "Class 11 NEET Demo";
    }
    else if((userClass === "12") && (userStream === "JEE")){
      course = "Class 12 JEE Demo";
    }
    else if((userClass === "12") && (userStream === "NEET")){
      course = "Class 12 NEET Demo";
    }
    else if((userClass === "13") && (userStream === "JEE")){
      course = "Class 13 JEE Demo";
    }
    else if((userClass === "13") && (userStream === "NEET")){
      course = "Class 13 NEET Demo";
    }

    return course;
  }

  // genrate pass
  function genPass() {
    var pass = "";
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
  
    for (i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }

    return pass;
  }

  // incrementing student id
  const remId = await remIdModel.findOne({remTittle : 'RemTable'});
  const id = (remId.remStudentId + 1);
  const remIdUpdate = await remIdModel.findOneAndUpdate(
      {remTittle : 'RemTable'},
      {remStudentId : id}
  );
  remIdUpdate.save();
  // genrate srno
  let srno = (remIdUpdate.remStudentId).toString().padStart(6, '0');
  

  const user = new userModel({
    userId: `GRHZ${req.body.class}21${streamGen(req.body.stream)}${srno}`,
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    class: req.body.class,
    center: 'Hazratganj',
    stream: req.body.stream,
    lmsCourse: lmscourseGen(req.body.class, req.body.stream),
    session: "2021-22",
    school: "School",
    address: "Address",
    pass: genPass(),
    status: "2",
    role: "student"
  });

  // send sms to the no.
  fast2sms.sendMessage({
    authorization : process.env.FAST_2_SMS,
    message : `Gravity LMS Login Details:-\nUserId : ${user.email}\nPassword : ${user.pass}\n`,
    numbers : [user.mobile]
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

  user.save(function(err, userObj){
    if(err){
      res.send({status: 500, message: 'Unable to ADD user'});
    }
    else{
      res.send({status: 200, message: 'You registered successfully', result: userObj});
    }

  });
});


/* LOGIN user */
router.post('/login', async (req, res) => {

  req.body.email = lowerString(trimSpace(req.body.email));

  // checking mail exist in db
  const user = await userModel.findOne({
    $or: [
      { email: req.body.email }, 
      { userId : (req.body.email).toUpperCase() }, 
      { mobile : req.body.email }
    ]
  });
  if(!user) return res.status(400).send("Id does not exist");

  // checking password
  const validPass = (req.body.pass === user.pass);
  if(!validPass) return res.status(400).send("Incorrect password");

  // checking authorized role account
  const authorizedRole = (user.role === "student");
  if(!authorizedRole) return res.status(400).send("Only accessible to students");

  // checking deactivated account
  const deactivatedAcc = (user.status === "0");
  if(deactivatedAcc) return res.status(400).send("Your account is deactivated. Kindly contact authorities.");

  // checking activated account
  const activatedAcc = ((user.status === "1") || (user.status === "2"));
  if(!activatedAcc) return res.status(400).send("Some error occured");

  // update last login

    // user.lastLogin = new Date();
    // console.log(user.lastLogin);

  // token generation
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({token: token, result: user._id, userStatus: user.status});
});


/* GET user profile */
router.get('/profile/:studentId', verify, async (req, res) => {
  try {
    const viewProfile = await userModel.findById(req.params.studentId);
    res.json(viewProfile);
  } catch (err) {
    res.json({message : err});
  }
});


/* Edit user profile */
router.put('/edit-profile/:studentId', verify, async (req, res) => {

  req.body.email = lowerString(trimSpace(req.body.email));

  // check if the provided email already exists
  const user = await userModel.findOne({ email: req.body.email });
  if(user) return res.status(400).send("Email already exists");
 
  try {
    let editedProfile;

    if (typeof req.body.email !== 'undefined' && req.body.email.length !== 0) {  
      this.editedProfile = await userModel.findOneAndUpdate(
        { _id : req.params.studentId },
        { email : req.body.email }
      );
    }

    if (typeof req.body.mobile !== 'undefined' && req.body.mobile.length !== 0) {            
      this.editedProfile = await userModel.findOneAndUpdate(
        { _id : req.params.studentId },
        { mobile : req.body.mobile }
      );
    }

    if (typeof req.body.address !== 'undefined' && req.body.address.length !== 0) {            
      this.editedProfile = await userModel.findOneAndUpdate(
        { _id : req.params.studentId },
        { address : req.body.address }
      );
    }

    if (typeof req.body.school !== 'undefined' && req.body.school.length !== 0) {            
      this.editedProfile = await userModel.findOneAndUpdate(
        { _id : req.params.studentId },
        { school : req.body.school }
      );
    }

    res.status(200).save(editedProfile);
  } 
  catch (err) {
    res.json({message : err});
  }
});


/* Update password */
router.put('/profile/:studentId/updatePassword', verify, async (req, res) => {
  try {
    const userProfile = await userModel.findByIdAndUpdate(
      {_id : req.params.studentId},
      {pass: req.body.pass});
    res.save(userProfile);
  } catch (err) {
    res.json({message : err});
  }
});


/* Forgot password nodemailer */
router.put('/forgotPassword', async (req, res) => {

  try {
    const user = await userModel.findOne({email : req.body.email});

    function genPass() {
      var pass = "";
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    
      for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass = pass + str.charAt(char);
      }

      return pass;
    }

    if(user.role === "student"){
      if(!user){
        res.status(400).send({message : "Mail you entered is not registered, Contact support for more details"});
      }
      else{
        user.pass = genPass();
        user.save();
  
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
        <h2>Your Password Changed</h2>
        <p>Your User Id and Password for Gravity LMS Account</p>
        <h4>User Id : ${req.body.email}</h4>
        <h4>Password : ${user.pass}</h4>
        <br>
        <br>
        <p>Login Link : <a href="https://gravitydigital.com/">www.gravitydigital.com</a></p>
        <p>If this wasn't you, Call : <a href="tel:+918429981577">+91 84299 81577</a>
        `;
        
        // send mail with defined transport object
        await transporter.sendMail({
          from: '"Gravity LMS" <gravityitwork@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: "Gravity LMS Password Reset", // Subject line
          html: content, // html body
        }); */

        // send sms to the no.
        fast2sms.sendMessage({
          authorization : process.env.FAST_2_SMS,
          message : `Gravity LMS Login Details:-\nUserId : ${user.email}\nPassword : ${user.pass}\n`,
          numbers : [user.mobile]
        });
        
        res.status(200).send({message : `Updated login details are sent to your registered mobile no. ${((user.mobile).slice(-4)).padStart(10, "*")}`});
      }      
    }
    else 
    if(user.role != "student"){
      res.status(400).send({message : "Feature only available for students"});
    }

  } 
  catch (error) {
    res.status(400).send({message : "Something went wrong"});
  }
  
});


/* Get lms Course Details */
router.get('/get-lms-course/:studentId/:cName', verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.studentId);
    if(user.lmsCourse.includes(req.params.cName)){
      const lmsCourse = await lmsCourseModel.findOne({cName : req.params.cName});
      res.json(lmsCourse);      
    }
    else{
      res.send({message : "The course is not assigned to you"});
    }
  }
  catch(err){
    res.send(err);
  }  
});


/* Get topics details for lms Course and subject */
router.get('/get-lms-course-topic/:studentId/:courseId/:subjectId', verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.studentId);
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


/* Get module Course Details */
router.get('/get-module-course/:studentId/:mName', verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.studentId);
    if(user.moduleCourse.includes(req.params.mName)){
      const moduleCourse = await moduleCourseModel.findOne({mName : req.params.mName});
      res.json(moduleCourse);      
    }
    else{
      res.send({message : "The course is not assigned to you"});
    }
  }
  catch(err){
    res.send(err);
  }  
});


/* Get topics details for module and subject */
router.get('/get-module-course-topic/:studentId/:moduleId/:subjectId', verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.studentId);
    if(user.moduleCourse.includes(req.params.moduleId)){
      moduleTopicModel.find(
        {
          moduleId : req.params.moduleId, 
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


// search questionId from a topic in module
router.put('/get-module-topic-question-solution', verify, async( req, res )=>{
  try {
      const topic = await moduleTopicModel.findOne(
          {topicId : req.body.topicId}
      );
      var genQuestionId, genVideoId, genNoteLink;
  
      for (let i = 0; i < topic.questionList.length; i++) {
          if(topic.questionList[i].questionId === req.body.questionId){
              genQuestionId = topic.questionList[i].questionId;
              genVideoId = topic.questionList[i].videoId;
              genNoteLink = topic.questionList[i].note;
              break;
          }        
      }

      res.send({status: 200 , result: {questionId: genQuestionId, videoId: genVideoId, note: genNoteLink}});
      
  } catch (err) {
      res.send(err);
  }
  
});


// search question within a course subject
router.put('/get-module-subject-questtion-solution', verify, async(req, res)=>{
  try {

    const moduleQuestionList = await moduleQuestionModel.find({
      moduleId : req.body.moduleId,
      subjectId : req.body.subjectId,
      questionId : req.body.questionId
    });

    res.status(200).send({result : moduleQuestionList});
    
  } catch (err) {
    res.status(400).send({message : 'Something went wrong'});
  }
})


/* Get live class link */
router.get('/get-live-class-link/:studentId/:courseId', verify, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.studentId);
    if(user.lmsCourse.includes(req.params.courseId)){
      liveClassModel.find({courseId : req.params.courseId}, function(err, liveClassList){
        if (err) {
          res.send({status: 500, message: 'Some error occured'})
        } else {
          res.send({status: 200, result: liveClassList})
        }
      });
    }
    else{
      res.send({message : "The course is not assigned to you"});
    }
  } catch (err) {
    res.send(err);
  }
});


/* Buy Course */
router.post('/buy-course', verify, async (req, res) => {

  try {

    const crashCourse = await crashCourseModel.findOne({
      crashCourseId : req.body.crashCourseId
    });

    const user = await userModel.findOne({
      userId : req.body.userId
    });

    if (!(user.lmsCourse.includes(crashCourse.lmsCourseName))) {
      user.lmsCourse.push(crashCourse.lmsCourseName);
    }

    user.save(function(error) {
      if(error){
        res.status(400).send({message : 'Course is not assigned'});
      }
      else {
        res.status(200).send({message : 'Course is assigned successfully'});
      }
    });

    
  } catch (error) {
    res.status(400).send({message : 'Something went wrong'});
  }

});


/* Assign new course using promocode */
router.post('/register-code', async (req, res) => {

  function streamGen(stream){
    let g_stream;
    
    if(stream === "JEE"){
      g_stream = "JE";
    }
    else if(stream === "NEET"){
      g_stream = "NT";
    }
    else if(stream === "COMMON"){
      g_stream = "CO";
    }

    return g_stream;
  }

  function genPass() {
    var pass = "";
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
  
    for (i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }

    return pass;
  }  

  function sendMessage(user){
    fast2sms.sendMessage({
      authorization : process.env.FAST_2_SMS,
      message : `Gravity LMS Login Details:-\nUserId : ${user.email}\nPassword : ${user.pass}\n`,
      numbers : [user.mobile]
    });
  }
  
  function saveUser(user){
    user.save(function(err, userObj){
      if(err){
        res.send({status: 500, message: 'Unable to ADD user'});
      }
      else{
        res.send({status: 200, message: 'You registered successfully', result: userObj});
      }
    
    });
  }  
  
  // check if user already exists
  const userExist = await userModel.findOne({
    $or : [
      {mobile : req.body.mobile},
      {email: req.body.email}
    ]
  });
  if(userExist) {
    assignLmsCourse();
    saveUser();
  }
  else {

    // incrementing student id
    const remId = await remIdModel.findOne({remTittle : 'RemTable'});
    const id = (remId.remStudentId + 1);
    const remIdUpdate = await remIdModel.findOneAndUpdate(
        {remTittle : 'RemTable'},
        {remStudentId : id}
    );
    remIdUpdate.save();

    let srno = (remIdUpdate.remStudentId).toString().padStart(6, '0');    

    const user = new userModel({
      userId: `GRHZ${req.body.class}21${streamGen(req.body.stream)}${srno}`,
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      class: req.body.class,
      center: req.body.center,
      stream: req.body.stream,
      lmsCourse: assignLmsCourse(),
      session: req.body.session,
      school: "School",
      address: "Address",
      pass: genPass(),
      status: "1",
      role: "student"
    });

    saveUser();

  }

});










router.post('/payment', (req, res) => {
  //Here pass txnid and it should be different on every call
  req.body.txnid = `TxnId${Number(new Date)}`;
  req.body.email = "abc@gmail.com";
  req.body.firstname = "abc";
  req.body.amount = 1.00;
  req.body.productinfo = "123abc";
  // req.body.service_provider = "payu_paisa";
  //Here save all the details in pay object 
  const pay = req.body;
  const hashString = process.env.PAYU_MERCHANT_KEY //merchant key store in in different file
    + '|' + pay.txnid
    + '|' + pay.amount
    + '|' + pay.productinfo
    + '|' + pay.firstname
    + '|' + pay.email
    + '|' + '||||||||||'
    + process.env.PAYU_MERCHANT_SALT_V1; //merchant salt store in in different file
  
  
  const sha = new jsSHA('SHA-512', "TEXT");
  sha.update(hashString);
  //Getting hashed value from sha module
  const hash = sha.getHash("HEX");

  
  //We have to additionally pass merchant key to API
  //  so remember to include it.
  pay.key = process.env.PAYU_MERCHANT_KEY; //store in in different file;
  pay.surl = '/payment/success';
  pay.furl = '/payment/fail';
  pay.hash = hash;
  
  //Making an HTTP/HTTPS call with request
  request.post({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    url: 'https://sandboxsecure.payu.in/_payment', //Testing url
    form: pay
  }, function (error, httpRes, body) {
    if (error) res.send({status: false, message: error.toString()});

    if (httpRes.statusCode === 200) {
      res.send(body);
    } 
    else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
      res.redirect(httpRes.headers.location.toString());
    }
  })
});

router.post('/payment/success', async (req, res) => {
  console.log(body);
});

router.post('/payment/fail', async (req, res) => {
  console.log(body);
});










/* ========== STUDENT PART END =========== */


/* ========== ADMIN PART =========== */

/* ADMIN-LOGIN */
router.post('/admin-login', async (req, res) => {

  req.body.email = lowerString(trimSpace(req.body.email));

  // checking mail exist in db
  const admin = await userModel.findOne({ email: req.body.email });
  if(!admin) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = (req.body.pass === admin.pass);
  if(!validPass) return res.status(400).send("Invalid Password");

  // checking role
  const validRole = (admin.role === "admin");
  if(!validRole) return res.status(400).send("User not authorized");

  // token generation
  const token = jwt.sign({_id: admin._id, role: admin.role}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token, result : admin});
});


/* ADD NEW STUDENT */
router.post('/addNewStudent', async function(req, res, next) {

  try {

    req.body.email = lowerString(trimSpace(req.body.email));
    req.body.mobile = lowerString(trimSpace(req.body.mobile));
    
    // check if mobile already exists
    const mobileExist = await userModel.findOne({
      mobile : req.body.mobile
    });
    if(mobileExist) return res.status(400).send("Mobile no. is already registered");
    
    // check if email is already registered
    const emailExist = await userModel.findOne({
      email: req.body.email
    });
    if(emailExist) return res.status(400).send("Email is already already registered");
    
    let c_name = req.body.name;
    let c_mobile = req.body.mobile;
    let c_email = req.body.email;
    let c_class = req.body.class;
    let c_center = req.body.center;
    let c_stream = req.body.stream;
    let c_session = req.body.session;
    let c_school = req.body.school;
    let c_address = req.body.address;
    
    // gen center
    function centerGen(c_center){
      let g_center;
      
      if(c_center === "Hazratganj"){
        g_center = "HZ";
      }
      else if(c_center === "Aliganj"){
        g_center = "AL";
      }
      else if(c_center === "Gomti Nagar"){
        g_center = "GM";
      }
      else if(c_center === "Indira Nagar"){
        g_center = "IN";
      }
      
      return g_center;
    }
    
    // gen session
    function sessionGen(c_session){
      let g_session;
      
      if(c_session === "2020-21"){
        g_session = "20";
      }
      else if(c_session === "2021-22"){
        g_session = "21";
      }
      else if(c_session === "2022-23"){
        g_session = "22";
      }
      else if(c_session === "2023-24"){
        g_session = "23";
      }
      else if(c_session === "2024-25"){
        g_session = "24";
      }
      else if(c_session === "2025-26"){
        g_session = "25";
      }

      return g_session;
    }

    // gen stream
    function streamGen(c_stream){
      let g_stream;
      
      if(c_stream === "JEE"){
        g_stream = "JE";
      }
      else if(c_stream === "NEET"){
        g_stream = "NT";
      }
      
      return g_stream;
    }

    // gen password
    function genPass() {
      var pass = "";
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    
      for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass = pass + str.charAt(char);
      }

      return pass;
    }

    let g_center = centerGen(c_center);
    let g_session = sessionGen(c_session);
    let g_stream = streamGen(c_stream);

    // gen userid
    function genrate_id(g_center, c_class, g_session, g_stream, srno){
      let genId = `GR${g_center}${c_class}${g_session}${g_stream}${srno}`;

      return genId;
    } 

    // incrementing student id
    const remId = await remIdModel.findOne({remTittle : 'RemTable'});
    const id = (remId.remStudentId + 1);
    const remIdUpdate = await remIdModel.findOneAndUpdate(
        {remTittle : 'RemTable'},
        {remStudentId : id}
    );
    remIdUpdate.save();

    let srno = (remIdUpdate.remStudentId).toString().padStart(6, '0');

    
    // create new user
    const user = new userModel({
      userId: genrate_id(g_center, c_class, g_session, g_stream, srno),
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      class: req.body.class,
      center: req.body.center,
      stream: req.body.stream,
      session: req.body.session,
      school: req.body.sch,
      address: req.body.add,
      pass: "gravity000",
      status: "1",
      role: "student"
    });

    // send sms to the no.
    fast2sms.sendMessage({
      authorization : process.env.FAST_2_SMS,
      message : `Gravity LMS Login Details:-\nUserId : ${user.email}\nPassword : ${user.pass}\n`,
      numbers : [user.mobile]
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

    user.save(function(err, userObj){
      if(err){
        res.send({status: 500, message: 'Unable to ADD user'});
      }
      else{
        res.send({status: 200, message: 'User added successfully. Login Details are sent to given no.', userDetails: user});
      }
      
    });
  

  } catch (error) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* STUDENT LIST WITH FILTER */
router.put('/filterStudentById', async (req, res)=>{
  try {
    
    req.body.id = lowerString(trimSpace(req.body.id));

    const usersList = await userModel.find({
      $or : [
        { mobile : req.body.id }, 
        { email : req.body.id }, 
        { userId : (req.body.id).toUpperCase() }
      ]
    });
    res.status(200).send({result : usersList});

  } catch (err) {
    res.send(err);
  }
});


/* STUDENT LIST WITH FILTER */
router.put('/filterStudent', async (req, res)=>{
  try {
    req.body.id = lowerString(trimSpace(req.body.id));

    const usersList = await userModel.find({
      $or : [
        { center : req.body.center }, 
        { class : req.body.class }, 
        { session : req.body.session }, 
        { status : req.body.status }, 
        { schoolRefId : req.body.schoolRefId },
        { mobile : req.body.id }, 
        { email : req.body.id }, 
        { userId : (req.body.id).toUpperCase() }
      ]
    });
    res.status(200).send({result : usersList});

  } catch (err) {
    res.send(err);
  }
});


/* STUDENT LIST WITH COURSE FILTER */
router.put('/filterStudentByCourse', async (req, res) => {
  try {
    const filteredUserList = [];
    await userModel.find(function(err, userList) {
      for (let i = 0; i < userList.length; i++) {
        if(userList[i].lmsCourse.includes(req.body.courseId)){
          filteredUserList.push(userList[i]);
        }
      }
    });
    res.status(200).send({result : filteredUserList});

  } catch (err) {
    res.status(500).send(err);
  }
});


/* DEACTIVATE STUDENT */
router.put('/deactivateStudent', async (req, res)=>{
  try {
    console.log(req.body.userId);
    const user = await userModel.findOneAndUpdate(
      {$or: [{userId: req.body.userId}, {email: req.body.userId}]},
      {status: "0"}
    )
    res.save(user);

  } catch (err) {
    res.send({message: "Something went wrong"})
  }
});


/* DELETE STUDENT */
router.put('/deleteStudent', async (req, res)=> {
  try {
    await userModel.findOneAndDelete(
      {userId : req.body.userId}
    )
    res.send({message : "Student deleted successfully"});
  } catch (err) {
    res.send({message: "Student not deleted"})
  }
})


/* ACTIVATE STUDENT */
router.put('/activateStudent', async (req, res)=>{
  try {
    const user = await userModel.findOneAndUpdate(
      {$or: [{userId: req.body.userId}, {email: req.body.userId}]},
      {status: "1"}
    )
    res.save(user);

  } catch (err) {
    res.send({message: "Something went wrong"})
  }
});


/* PASSWORD RESET */
router.put('/restPassword', async (req, res)=>{
  try {
    const user = await userModel.findOne(
      {$or: [{userId: req.body.userId}, {email: req.body.userId}]}
    );

    // gen password
    function genPass() {
      var pass = "";
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    
      for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass = pass + str.charAt(char);
      }

      return pass;
    }

    // change pass here   
    user.pass = "gravity000";
    user.save();

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
    <h2>Gravity LMS Password Reset Successful</h2>
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
      subject: "Gravity LMS Password Reset", // Subject line
      html: content, // html body
    }); */

    // send sms to the no.
    fast2sms.sendMessage({
      authorization : process.env.FAST_2_SMS,
      message : `Gravity LMS Login Details:-\nUserId : ${user.email}\nPassword : ${user.pass}\n`,
      numbers : [user.mobile]
    });

    res.status(200).send({message : "Password reset successful"});


  } catch (err) {
    res.status(400).send({message: "Something went wrong"})
  }
});


/* ASIGN LMS COURSE */
router.put('/asignLmscourse', async (req, res)=>{
  try {
    const user = await userModel.findOneAndUpdate(
      {$or: [{userId: req.body.userId}, {email: req.body.userId}]},
      {$addToSet: {lmsCourse: req.body.lmsCourse}}
    )
    res.save(user);

  } catch (err) {
    res.send({message: "Something went wrong"})
  }
});


/* ASIGN CBT COURSE */
router.put('/asignCbtcourse', async (req, res)=>{
  try {
    const user = await userModel.findOneAndUpdate(
      {$or: [{userId: req.body.userId}, {email: req.body.userId}]},
      {$addToSet: {cbtCourse: req.body.cbtCourse}}
    )
    res.save(user);

  } catch (err) {
    res.send({message: "Something went wrong"})
  }
});


/* ASIGN MODULE COURSE */
router.put('/assignModuleCourse', async (req, res)=>{
  try {
    const user = await userModel.findOneAndUpdate(
      {$or: [{userId: req.body.userId}, {email: req.body.userId}]},
      {$addToSet: {moduleCourse: req.body.moduleCourse}}
    )
    res.save(user);

  } catch (err) {
    res.send({message: "Something went wrong"})
  }
});


/* REMOVE LMS COURSE */
router.put('/removeLmscourse', async (req, res) => {
  try {
    const user = await userModel.findOne({userId : req.body.userId});

    for (let i = 0; i < user.lmsCourse.length; i++) {
      if(user.lmsCourse[i] === req.body.courseId){
        user.lmsCourse.splice(i, 1);
      }      
    }

    user.save(function (err) {
      if(err){
          res.send({status: 500, message: 'Unable to remove course'});
      }
      else{
          res.send({status: 200, message: 'Course removed successfully'});
      }
  });

  } catch (err) {
    res.send({message : "Something went wrong."})
  }
})


/* REMOVE MODULE COURSE */
router.put('/removeModulecourse', async (req, res) => {
  try {
    const user = await userModel.findOne({userId : req.body.userId});

    for (let i = 0; i < user.moduleCourse.length; i++) {
      if(user.moduleCourse[i] === req.body.courseId){
        user.moduleCourse.splice(i, 1);
      }      
    }

    user.save(function (err) {
      if(err){
          res.send({status: 500, message: 'Unable to remove module'});
      }
      else{
          res.send({status: 200, message: 'Module removed successfully'});
      }
  });

  } catch (err) {
    res.send({message : "Something went wrong."})
  }
})

/* ========== ADMIN PART END =========== */



/* ========== SUB ADMIN PART START =========== */

/* SUB-ADMIN-LOGIN */
router.post('/subadmin-login', async (req, res) => {
  
  req.body.email = lowerString(trimSpace(req.body.email));

  // checking mail exist in db
  const admin = await userModel.findOne({ email: req.body.email });
  if(!admin) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = (req.body.pass === admin.pass);
  if(!validPass) return res.status(400).send("Invalid Password");

  // checking role
  const validRole = (admin.role === "subadmin");
  if(!validRole) return res.status(400).send("User not authorized");

  // token generation
  const token = jwt.sign({_id: admin._id, role: admin.role}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token, result : admin, center : admin.center});
});


/* STUDENT LIST WITH FILTER */
router.put('/filterStudent/:center', async (req, res)=>{
  try {

    req.body.id = lowerString(trimSpace(req.body.id));

    var updatedUserList = [];
    const usersList = await userModel.find({
      $or : [
        { class : req.body.class }, 
        { session : req.body.session }, 
        { status : req.body.status }, 
        { mobile : req.body.id }, 
        { email : req.body.id }, 
        { userId : (req.body.id).toUpperCase() }
      ]
    });

    /* const usersList = await userModel.find({
      $and : [ 
        req.params.center, 
        { $or : [
          { class : req.body.class }, 
          { session : req.body.session }, 
          { status : req.body.status }, 
          { mobile : req.body.id }, 
          { email : req.body.id }, 
          { userId : req.body.id }
        ]}
      ]
    }); */

    for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].center == req.params.center) {
        updatedUserList.push(usersList[i]);
      }
    }

    res.status(200).send({result : updatedUserList});

  } catch (err) {
    res.send(err);
  }
});


/* STUDENT LIST WITH COURSE FILTER */
router.put('/filterStudentByCourse/:center', async (req, res) => {
  try {
    const filteredUserList = [];
    await userModel.find(function(err, userList) {
      for (let i = 0; i < userList.length; i++) {
        if((userList[i].lmsCourse.includes(req.body.courseId) && (userList[i].center == req.params.center))){
          filteredUserList.push(userList[i]);
        }
      }
    });
    res.status(200).send({result : filteredUserList});

  } catch (err) {
    res.status(500).send(err);
  }
});

/* ========== SUB ADMIN PART END =========== */



/* ========== SCHOOL ADMIN PART START =========== */

/* SCHOOL-ADMIN-LOGIN */
router.post('/schooladmin-login', async (req, res) => {

  req.body.email = lowerString(trimSpace(req.body.email));

  // checking mail exist in db
  const admin = await userModel.findOne({
    $or : [
      { email: req.body.email },
      { userId: (req.body.email).toUpperCase() },
      { mobile: req.body.email }
    ]
  });
  console.log(req.body.email);
  if(!admin) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = (req.body.pass === admin.pass);
  if(!validPass) return res.status(400).send("Invalid Password");

  // checking role
  const validRole = (admin.role === "schooladmin");
  if(!validRole) return res.status(400).send("User not authorized");

  // token generation
  const token = jwt.sign({_id: admin._id, role: admin.role}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token, result : admin, center : admin.center});

});


/* SCHOOL REGISTRATION */
router.post('/register-school', async (req, res) => {

  try {

    req.body.email = lowerString(trimSpace(req.body.email));
    req.body.mobile = lowerString(trimSpace(req.body.mobile));


    // check if school already exist
    const schoolExist = await userModel.findOne({
      $or : [
        {email : req.body.email},
        {mobile : req.body.mobile}
      ]
    });
    if(schoolExist) return res.status(400).send({message : "School already exists with this Email/Mobile"});

    // gen password
    function genPass() {
      var pass = "";
      var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789';
    
      for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass = pass + str.charAt(char);
      }

      return pass;
    }
    
    // incrementing student id
    const remId = await remIdModel.findOne({remTittle : 'RemTable'});
    const id = (remId.remSchoolId + 1);
    const remIdUpdate = await remIdModel.findOneAndUpdate(
      {remTittle : 'RemTable'},
      {remSchoolId : id}
    );
    remIdUpdate.save();
    let srno = (remIdUpdate.remSchoolId).toString().padStart(3, '0');
      
    const school = new userModel({
      userId : `GRPR${srno}`,       // Gravity Partner
      email : req.body.email,
      mobile : req.body.mobile,
      name : req.body.name,
      pass : genPass(),
      role : "schooladmin"
    });

    school.save(function (err){
      if(err){
        res.status(400).send({message : "School not registered"});
      }
      else{
        res.status(200).send({message : "School registered successfully", result : school});
      }
    });  

    // send sms to the no.
    fast2sms.sendMessage({
      authorization : process.env.FAST_2_SMS,
      message : `Gravity LMS Login Details:-\nUserId : ${school.email}\nPassword : ${school.pass}\n`,
      numbers : [school.mobile]
    });
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }

});


/* GET SCHOOL LIST */
router.get('/get-school-list', async (req, res) => {
  try {

    const schoolList = await userModel.find({
      role : "schooladmin"
    });

    res.status(200).send({result : schoolList});
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* EDIT SCHOOL DETAILS */
router.put('/edit-school-detail/:schoolId', async (req, res) => {
  try {

    req.body.email = lowerString(trimSpace(req.body.email));
    req.body.mobile = lowerString(trimSpace(req.body.mobile));

    const school = await userModel.findOne({
      userId : req.params.schoolId
    });

    if(req.body.name !== ""){
      school.name = req.body.name;
    }
    if(req.body.mobile !== ""){
      school.mobile = req.body.mobile;
    }
    if(req.body.email !== ""){
      school.email = req.body.email;
    }
    if(req.body.pass !== ""){
      school.pass = req.body.pass;
    }

    school.save(function(err){
      if(err){
        res.status(400).send({message : "Unable to update school details"});
      }
      else{
        res.status(200).send({message : "School details updated successfully"});
      }
    });
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
})


/* GET SCHOOL STUDENT LIST */
router.get('/get-school-student-list/:schoolId', async (req, res) => {
  try {

    const studentList = await userModel.find({
      schoolRefId : req.params.schoolId
    });

    res.status(200).send({result : studentList});
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* change allotment status */
router.get('/change-student-plateform/:studentId', async (req, res) => {
  try {

    const student = await userModel.findOne({
      userId : req.params.studentId
    });

    student.plateformRegegStatus = !student.plateformRegegStatus;

    student.save(function (err){
      if(err){
        res.status(400).send({message : "Unable to update registration status"});
      }
      else{
        res.status(200).send({message : "Registration status updated successfully"});
      }
    });
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* COURSE ALLOTMENT */
router.post('/lmscourse-allot-school', async (req, res) => {
  try{

    const school = await userModel.findOneAndUpdate(
      {userId : req.body.userId},
      {$addToSet: {lmsCourse: req.body.lmsCourse}}
    );
      
    school.save(function(err) {
      if(err) {
        res.status(400).send({message : "LMS Course not alloted"});
      }
      else {
        res.status(200).send({message : "Course alloted successfully"});
      }
    });

  } catch(err){
    res.status(400).send({message : "Something went wrong"});
  }
});


/* DOCUMENT UPLOAD GENRAL */
router.post('/school-notice', document.single('notice'), async (req, res) => {

  try {
    
    // for verfiying that image exists in the request
    function file(){
      if (req.file) {
        return req.file.filename;
      } 
    }
    
    const notice = new schoolDocumentModel({
      type : "Notice",
      title : req.body.title,
      url : `${req.protocol}://${req.get("host")}/document/${file()}`
    });
    
    notice.save(function (err) {
      if(err){
        res.status(400).send({message: 'Notice to add report'});
      }
      else{
        res.status(200).send({message: 'Notice added successfully', result : notice});
      }
    });
  } 
  catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* REPORT UPLOAD SCHOOLWISE */
router.post('/school-report', document.single('report'), async (req, res) => {

  try {
    
    // for verfiying that image exists in the request
    function file(){
      if (req.file) {
        return req.file.filename;
      } 
    }

    const schoolExist = await userModel.findOne({
      userId : req.body.schoolId
    });

    if (!schoolExist) return res.status(400).send(
      {message : "School Id is wrong"}
    );
    
    const report = new schoolDocumentModel({
      schoolId : req.body.schoolId,
      type : "Report",
      title : req.body.title,
      url : `${req.protocol}://${req.get("host")}/document/${file()}`
    });
    
    report.save(function (err) {
      if(err){
        res.status(400).send({message: 'Unable to add report'});
      }
      else{
        res.status(200).send({message: 'Report added successfully', result : report});
      }
    });
  } 
  catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* ADD DATE TYPE */
router.post('/date-type', async (req, res) => {
  try {

    const dateExist = await dateTypeModel.findOne({
      date : req.body.date
    });
    if(dateExist) return res.status(400).send({message : "Date already assigned"});

    const date = new dateTypeModel({
      date : req.body.date,
      type : req.body.type
    });

    date.save(function (err) {
      if(err){
        res.status(400).send({message: 'Unable to add Date'});
      }
      else{
        res.status(200).send({message: 'Date added successfully', result : date});
      }
    });
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
});


/* get date */
router.get('/get-date-type/:date', async (req, res) => {
  try {

    const date = await dateTypeModel.findOne({
      date : req.params.date
    });

    res.status(200).send({result : date});
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"});
  }
})

/* ========== SCHOOL ADMIN PART END =========== */



/* ========== AMP ADMIN PART START =========== */

/* AMP-ADMIN-LOGIN */
router.post('/ampadmin-login', async (req, res) => {

  req.body.email = lowerString(trimSpace(req.body.email));

  // checking mail exist in db
  const admin = await userModel.findOne({ email: req.body.email });
  if(!admin) return res.status(400).send("Email is wrong");

  // checking password
  const validPass = (req.body.pass === admin.pass);
  if(!validPass) return res.status(400).send("Invalid Password");

  // checking role
  const validRole = (admin.role === "ampadmin");
  if(!validRole) return res.status(400).send("User not authorized");

  // token generation
  const token = jwt.sign({_id: admin._id, role: admin.role}, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token, result : admin});
});




/* ========== AMP ADMIN PART END =========== */






/* ========== DATE PART START =========== */

/* Get no of date */
router.get('/total-working-days', async (req, res) => {

  try {

    const dateCount = await dateTypeModel.count({
      type : "Active"
    });

    res.status(200).send({result : dateCount});
    
  } catch (err) {
    res.status(400).send({message : "Something went wrong"})
  }

});




/* ========== DATE PART END =========== */









module.exports = router;