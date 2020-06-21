<script>
  import Button from './Button.svelte'

  export let sortingStore;

  const handleChangeSortingAsc = () => {
    $sortingStore.sortAsc = !$sortingStore.sortAsc
  }
</script>

<style>
  .sort-selector-container {
    margin-top: 25px;
    max-width: 300px;
  }

  .sort-selector-container label {
    left: 0;
  }
</style>

<div class="sort-selector-container">
  <div class="input-field col s12">
    <select class="needs-select-init" bind:value={$sortingStore.sortingIndex}>
      {#each $sortingStore.availableSorts as sortOption, i}
        <option value={i}>{sortOption.name}</option>
      {/each}
    </select>
    <label>Sorting</label>
  </div>
  <Button on:click={handleChangeSortingAsc}>{$sortingStore.sortAsc ? 'Sorting ASC' : 'Sorting DESC'}</Button>
</div>
