/* eslint-disable @typescript-eslint/no-explicit-any */
export function arraysHaveSameContent(arr1: any[], arr2: any[]): boolean {
  // Check if arrays have the same length
  if (arr1.length !== arr2.length) {
    return false
  }

  // Create copies of the arrays and sort them
  const sortedArr1 = [...arr1].sort()
  const sortedArr2 = [...arr2].sort()

  // Check if the sorted arrays are equal
  return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2)
}
