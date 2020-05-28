import { readable } from 'svelte/store'

const compare_modes = [
  {
    'shortName': 'eq',
    'longName': 'Equals',
    'types': ['text', 'number', 'select'],
  },
  {
    'shortName': '!eq',
    'longName': 'Does not equal',
    'types': ['text', 'number', 'select'],
  },
  {
    'shortName': 'in',
    'longName': 'Includes',
    'types': ['text'],
  },
  {
    'shortName': '!in',
    'longName': 'Does not include',
    'types': ['text'],
  },
  {
    'shortName': 'gt',
    'longName': 'Greater than',
    'types': ['number'],
  },
  {
    'shortName': 'lt',
    'longName': 'Less than',
    'types': ['number'],
  },
]

const compareModes = readable(compare_modes)

export { compareModes }
