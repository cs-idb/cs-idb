<script>
  import Button from './Button.svelte';
  import { derived } from 'svelte/store';
  import M from 'materialize-css';
  import { onMount } from 'svelte';

  export let sortingStore;
  const selectedSortStore = derived(sortingStore, $sortingStore => {
    return $sortingStore.availableSorts[$sortingStore.sortingIndex];
  });

  $: initFormSelect($selectedSortStore);

  onMount(() => {
    initFormSelect();
  });

  const initFormSelect = async () => {
    const selectEls = document.querySelectorAll('.sort-selector-container .needs-select-init');
    selectEls.forEach(el => {
      el.classList.remove('needs-select-init');
      el.classList.add('select-initialized');
      el.selectedIndex = $sortingStore.sortingIndex;
    });
    M.FormSelect.init(selectEls);
  };

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
    margin: 1rem 10px 0 0;
  }

  .sort-selector-container label {
    left: 0;
  }

  .sort-selector-container :global(button) {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-bottom: -1rem;
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
