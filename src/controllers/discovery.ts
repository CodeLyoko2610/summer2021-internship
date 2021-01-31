import { Request, Response, NextFunction } from 'express'

import * as data from '../../restaurants.json'
import DiscoveryServices from '../services/discovery'


export const getAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lon, lat } = req.query

    //TODO: [Optimize] Limit result array to only 10 items 
    //TODO: [Optimize] Using express validator
    if (!lon || !lat) throw Error("Missing parameters 'lon' or 'lat'.")
    const lonVal = parseFloat(lon as string)
    const latVal = parseFloat(lat as string)
    if (isNaN(lonVal) || isNaN(latVal)) throw Error("Coordinates must be numbers only.")



    //Build response object
    const rawSections = [
      { "title": "Popular Restaurants", "restaurants": DiscoveryServices.sortByPopularity(data.restaurants) },
      { "title": "New Restaurants", "restaurants": DiscoveryServices.sortByLaunchDate(data.restaurants) },
      { "title": "Nearby Restaurants", "restaurants": [] }
    ]

    const response = {
      "sections": rawSections.filter(sec => sec.restaurants.length > 0)
    }

    //res.json(sortByLaunchDate(data.restaurants))
    // res.json(sortByPopularity(sortByOnline(data.restaurants)))
    //res.json({ "lon": lonVal, "lat": latVal })
    res.json(response)
  } catch (error) {
    console.error("This is the error: ", error)
    res.json({ "Error": "Something went wrong!" })
  }
}