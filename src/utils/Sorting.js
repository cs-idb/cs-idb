function dynamicSort(key, type, order) {
  let keys = key.split(".")
  let depth = keys.length;

  return function (a, b) {
    let i = 0;
    while (i < depth) {
      a = a[keys[i]];
      b = b[keys[i]];
      if (a === undefined || b === undefined) 
        return -1
      i++;
    }
    let result;

    switch(type) {
      case "str": {
        result = a < b ? -1 : a > b ? 1 : 0;
        break;
      }
      case "num": {
        result = Number(a) < Number(b) ? -1 : Number(a) > Number(b) ? 1 : 0;
        break;
      }
      case "dte": {
        result = new Date(a) < new Date(b) ? -1 : new Date(a) > new Date(b) ? 1 : 0;
        break;
      }
      case "bol": {
        result = b - a;
        break;
      }
      default: {
        throw new Error("I don't know what this type is:", type);
      }
    }

    return result * order;
  }
}

export class SortableArray extends Array {
  sortBy(key, type, sortAsc) {
    let order = sortAsc ? 1 : -1;
    return this.sort(dynamicSort(key, type, order))
  }
}
