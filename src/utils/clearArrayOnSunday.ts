function clearArrayOnSunday(dataArray) {
  const clearWeek = () => {
    console.log('Clearing the array for the completed week.')
    dataArray.length = 0 // Clear the array
  }

  const checkSunday = (date: Date) => date.getDay() === 0

  const addItem = (item) => {
    if (
      dataArray.length > 0 &&
      !checkSunday(dataArray[dataArray.length - 1].date) &&
      checkSunday(item.date)
    ) {
      clearWeek()
    }
    dataArray.push(item)
  }

  return { addItem, clearWeek }
}
