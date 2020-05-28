
const getObjValueByNestedKey = function(key, obj=self, separator='.') {
  const properties = Array.isArray(key) ? key : key.split(separator)
  return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

function applyFilter(original_array, filters) {
  const new_array = []

  original_array.forEach((element) => {
    let add = true
    
    filters.forEach((filter) => {
      const value = getObjValueByNestedKey(filter.column.key, element)
      if (!checkValueWithFilter(filter, value)) {
        add = false
      }
    })
    
    if (add) {
      new_array.push(element)
    }
  })

  return new_array
}

function checkValueWithFilter (filter, value) {
  if (filter.column.type === 'text') {
    switch (filter.compare_mode.shortName) {
      case 'eq': {
        if (value.toLowerCase() !== filter.value.toLowerCase()) {
          return false
        }
        break
      }
      case 'in': {
        if (!value.toLowerCase().includes(filter.value.toLowerCase())) {
          return false
        }
        break
      }
      case '!in': {
        if (value.toLowerCase().includes(filter.value.toLowerCase())) {
          return false
        }
        break
      }
      case '!eq': {
        if (value.toLowerCase() === filter.value.toLowerCase()) {
          return false
        }
        break
      }
      default: {
        console.error('Idk what this is:', filter.compare_mode.shortName)
      }
    }
  } else if (filter.column.type === 'number') {
    switch (filter.compare_mode.shortName) {
      case 'eq': {
        if (Number(value) !== Number(filter.value)) {
          return false
        }
        break
      }
      case '!eq': {
        if (Number(value) === Number(filter.value)) {
          return false
        }
        break
      }
      case 'gt': {
        if (Number(value) < Number(filter.value)) {
          return false
        }
        break
      }
      case 'lt': {
        if (Number(value) > Number(filter.value)) {
          return false
        }
        break
      }
    }
  } else if (filter.column.type === 'select') {
    switch (filter.compare_mode.shortName) {
      case 'eq': {
        if (value.toLowerCase() !== filter.value.toLowerCase()) {
          return false
        }
        break
      }
      case '!eq': {
        if (value.toLowerCase() === filter.value.toLowerCase()) {
          return false
        }
        break
      }
    }
  } else {
    console.error('idk waht this is:', filter.type)
  }

  return true
}

export { applyFilter }
