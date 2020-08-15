const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User, Collectora} = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  })

router.post('/register', (req, res) => {
  console.log(req.body)
  const { errors, isValid } = validateRegisterInput(req.body);
  // console.log(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          return res.status(400).json({email: "A user has already registered with this address"})
        } else {
          const geoObj = {type: "Point", coordinates: req.body.location.coordinates}
          let newUser;
          if (req.body.class.toLowerCase() === "donor") {
            
            newUser = new User({
              email: req.body.email,
              password: req.body.password,
              class: req.body.class,
              location: geoObj
           
            })
          } else if (req.body.class.toLowerCase() === "collector") {
            const {address, phone, hours, orgName} = req.body
            const newCollector = {address,phone, hours, orgName};
              for (const [key, value] of Object.entries(newCollector)) {
                 if (value === null)
                    return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` },
                });
              }
              newUser = new Collectora({
                email: req.body.email,
                password: req.body.password,
                class: req.body.class,
                location: geoObj,
                address: req.body.address,
                phone: req.body.phone,
                hours: req.body.hours,
                orgName: req.body.orgName,
                description: req.body.description
           
              })
              
          }
          
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  const payload = {
                    _id: user.id,
                    email: user.email
                  };
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                      res.json({
                        user,
                        success: true,
                        token: "Bearer " + token
                      });
                    }
                  );
                })
                .catch(err => console.log(err));
            })
          })
        }
      })
  })


  router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // console.log(errors);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json({email: 'This user does not exist'});
        }
  
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: user.id, name: user.name};

            jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    user,
                    success: true,
                    token: 'Bearer ' + token
                });
              });
            } else {
                return res.status(400).json({password: 'Incorrect password'});
            }
        })
      })
  })

router.put("/:id/drive", (req, res) => {
  User.findById(req.params.id, (err,collector) => {
    collector.drive = req.body.drive;
    collector.save()
    .then(collector => res.json(collector))
    .catch(err => res.status(400).json(err));
  });
}) 

router.get("/index", (req,res) => {
  const {coordinates} = req.body;
  const long = coordinates.long;
  const latt = coordinates.latt;

  User.find({class: "Collector", location: {
    $near: {
      $maxDistance:30000,
      $geometry: {
        type: "Point",
        coordinates: [long, latt]
      }
    }
  }}).find((error, results) => {
    if (error) res.status(404).json(error);
    res.status(200).json(results)
    console.log(results)
  })

  // .then(collectors => {
  //     if (collectors) {
  //       return res.json(collectors)
  //     } else{
  //       return res.status(404).json({ notfound: "No Collectors Found" })
  //     }    
  //   })
})

  router.put("/:id", (req, res) => {
    let user = User.findById(req.params.id);
    if (user) {
      user.email = req.body.email;
      user.address = req.body.address;

      user.save()
      .then(() => res.json("Profile Updated"))
      .catch(err =>  res.status(400).json(err))
    } else {
      return res.status(404)
    }
  })

module.exports = router;