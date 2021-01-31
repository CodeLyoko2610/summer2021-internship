import stringToMillisecond from '../helpers/stringToMilliSecond'
import distanceInMeters from '../helpers/distanceInMeters'
import { restaurant, coords } from '../types'

//services [Common] Sort by distance closer than 1.5 km 
const sortByDistance = (userCoords: coords, input: any) => {
  const DISTANCE_LIMIT = 1500 //in meters  

  //Temporary array holds object index and distance to user
  const mapped = input.map((item: restaurant, i: number) => {
    const restaurantCoords: coords = { longitude: item.location[0], latitude: item.location[1] } //longitude first
    return { index: i, distance: distanceInMeters(userCoords, restaurantCoords) }
  })

  //Filter out objects further than distance limit
  const filtered = mapped.filter((item: any) => item.distance <= DISTANCE_LIMIT)

  //Sort by distance, from closest to furthest
  filtered.sort((a: any, b: any) => a.distance - b.distance)

  //Return the original array
  const result = filtered.map((item: any) => {
    return input[item.index]
  })

  return result
}

//services [Common] Sort by online
const sortByOnline = (input: any) => {
  const output = input.filter((item: restaurant) => item.online)

  return output
}

//services [Popular] Sort by popularity, descending
const sortByPopularity = (input: any) => {
  input.sort((a: any, b: any) => b.popularity - a.popularity)

  return input
}


//services [New] Sort by launch_date, descending, no older than 4 months
const sortByLaunchDate = (input: any) => {
  const DURATION = 4 * 30 * 24 * 60 * 60 * 1000 //4 months in milliseconds

  const now = stringToMillisecond(Date())

  const earliestLaunchTime = now - DURATION
  const earliestLaunchDate = new Date(earliestLaunchTime)

  const filtered = input.filter((item: restaurant) => new Date(item.launch_date) >= earliestLaunchDate)

  filtered.sort((a: any, b: any) => (stringToMillisecond(b.launch_date) - stringToMillisecond(a.launch_date)))

  return filtered
}

export default {
  sortByDistance,
  sortByOnline,
  sortByLaunchDate,
  sortByPopularity
}