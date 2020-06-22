function getObjValueByNestedKey(key, obj = self, separator = '.') {
  const properties = Array.isArray(key) ? key : key.split(separator)
  return properties.reduce((prev, curr) => prev && prev[curr], obj)
}

function filterSkinList(skins, filters) {
  const filteredSkins = []

  skins.forEach(skin => {
    const isValid = Object.entries(filters).every(filter => checkFilterOnSkin(skin, filter))
    if (isValid) filteredSkins.push(skin)
  })

  return filteredSkins
}

function checkFilterOnSkin(skin, filter) {
  const [key, value] = filter
  if (!value) return true

  switch (key) {
    case 'weaponId': {
      return skin.weapon.id === value
    }
    case 'paintkitTag': {
      return skin.paintkit.tag === value
    }
    case 'collectionId': {
      return skin.collection.id === value
    }
    case 'rarityId': {
      return value.includes(skin.rarity.id)
    }
    case 'minFloat': {
      return skin.paintkit.minFloat >= value
    }
    case 'maxFloat': {
      return skin.paintkit.maxFloat <= value
    }
    default: {
      console.error('I dont know how to handle this filter:', key)
    }
  }

  return true
}

function applyFilter(original_array, filters) {
  const new_array = []

  original_array.forEach(element => {
    let add = true

    filters.forEach(filter => {
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

function checkValueWithFilter(filter, value) {
  if (!value) return false
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

export { applyFilter, getObjValueByNestedKey, filterSkinList }
