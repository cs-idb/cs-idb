<script>
  import { filterList, SortableArray } from '../../utils/';
  import BaseModal from './BaseModal.svelte';
  import Button from './Button.svelte';
  import Card from './Card.svelte';
  import { derived } from 'svelte/store';
  import M from 'materialize-css';
  import { onMount } from 'svelte';
  import { params } from '@sveltech/routify';
  import SortSelector from './SortSelector.svelte';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';
  import { writable } from 'svelte/store';

  export let items = [];
  export let showFilter = true;
  export let sortingStore;
  export let filtersStore = undefined;
  export let cardComponent = Card;
  export let cardFilterComponent = undefined;
  export let collapsed = false;

  const selectedSortStore = derived(sortingStore, $sortingStore => {
    return $sortingStore.availableSorts[$sortingStore.sortingIndex];
  });

  const newFiltersStore = writable({
    weaponId: undefined,
    paintkitTag: undefined,
    collectionId: undefined,
    minFloat: 0.0,
    maxFloat: 1.0,
  });

  $: {
    if (showFilterModal) {
      Object.assign($newFiltersStore, $filtersStore);
    }
  }

  const basePath = window.location.pathname + '?';

  let showFilterModal = false;
  $: filtered_items = filterList(items, $filtersStore);
  $: sorted_items = SortableArray.from(filtered_items).sortBy($selectedSortStore.key, $selectedSortStore.type, $sortingStore.sortAsc);
  $: clearPagination($sortingStore.sortingIndex, $sortingStore.sortingAsc);
  
  let page = 0;
  let size = 20;
  let paginated_items = [];
  $: paginated_items = [...paginated_items, ...sorted_items.slice(size * page, size * (page + 1) - 1)];

  onMount(() => {
    const elems = document.querySelectorAll('select.needs-select-init');
    M.FormSelect.init(elems);
    if (showFilter) {
      parseFiltersFromParams();
    }
  });

  const handleUpdateFilters = () => {
    clearPagination();
    $filtersStore = $newFiltersStore;
  };

  const clearPagination = () => {
    page = 0;
    paginated_items = [];
  };

  const parseFiltersFromParams = () => {
    let newFilters = {};
    const { weaponId, paintkitTag, collectionId, rarityIds, minFloat, maxFloat, sortingIndex, sortAsc } = $params;

    if (weaponId !== undefined) newFilters.weaponId = Number(weaponId);
    if (paintkitTag !== undefined) newFilters.paintkitTag = paintkitTag;
    if (collectionId !== undefined) newFilters.collectionId = Number(collectionId);
    if (rarityIds !== undefined) newFilters.rarityIds = rarityIds.split(',').map(Number);
    if (minFloat !== undefined) newFilters.minFloat = Number(minFloat);
    if (maxFloat !== undefined) newFilters.maxFloat = Number(maxFloat);

    clearPagination();
    $filtersStore = newFilters;
    $newFiltersStore = newFilters;

    if (sortingIndex !== undefined) {
      sortingStore.update(s => {
        s.sortingIndex = Number(sortingIndex);
        return s;
      });
    }

    if (sortAsc !== undefined) {
      sortingStore.update(s => {
        s.sortAsc = sortAsc === 'true';
        return s;
      });
    }
  };

  function encodeQueryData(data) {
    const ret = [];
    for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  $: fillUrlWithFilterAndSorting($filtersStore, $sortingStore);
  const fillUrlWithFilterAndSorting = () => {
    if (!showFilter) return;
    const queryData = {};
    Object.assign(queryData, $filtersStore);
    Object.keys(queryData).forEach(key => queryData[key] === undefined && delete queryData[key]);
    queryData.sortingIndex = $sortingStore.sortingIndex;
    queryData.sortAsc = $sortingStore.sortAsc;

    const queryString = basePath + encodeQueryData(queryData);
    window.history.replaceState({}, '', queryString);
  };

  let collapseWrapper;

  $: collapseDiv(collapsed);
  function collapseDiv () {
    if (!collapseWrapper) return;
    const height = collapsed ? 0 : [...collapseWrapper.children].reduce((el1, el2) => el1.clientHeight + el2.clientHeight)
    collapseWrapper.style.height = height + "px";
  }
</script>

<style>
  .collapse-wrapper {
    transition: height .3s;
    overflow: hidden;
  }
</style>

{#if showFilterModal}
  <BaseModal 
    showModal={showFilterModal} 
    on:close={() => (showFilterModal = false)} 
    on:update={handleUpdateFilters}
  >
    <div slot="modal-body">
      <svelte:component this={cardFilterComponent} {newFiltersStore} />
    </div>
  </BaseModal>
{/if}

<div class="collapse-wrapper" bind:this="{collapseWrapper}">
  <div class="filter-and-order-container">
    {#if showFilter}
      <div class="filter-container input-field">
        <Button style="display: flex; align-items: center;" on:click={() => (showFilterModal = !showFilterModal)}>
          <i class="material-icons" style="margin-right: 10px;">filter_alt</i>
          <span>Filter {filtered_items.length} items</span>
        </Button>
        <label>Filtering</label>
      </div>
    {/if}
    <SortSelector {sortingStore} />
  </div>

  <div class="card-list">
    {#if showFilter}
      {#each paginated_items as item}
        <svelte:component this={cardComponent} {item}/>
      {/each}
      <SvelteInfiniteScroll threshold={75} on:loadMore={() => page++} window={true} hasMore={page * size < filtered_items.length} />
    {:else}
      {#each sorted_items as item}
        <svelte:component this={cardComponent} {item}/>
      {/each}
    {/if}
  </div>
</div>
