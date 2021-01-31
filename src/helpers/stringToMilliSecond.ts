const stringToMillisecond = (inputString: string) => {
  return new Date(inputString).setHours(0, 0, 0, 0)
}

export default stringToMillisecond