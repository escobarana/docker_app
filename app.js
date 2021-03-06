var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');                 //Import the mongoose module
var cors = require('cors');

var routesRouter = require('./routes/allRoutes');
var compression = require('compression');           // to compress the routes at the end - production
var helmet = require('helmet');                     // to protect against well known vulnerabilities - npm install helmet

var app = express();                                // object to run the server
app.disable('etag');
/// view engine setup ///
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());                               //Compress all routes -- for the end - production
app.use(helmet({
  referrerPolicy: { policy: "no-referrer" },
  contentSecurityPolicy: false,
}));

/// Set up default mongoose connection ///
var mongoDB = 'mongodb://156.35.163.172:27017/recommendersystemdb'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .then( () => { console.log('Successfully connected to the database.') }) 
        .catch(err => console.log(err));

var db = mongoose.connection;                          //Get the default connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(cors());

// HEADERS AND CORS CONFIG
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

// app.use(cors);

/// Routes ///
app.use('/', express.static('dist/client', { redirect: false }));
app.use('/api', routesRouter); // Add users routes to middleware chain.

app.get('*', function(req, res, next){
  res.sendFile(path.resolve('dist/client/index.html')); // Friendly and optimized URLs -- avoiding errors when refreshing the page
});



/// GETTING APPS ///

var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;

var playstore   = require('./js/apiGoogle');            // API Google Play Store
var appStore    = require('./js/apiApple');             // API Apple Store
var r           = require('./js/apiR');                 // API R

const { Console } = require('console');

var port_plumber = '7190';                              // R port

var keywords = ['physical activity', 'sedentary behaviour', 'colorectal neoplasms', 'health exercise']; // get them from admin input

var listGoogle = [];
var listApple = [];
var allApps = [];

app.route('/api/apps/google/raw').get((req, res) => {
  req.setTimeout(600000); 
  var appsGoogle = playstore.getApps();
  console.log("-----Buscando las apps - GOOGLE");
  appsGoogle.then(function(result_apps_google) {
      console.log("-----Hechas las apps - GOOGLE");
      listGoogle = result_apps_google;
      res.status(200).send(listGoogle);
  }, function(err) {
      console.log(err);
  })
});

app.route('/api/apps/google/descriptionApps').get((req, res) => {
  req.setTimeout(600000);
  console.log("-----Buscando las apps sin descripciones - GOOGLE");
  var appsGoogle = playstore.getDescriptions(listGoogle);
  appsGoogle.then(function(result_apps_google) {
      console.log("-----Hechas las apps sin descripciones - GOOGLE");
      listGoogle = result_apps_google;
      listGoogle = listGoogle.filter((arr, index, self) => // Delete duplicates
      index === self.findIndex((t) => (t.appId === arr.appId)));
      console.log("TAMA??O GOOGLE: " + listGoogle.length);
      res.status(200).send(listGoogle);
  }, function(err) {
      console.log(err);
  })
});

app.route('/api/apps/google/keywords').get((req, res) => { 
  req.setTimeout(600000);
  console.log("-----Buscando las apps con keywords - GOOGLE");
  const promises = []
  // let keyword = keywords;
  // keywords.push(keyword);
  //console.log(keywords)
  keywords.forEach(word => 
      promises.push(playstore.getFromKeyword(word)) 
  )
  Promise.all(promises)
  .then(response => {
      console.log("-----Hechas las apps con keywords - GOOGLE");
      var applications = [];
      for(var i=0; i < response.length; i++){ 
          for(var j=0; j < response[i].length; j++){ 
              applications.push(response[i][j]);
          }
      }
      applications.forEach(p => 
          listGoogle.push(p) 
      )
      res.status(200).send(listGoogle);
  }, function(err) {
      console.log(err);
  }).catch(error => console.log(`Error in executing ${error}`))
});

app.route('/api/apps/apple/raw').get((req, res) => { 
  req.setTimeout(600000);
  var appsApple = appStore.getApps();
  console.log(appsApple)
  console.log("-----Buscando las apps - APPLE");
  appsApple.then(function(result_apps) {
      console.log("-----Hechas las apps - APPLE");
      listApple = result_apps;
      res.status(200).send(listApple);
  }, function(err) {
      console.log(err);
  }, function(err) {
    console.log(err);
  }).catch(error => console.log(`Error in executing ${error}`))
});

app.route('/api/apps/apple/descriptionApps').get((req, res) => { 
  req.setTimeout(600000);
  console.log("-----Buscando las apps sin descripciones - APPLE");
  var appsApple = appStore.getDescriptions(listApple);
  appsApple.then(function(result_apps) {
      console.log("-----Hechas las apps sin descripciones - APPLE");
      listApple = result_apps;
      listApple = listApple.filter((arr, index, self) => // Delete duplicates
          index === self.findIndex((t) => (t.appId === arr.appId)));
      console.log("TAMA??O APPLE: " + listApple.length);

      res.status(200).send(listApple);
  }, function(err) {
      console.log(err);
  }).catch(error => console.log(`Error in executing ${error}`))
});

app.route('/api/apps/bothStores').get((req, res) => { 
  req.setTimeout(600000);
  console.log("----- Concatenando listas de apps ... ");
  allApps = listApple.concat(listGoogle)

  console.log("TAMA??O TOTAL APPS: " + allApps.length);

  res.status(200).send(allApps)

});

app.route('/api/apps/apple/keywords').get((req, res) => {
  req.setTimeout(600000);
  console.log("-----Buscando las apps con keywords - APPLE");
  const promises = []
  // let keyword = keywords;
  // keywords.push(keyword);
  keywords.forEach(word => 
      promises.push(appStore.getFromKeyword(word)) 
  )
  Promise.all(promises)
  .then(response => {
      console.log("-----Hechas las apps con keywords - APPLE");
      var applications = [];
      for(var i=0; i < response.length; i++){ 
          for(var j=0; j < response[i].length; j++){ 
              applications.push(response[i][j]);
          }
      }
      applications.forEach(p => 
          listApple.push(p) 
      )
      listApple = listApple.filter((arr, index, self) => // Delete duplicates
          index === self.findIndex((t) => (t.appId === arr.appId)));
          res.status(200).send(listApple);
  }).catch(error => console.log(`Error in executing ${error}`))
});

app.route('/api/apps/listApps').get((req, res) => {
  req.setTimeout(600000);
  console.log("Sending both stores to R");
  var url = 'http://156.35.163.172:' + port_plumber + '/dataMining?url=' + 'http:%2F%2F156.35.163.172%2Fapi%2FbothStores' + '&valueK=' + req.query.valueK;
  var p = r.getAppsFromR(url);
    p.then(values => { 
        console.log(values); 
        res.status(200).send(values);
    }).catch(function () {
        console.log("Promise Rejected");
    });
});

/*app.route('/api/apps/listApps').get((req, res) => {
  console.log("Sending both stores to R");
  var url = 'http://localhost:' + port_plumber + '/dataMining?url=' + 'http:%2F%2Flocalhost:3000%2Fapi%2Fapps%2FbothStores' + '&valueK=' + req.query.valueK;
  var p = r.getAppsFromR(url);
  p.then(values => { 
      console.log(values); 
      res.send(values);
  });
  p.catch(function () {
      console.log("Promise Rejected");
  });
});

app.route('/api/apps/listApps/apple').get((req, res) => {
  req.setTimeout(600000);
  console.log("Sending both stores to R");
  var url = 'http://156.35.163.172:' + port_plumber + '/dataMining?url=' + 'http:%2F%2F156.35.163.172%2Fapi%2Fapps%2Fapple%2Fkeywords' + '&valueK=' + req.query.valueK;
  var p = r.getAppsFromR(url);
    p.then(values => { 
        console.log(values); 
        res.send(values);
    }).catch(function () {
        console.log("Promise Rejected");
    });
});

app.route('/api/apps/listApps/google').get((req, res) => {
  req.setTimeout(600000);
  console.log("Sending both stores to R");
  var url = 'http://156.35.163.172:' + port_plumber + '/dataMining?url=' + 'http:%2F%2F156.35.163.172%2Fapi%2Fapps%2Fgoogle%2Fraw' + '&valueK=' + req.query.valueK;
  var p = r.getAppsFromR(url);
    p.then(values => { 
        console.log(values); 
        res.send(values);
    }).catch(function () {
        console.log("Promise Rejected");
    });
});*/

/// END GETTING APPS ///


/// ERROR HANDLERS ///

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;