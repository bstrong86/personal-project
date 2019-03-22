require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    sessions = require('express-session'),
    massive = require('massive'),
    ctrl = require('./controllers/controller'),
    aws = require('aws-sdk'),
    
    
    
    const app = express()
    const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY} = process.env
      
app.use(express.static(`${_dirname}/../build`))

app.use(bodyParser.json())
  massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected to db')
})
app.use(sessions({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1000000000}
}))


app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    return res.send(returnData)
  });
});

app.get('/auth/current', ctrl.getUser)

app.post('/auth/login', ctrl.login)

app.post('/auth/logout', ctrl.logout)

app.post('/auth/register', ctrl.register)

app.get('/auth/workouts/:id', ctrl.getWorkouts)

app.post('/auth/workout/:id', ctrl.createWorkout)

app.post('/auth/exercise/:id', ctrl.addExercise)

app.get('/auth/exercises/:id', ctrl.getExercises)

app.put('/auth/exercise/:id', ctrl.editExercise)

app.get('/auth/workouts', ctrl.getRecentWorkouts)

app.delete('/auth/exercise/:id', ctrl.deleteExercise)

app.delete(`/auth/workout/:id`, ctrl.deleteWorkout)

app.get('/auth/profile_pic/:id', ctrl.getMarvelPic)


app.listen(SERVER_PORT, () => console.log(`Working on port ${SERVER_PORT}`))
