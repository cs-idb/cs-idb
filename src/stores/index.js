import { derived, get } from 'svelte/store'
import { createLocalStorageStore } from './LocalForageStore'
import { compareModes } from './FilterStore'

const raw_checksums = createLocalStorageStore('checksums', [])
const raw_collections = createLocalStorageStore('collections', [])
const raw_rarities = createLocalStorageStore('rarities', [])
const raw_skins = createLocalStorageStore('skins', [])
const raw_paintkits = createLocalStorageStore('paintkits', [])
const raw_weapons = createLocalStorageStore('weapons', [])

const collections = derived(raw_collections, ($raw_collections) => {
  if (!$raw_collections) return []

  const new_collections = JSON.parse(JSON.stringify($raw_collections))
  new_collections.map((c) => c.released = new Date(c.released))
  return new_collections
})

const rarities = derived(raw_rarities, ($raw_rarities) => {
  if (!$raw_rarities) return []
  return $raw_rarities
})

const weapons = derived(raw_weapons, ($raw_weapons) => {
  if (!$raw_weapons) return []
  return $raw_weapons
})

const skins = derived(raw_skins, ($raw_skins) => {
  if (!$raw_skins) return []
  const new_skins = JSON.parse(JSON.stringify($raw_skins))

  const _collections = get(raw_collections)
  const _rarities = get(raw_rarities)
  const _weapons = get(raw_weapons)
  const _paintkits = get(raw_paintkits)

  new_skins.map((s) => {
    const collection = _collections.find((c) => c.id === s.collectionId)
    delete s.collectionId
    s.collection = collection

    const rarity = _rarities.find((r) => r.id === s.rarityId)
    delete s.rarityId
    s.rarity = rarity

    const weapon = _weapons.find((w) => w.id === s.weaponId)
    delete s.weaponId
    s.weapon = weapon

    const paintkit = _paintkits.find((p) => p.id === s.paintkitId)
    delete s.paintkitId
    s.paintkit = paintkit
  })
  return new_skins
})

const paintkits = derived(raw_paintkits, ($raw_paintkits) => {
  return $raw_paintkits
})

export {
  raw_checksums, raw_collections, raw_rarities, raw_skins, raw_weapons, raw_paintkits,
  collections, rarities, weapons, skins, paintkits,
  compareModes
}
