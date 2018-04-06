const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const News = require('../../models/News');



module.exports = (app) => {

  //Signup


  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    console.log('body:', body);
    const {
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;

    if(!firstName) {
      return res.send({
        success: false,
        message: 'Error: First name can not be blank.'
      });
    }
    if(!lastName) {
      return res.send({
        success: false,
        message: 'Error: Last name can not be blank.'
      });
    }
    if(!email) {
      return res.send({
        success: false,
        message: 'Error: Email can not be blank.'
      });
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password can not be blank.'
      });
    }

    console.log('Here');

    email = email.toLowerCase();

    //
    //Verify email doesn't exist
    //save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save new user
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) =>{
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        }
        return res.send({
          success: true,
          message: 'Success: Signed up.'
        });
      });
    });

  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;


    if(!email) {
      return res.send({
        success: false,
        message: 'Error: Email can not be blank.'
      });
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error: Password can not be blank.'
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {

        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if(!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      //Else correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }

        return res.send({
          success: true,
          token: doc._id
        });
      });
    });
  });

    app.get('/api/account/verify', (req, res, next) => {
      //Get token
      const { query } = req;
      const { token } = query;
      //?token=test

      //Verify token is unique and not deleted

      UserSession.find({
        _id:token,
        isDeleted: false
      }, (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        if(sessions.length!=1) {
          return res.send({
            success: false,
            message: 'Error: Invalid'
          });
        } else {
          return res.send({
            success: true,
            message: 'Success'
          });
        }
      });
    });

    app.get('/api/account/logout', (req, res, next) => {
      //Get token
      const { query } = req;
      const { token } = query;
      //?token=test

      //Verify token is unique and not deleted

      UserSession.findOneAndUpdate({
        _id:token,
        isDeleted: false
      }, {
        $set: {
          isDeleted:true
        }
      }, null, (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

      return res.send({
          success: true,
          message: 'Success'
        });
      });
    });

    app.post('/api/savenews', (req, res, next) => {
      const { body } = req;
      console.log('body:', body);
      const {
        url,
        title,
        description,
        author,
        urlToImage
      } = body;


      console.log('Here');

      //
      //save
        const newNews = new News();

        newNews.url = url;
        newNews.title = title;
        newNews.description = description;
        newNews.author = author;
        newNews.urlToImage = urlToImage;
        newNews.save((err, user) =>{
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error.'
            });
          }
          return res.send({
            success: true,
            message: 'Success: News saved.'
          });
        });
      });


      app.get('/api/getnews', function(req, res) {
      //looks at our News Schema
      News.find(function(err, news) {
        if (err){
          res.send(err);
          console.log('Error chutya');
        }
        //responds with a json object of our database comments.
        res.json(news)
      });
    })

};
