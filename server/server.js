const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const overviewChartsRouter = require('./routes/overviewcharts.router');
const districtSchoolRouter = require('./routes/districtschool.router');
const demographicsRouter = require('./routes/demographics.router');
const studentReportRouter = require('./routes/studentreport.router');
const verifyUserRouter = require('./routes/verifyUser.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/overviewcharts', overviewChartsRouter);
app.use('/api/districtschool', districtSchoolRouter);
app.use('/api/demographics', demographicsRouter);
app.use('/api/studentreport', studentReportRouter);
app.use('/api/verifyUser', verifyUserRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
