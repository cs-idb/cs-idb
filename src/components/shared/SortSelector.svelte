<script>
  import Button from './Button.svelte';

  export let sortingStore;

  const handleChangeSortingAsc = () => {
    $sortingStore.sortAsc = !$sortingStore.sortAsc;
  };
</script>

<style>
  .sort-selector-container {
    display: flex;
    align-items: center;
  }

  .sort-selector-container .input-field {
    max-width: 200px;
    margin-right: 10px;
  }

  .sort-selector-container label {
    left: 0;
  }

  .sort-selector-container :global(button) {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .sort-selector-container :global(button span) {
    transition: transform 0.2s ease-in-out;
  }

  .sort-selector-container :global(button span.flipped) {
    transform: scaley(-1);
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
  <Button on:click={handleChangeSortingAsc}>
    <span class="material-icons" class:flipped={$sortingStore.sortAsc}>sort</span>
  </Button>
</div>
