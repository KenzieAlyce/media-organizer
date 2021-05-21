const express = require("express");
const session = require('express-session');

const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const db = require("./models");
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./media/public"));

const sess = {
    secret: 'I drive a transit',
    cookie: {},
    resave: false,
    saveUninitialized: true
  };
  
  if (app.get('env') === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;
  
    // Uncomment the line below if your application is behind a proxy (like on Heroku)
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
  }
  
  app.use(session(sess));
  
  const dotenv = require('dotenv');
  dotenv.config();
  
  // Load Passport
  const passport = require('passport');
  const Auth0Strategy = require('passport-auth0');
  
  // Configure Passport to use Auth0
  const strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  );
  
  passport.use(strategy);
  
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

//Add API routes here
//require("./routes/api-routes.js")(app);
const userInViews = require('./lib/middleware/userInViews');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mediaRouter = require('./routes/media');

// ..
app.use(userInViews());
app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/', mediaRouter);
app.use('/', indexRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

// User Table
//  Columns: ID, Username, Password, email(?)

//Media Table
//  Columns: ID, type, title, author/artist, location



