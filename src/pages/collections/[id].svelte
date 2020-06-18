<script>
  import { goto, url } from '@sveltech/routify'
  import { Badge, Table, PageHeader } from '../../components/shared/'
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
      __image_path: `https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/${skin.image.fullname_filehash_png}`,
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

    collection_skins = $skins.filter(s => Number((s.collection||{}).id) === Number(id))
  }

  const gotoSkin = e => {
    const skin_id = e.detail
    $goto($url(`/skins/${skin_id}`))
  }
</script>

<style>
  .collection-container {
    margin: 30px 0;
  }
</style>

<div class="collection-container">
  <PageHeader>
    {collection ? collection.tag : 'Loading collection...'}
  </PageHeader>

  {#if collection}
    <div class="badges">
      <Badge classes="blue lighten-2">Released: {collection.released.toLocaleDateString()}</Badge>
      <Badge classes="blue">
        Case:
        <b>{collection.case ? 'Yes' : 'No'}</b>
      </Badge>
      <Badge classes="orange">
        StatTrak™:
        <b>{collection.stattrak ? 'Yes' : 'No'}</b>
      </Badge>
      <Badge classes="yellow accent-2">
        Souvenir:
        <b>{collection.souvenir ? 'Yes' : 'No'}</b>
      </Badge>
    </div>

    <br />
    <h4>Skins</h4>
    <Table {tableHeaders} {tableRows} {activeSort} on:clickItem={gotoSkin} hasImage={true}/>
  {/if}
</div>
