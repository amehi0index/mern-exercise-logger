const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth') //verify token
const { body, validationResult } = require('express-validator');

const User = require('../models/User')
const Exercise = require('../models/Exercise')

//@route    GET api/exercise
//@desc     Get user's exercise log
//@access   Private
router.get('/', auth, async (req, res) => {
    try {
        const exercises = await Exercise.find({ user: req.user.id }).sort({ date: -1 }) //-1 is most recent exercise
        res.json(exercises)
    } catch (err) {
        console.err(err.message)
        res.status(500).send('Server Error')
    }
})

//@route    POST api/exercise
//@desc     Add new exercise to log
//@access   Private
router.post('/',  auth, async (req, res) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array() })
        }

        const { description, duration, date } = req.body

        try {
            const newExercise = new Exercise ({
                description,
                duration,
                date,
                user: req.user.id  //logged-in user
            })

            const exercise = await newExercise.save()
            res.json(exercise)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    }
)

// @route     PUT api/exercises/:id
// @desc      Update exercise entry
// @access    Private
router.put('/:id', auth, async (req, res) => {

   // const { description, duration, date } = req.body
  
    // Build exercise object
    const exerciseFields = {
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
    } 
  
    try {
      let exercise = await Exercise.findById(req.params.id)
      if (!exercise) return res.status(404).json({msg: 'Exercise not found'})
  
      exercise = await Exercise.findByIdAndUpdate(
        req.params.id,
        {$set: exerciseFields},
        {new: true},
      );
  
      res.json(exercise)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  });
  
//@route    DELETE api/exercises/:id
//@desc     Delete an exercise
//@access   Private
router.delete('/:id', auth, async(req, res) => {
    try {
        let exercise = await Exercise.findById(req.params.id)
    
        if(!exercise) return res.status(404).json({ msg: 'Exercise Not Found' })
    
        //Ensure user owns exercise log
        if(exercise.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not Authorized' }) 
        }
       
        await Exercise.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Exercise Successfully Deleted'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router