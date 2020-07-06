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

<style lang="scss">
  .sort-selector-container {
    display: flex;
    align-items: center;

    .input-field {
      max-width: 200px;
      margin: 1rem 10px 0 0;

      :global(.select-wrapper input) {
        color: var(--color-primary);
      }

      :global(.select-wrapper input:focus) {
        border-bottom: 1px solid var(--color-accent);
      }

      :global(.select-wrapper ul) {
        background-color: var(--color-background3);
      }

      :global(.select-wrapper ul li span) {
        color: var(--color-primary);
      }

      :global(.select-wrapper svg.caret) {
        fill: var(--color-primary);
      }

      label {
        left: 0;
      }
    }
  }

  .sort-selector-container :global(button) {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-bottom: -1rem;
    background-color: var(--color-accent);
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
