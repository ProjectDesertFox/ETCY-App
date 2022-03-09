const {ItineraryTransportation} = require('../models')
class itineraryTransportationController {
  static async getOne (req, res, next) {
    try {
      const itineraryTransportation = await ItineraryTransportation.findOne({where: {id: +req.params.id}})
      if (itineraryTransportation === null) {
        next({ status: 404, message: `Itinerary Transportation with id ${req.params.id} not found` })
      } else {
          return res.status(200).json(itineraryTransportation)
      }
    } catch (err) {
      next(err)
    }
  }
  static async updateItineraryTransportation (req, res, next) {
    try {
      const {name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId, status} = req.body
      const itineraryTransportation = await itineraryTransportation.update({name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId, status}, {where: {id: +req.params.id}, returning: true, plain:true})

      if(itineraryTransportation[0] === 0 ){
        next({status: 404, message: `Itinerary Transportation with id ${req.params.id} not found`})
      }else{
        return res.status(200).json(itineraryTransportation)
      }
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
  static async deleteItineraryTransportation(req, res, next){
    try {
      const itineraryTransportation = await ItineraryTransportation.destroy({where: {id: req.params.id}})
      if(itineraryTransportation === 0){
        next({ status: 404, message: `Itinerary Transportation with id ${req.params.id} not found` })
      }else{
        return res.status(200).json(`Itinerary Transportation with id ${req.params.id} deleted`)
      }
    } catch (err) {
      next(err)
      
    }
  }
  static async addItineraryTransportation (req, res, next) {
    try {
      const {name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId} = req.body
      const status = 'Active'
      let itineraryTransportation = await ItineraryTransportation.create({name, description, estimatedPrice, rating, itineraryOrder, date, itineraryId, status})
      res.status(201).json(itineraryTransportation)
    } catch (err) {
      if(err.name === 'SequelizeValidationError') {
        let validation = err.errors.map(el => el.message)
        next({ status: 400, message: validation })
      }else{
        next(err)
      }
    }
  }
}

module.exports = itineraryTransportationController