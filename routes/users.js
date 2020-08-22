const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

//@route    POST api/users
//@desc     Register user
//@access   Public

//REGISTER USER
router.post('/', 
    [ 
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Please include a valid email').isEmail(),  
        body('password', 'Please enter a valid password').isLength({ min: 5 }) 
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {

            let user = await User.findOne({ email }) //email: email

            if (user){
                return res.status(400).json({ msg: 'User already exists'})
            }

            //Create new user
            user = new User({
                name,  
                email,
                password
            })

            //Hash the password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            // Data to be sent in jwt token
            const payload = {
                user:{
                    id: user.id
                }
            }
            
            //Create and assign token
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if(err){
                    throw err
                }
                res.json({ token })
            })
            
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)

module.exports = router