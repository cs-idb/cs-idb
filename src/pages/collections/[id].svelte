<script>
  import { goto, url } from '@sveltech/routify'
  import { Button, Badge, Table } from '../../components/shared/'
  import { collections, skins } from '../../stores'
  import { onMount } from 'svelte'
  export let id

  let collection
  let collection_skins = []

  $: {
    loadCollection(id)
  }

  const tableHeaders = ['weapon', 'name', 'collection', 'rarity', 'Min float', 'Max float']
  $: tableRows = collection_skins.map(function (skin) {
    return {
      __id: skin.id,
      weapon: skin.weapon.tag,
      name: skin.paintkit.tag,
      collection: collection.tag,
      rarity: skin.rarity.tag,
      'Min float': skin.paintkit.minFloat,
      'Max float': skin.paintkit.maxFloat,
    }
  })
  const activeSort = {
    header: 'name',
    sortAsc: true,
  }

  onMount(() => {
    loadCollection()
  })

  const loadCollection = () => {
    collection = $collections.find(c => Number(c.id) === Number(id))

    if (!collection) {
      return $goto($url('/collections'))
    }

    collection_skins = $skins.filter(s => Number(s.collection.id) === Number(id))
  }

  const gotoSkin = e => {
    const skin_id = e.detail
    $goto($url(`/skins/${skin_id}`))
  }
</script>

<style>
  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }

  .collection-container {
    margin: 30px 0;
  }
</style>

<div class="collection-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/collections')}>&lt;</Button>
    <span>{collection ? collection.tag : 'Loading collection...'}</span>
  </h3>

  {#if collection}
    <div class="badges">
      <Badge>Released: {collection.released.toLocaleDateString()}</Badge>
      <Badge>
        Case:
        <b>{collection.case ? 'Yes' : 'No'}</b>
      </Badge>
      <Badge color="orange">
        StatTrak™:
        <b>{collection.stattrak ? 'Yes' : 'No'}</b>
      </Badge>
      <Badge color="yellow accent-2">
        Souvenir:
        <b>{collection.souvenir ? 'Yes' : 'No'}</b>
      </Badge>
    </div>

    <br />
    <h4>Skins</h4>
    <Table {tableHeaders} {tableRows} {activeSort} on:clickItem={gotoSkin} />
  {/if}
</div>
