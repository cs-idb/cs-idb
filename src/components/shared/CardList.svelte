<script>
  import { filterList, SortableArray } from '../../utils/';
  import Card from './Card.svelte';
  import { derived } from 'svelte/store';
  import M from 'materialize-css';
  import { onMount } from 'svelte';
  import { params } from '@sveltech/routify';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';

  export let items = [];
  export let showFilter = true;

  export let sortingStore;
  const selectedSortStore = derived(sortingStore, $sortingStore => {
    return $sortingStore.availableSorts[$sortingStore.sortingIndex];
  });
  export let filtersStore;
  export let cardComponent = Card;

  const basePath = window.location.pathname + '?';

  let showFilterModal = false;
  $: filtered_items = filterList(items, $filtersStore);

  const handleUpdateFilters = e => {
    clearPagination();
    $filtersStore = e.detail;
  };

  $: sorted_items = SortableArray.from(filtered_items).sortBy($selectedSortStore.key, $selectedSortStore.type, $sortingStore.sortAsc);

  $: clearPagination($sortingStore.sortingIndex, $sortingStore.sortingAsc);
  const clearPagination = () => {
    page = 0;
    paginated_items = [];
  };

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
</script>

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
