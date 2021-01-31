import stringToMillisecond from '../helpers/stringToMilliSecond'
import { restaurant } from '../types'

//TODO: Sort by distance closer than 1.5 km  

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
  sortByOnline,
  sortByLaunchDate,
  sortByPopularity
}