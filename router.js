const express = require('express')
const router = express.Router();
const { Hero } = require('./db')

router.get('/leader', async (req, res, next) => {
    try {
        res.send(await Hero.findAll({
            where: {
                leaderId: null
            },
            include: {
                model: Hero,
                as: 'ledby'
            }
        }))
    } catch (error) {
        next(error)
    }
})

router.get('/leader/:id/ledby', async(req, res, next) => {
    try {
        res.send(await Hero.findAll({
          where: {
            id: req.params.id
          },
          include: {
              model: Hero,
              as: 'ledby'
          }
        }
        ))
    } catch (error) {
        next(error)
    }
})

router.get('/avengers', async (req, res, next) => {
    try {
      res.send(await Hero.findAvenger())
    }
    catch (error){
      next(error)
    } 
  })
  
  router.get('/xmen', async (req, res, next) => {
    try {
      res.send(await Hero.findXmen())
    } catch (error) {
      next(error)
    }
  })
  
  router.get('/justiceLeague', async(req, res, next) => {
    try {
      res.send(await Hero.findJustice())
    } catch (error) {
      next(error)
    }
  })


module.exports = router;