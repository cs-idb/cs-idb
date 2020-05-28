function dynamicSort(key, sortAsc) {
  const sortOrder = sortAsc ? 1 : -1

  return function (a, b) {
    const result = (a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0))
    return result * sortOrder
  }
}

export class SortableArray extends Array {
  sortBy(key, sortAsc) {
    return this.sort(dynamicSort(key, sortAsc))
  }
}
