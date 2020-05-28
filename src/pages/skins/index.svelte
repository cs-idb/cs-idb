<script>
  import { goto, url } from '@sveltech/routify'
  import { Button, Table } from '../../components/shared/'
  import { QueryFilter } from '../../components/filter/'
  import { skins, rarities } from '../../stores'
  import { applyFilter } from '../../utils/'

  const tableHeaders = ['weapon', 'name', 'collection', 'rarity', 'Min float', 'Max float']
  let new_array = $skins

  $: tableRows = new_array.map(function(skin) {
    return {
      '__id': skin.id,
      'weapon': skin.weapon.tag,
      'name': skin.paintkit.tag,
      'collection': skin.collection.tag,
      'rarity': skin.rarity.tag,
      'Min float': skin.paintkit.minFloat,
      'Max float': skin.paintkit.maxFloat,
    }
  })

  const filter_options = [
    {
      'url_name': 'w',
      'display_name': 'Weapon name',
      'key': 'weapon.tag',
      'type': 'text',
    },
    {
      'url_name': 'n',
      'display_name': 'Skin name',
      'key': 'paintkit.tag',
      'type': 'text',
    },
    {
      'url_name': 'c',
      'display_name': 'Collection name',
      'key': 'collection.tag',
      'type': 'text',
    },
    {
      'url_name': 'r',
      'display_name': 'Rarity/ Quality',
      'key': 'rarity.tag',
      'type': 'select',
      'options': $rarities.map((r) => r.tag),
    },
    {
      'url_name': 'min',
      'display_name': 'Min float value',
      'key': 'paintkit.minFloat',
      'type': 'number',
    },
    {
      'url_name': 'max',
      'display_name': 'Max float value',
      'key': 'paintkit.maxFloat',
      'type': 'number',
    },
  ]

  let active_filters = []

  const activeSort = {
    header: 'name',
    sortAsc: true,
  }

  const updateFilter = (e) => {
    active_filters = e.detail
    new_array = applyFilter($skins, active_filters)
  }

  const gotoSkin = (e) => {
    const skin_id = e.detail
    $goto($url(`/skins/${skin_id}`))
  }
</script>

<style>
  .skins-container {
    margin: 2rem 0;
  }

  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }

  .filter-skin-count {
    margin-left: 15px;
    display: inline-block;
  }
</style>

<div class="skins-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Skins</span>
  </h3>

  <QueryFilter {filter_options} on:setFilters={updateFilter}/>
  <p class="filter-skin-count grey-text text-darken-2">Found {new_array.length} out of {$skins.length} total skins.</p>
  <Table {tableHeaders} {tableRows} {activeSort} on:clickItem={gotoSkin}/>
</div>
