<script>
  import { createEventDispatcher } from 'svelte'
  export let sortables
  export let search = ''
  export let sorting 

  const dispatch = createEventDispatcher()

  const handleSortUpdate = (sortable) => {
    if (sorting.sortBy === sortable) {
      sorting.sortAsc = !sorting.sortAsc
    } else {
      sorting.sortBy = sortable
      sorting.sortAsc = true
    }
    dispatch('updateSort', sorting)
  }
</script>

<div class="list-filter-sort">
  <div>
    <label for="search">Search by name</label>
    <input id="search" type="text" bind:value={search} on:keyup={() => dispatch('updateSearch', search)}/>
  </div>

  <div>
    <label>Sorting:</label>
    <div class="sorting">
      {#each sortables as sortable}
        <button
          class="btn red lighten-2 waves-effect waves-light"
          on:click={() => handleSortUpdate(sortable)}>
          {sortable}
          {#if sortable === sorting.sortBy && sorting.sortAsc}
            <i class="material-icons">arrow_upward</i>
          {:else if sortable === sorting.sortBy && !sorting.sortAsc}
            <i class="material-icons">arrow_downward</i>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  #search {
    max-width: 500px;
    display: block;
  }

  #search:focus {
    border-bottom: 1px solid #ee7e73;
    box-shadow: none;
  }

  .sorting .btn {
    margin: 0 5px 5px 0;
    display: inline-flex;
  }
</style>