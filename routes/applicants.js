const express = require('express')
const applicant = require('../models/applicant')
const router = express.Router()
const Applicant = require('../models/applicant')

//get all
router.get('/', async (req,res) => {
    try{
    const applicants = await Applicant.find()
    res.json(applicants)
   } catch (err){
       res.status(500).json({message: err.message})
   } 
})


//get one
router.get('/:id', getApplicant, (req, res) => {
    res.send(res.applicant)
})

//create one
router.post('/', async (req,res) => {
    const applicant = new Applicant({
        Name: req.body.Name,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
        positionApplied: req.body.positionApplied,
        Source: req.body.Source
    })
    try{
        const newApplicant = await applicant.save()
        res.status(201).json(newApplicant)
    } catch(err){
        res.status(400).json({ message: err.message })
    }
})

// //edit one
router.patch('/:id', getApplicant, async (req,res) => {
    if(req.body.Name != null){
        res.applicant.Name = req.body.Name
    }
    if(req.body.Mobile != null){
        res.applicant.Mobile = req.body.Mobile
    }
    try{
        const updatedApplicant = await res.applicant.save()
        res.json(updatedApplicant)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})


//  //delete one
router.delete('/:id', getApplicant, async (req, res) => {
    try{
        await res.applicant.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch(err){
        res.status(500).json({ message: err.message})
    }
})


//middleware
async function getApplicant(req, res, next){
    let applicant
    try{
        applicant = await Applicant.findById(req.params.id)
        if(applicant == null){
            return res.status(404).json({ message: 'Cannot find applicant'})
        }
    } catch (err){
        return res.status(500).json({ message: err.message})
    }
  res.applicant = applicant
  next()
}


module.exports = router