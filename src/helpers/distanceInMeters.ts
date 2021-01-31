import { getDistance } from 'geolib'

import { coords } from '../types'

const distanceInMeters = (a: coords, b: coords) => {
  return getDistance(a, b)
}

export default distanceInMeters