<script>
  import { onMount } from 'svelte'
  import { url, params } from '@sveltech/routify'
  import { collections } from '../../stores'
  import { Card, ListFilterSorter, Badge, CardList } from '../shared/'
  import { SortableArray } from '../../utils/'

  const sortables = ['name', 'case', 'stattrak', 'souvenir', 'released']
  let search = ''
  let sorting = {
    sortBy: 'released',
    sortAsc: false,
  }

  onMount(() => {
    search = $params.q || ''
    sorting.sortBy = sortables.includes($params.sortBy) ? $params.sortBy : 'released'
    sorting.sortAsc = $params.sortAsc === 'true' || false
  })

  const updateSearch = e => {
    search = e.detail
    updateWindowHistory()
  }

  const updateSort = e => {
    sorting = e.detail
    updateWindowHistory()
  }

  const updateWindowHistory = () => {
    window.history.replaceState({}, '', `?q=${search}&sortBy=${sorting.sortBy}&sortAsc=${sorting.sortAsc}`)
  }

  $: sortedFilteredCollections = SortableArray.from($collections)
    .filter(c => c.tag.toLowerCase().includes(search.toLowerCase()))
    .sortBy(sorting.sortBy, sorting.sortAsc)
</script>

<style>
  .page-desc {
    margin-bottom: 20px;
  }
</style>

<p class="page-desc">CSGO has many collections, each containing different skins. Check them out using the 'view' button on each collection card.</p>

<ListFilterSorter {sortables} {sorting} on:updateSort={updateSort} on:updateSearch={updateSearch} />

<div>
  <label>Found {sortedFilteredCollections.length} collections matching to the criteria</label>
</div>

<CardList>
  {#each sortedFilteredCollections as collection (collection.tag)}
    <Card>
      <div slot="card-content">
        <h6>{collection.tag}</h6>
        <p>Released date: {collection.released.toLocaleDateString()}</p>
        {#if collection.stattrak}
          <Badge color="orange">StatTrak™ available</Badge>
        {/if}
        {#if collection.souvenir}
          <Badge color="yellow accent-4">Souvenir available</Badge>
        {/if}
        {#if collection.case}
          <Badge>Case available</Badge>
        {/if}
      </div>
      <div slot="card-action">
        <a class="red-text text-lighten-2" href={$url(`/collections/${collection.id}`)}>View</a>
      </div>
    </Card>
  {/each}
</CardList>
