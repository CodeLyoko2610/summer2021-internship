import { Request, Response, NextFunction } from 'express'

import * as data from '../../restaurants.json'
import * as services from '../services/discovery'


export const getAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lon, lat } = req.query

    //TODO: [Optimize] Limit result array to only 10 items 
    //TODO: [Optimize] Using express validator
    if (!lon || !lat) throw Error("Missing parameters 'lon' or 'lat'.")
    const lonVal = parseFloat(lon as string)
    const latVal = parseFloat(lat as string)
    if (isNaN(lonVal) || isNaN(latVal)) throw Error("Coordinates must be numbers only.")

    //TODO: Sort by distance closer than 1.5 km  





    //res.json(sortByLaunchDate(data.restaurants))
    // res.json(sortByPopularity(sortByOnline(data.restaurants)))
    //res.json({ "lon": lonVal, "lat": latVal })

  } catch (error) {
    console.error("This is the error: ", error)
    res.json({ "Error": "Something went wrong!" })
  }
}