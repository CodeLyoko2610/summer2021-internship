import { Request, Response, NextFunction } from 'express'

import * as data from '../../restaurants.json'
import DiscoveryServices from '../services/discovery'
import { coords } from '../types'


export const getAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lon, lat } = req.query

    //TODO: [Optimize] Using express validator
    if (!lon || !lat) throw Error("Missing parameters 'lon' or 'lat'.")
    const lonVal = parseFloat(lon as string)
    const latVal = parseFloat(lat as string)
    if (isNaN(lonVal) || isNaN(latVal)) throw Error("Coordinates must be numbers only.")

    const userCoords: coords = { longitude: lonVal, latitude: latVal }

    //Sort by distance first, then online status
    let arr1 = DiscoveryServices.sortByDistance(userCoords, data.restaurants)
    let arr2 = DiscoveryServices.sortByOnline(arr1)

    //Only allow 10 items
    if (arr2.length > 10) arr2 = arr2.slice(0, 9)

    //Add offline items if capability allow
    for (let i = 0; i < arr1.length && arr2.length < 10; i++) {
      if (!arr2.includes(arr1[i])) arr2.push(arr1[i])
    }

    //Build response object
    const rawSections = [
      { "title": "Popular Restaurants", "restaurants": DiscoveryServices.sortByPopularity(arr2) },
      { "title": "New Restaurants", "restaurants": DiscoveryServices.sortByLaunchDate(arr2) },
      { "title": "Nearby Restaurants", "restaurants": arr2 }
    ]

    //Filter sections with empty restaurants
    const response = {
      "sections": rawSections.filter(sec => sec.restaurants.length > 0)
    }

    res.json(response)
  } catch (error) {
    console.error("This is the error: ", error)
    res.json({ "Error": "Something went wrong!" })
  }
}