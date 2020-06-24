<script>
  import { Button, SortSelector } from '../../components/shared/';
  import { derived } from 'svelte/store';
  import { filterSkinList } from '../../utils';
  import M from 'materialize-css';
  import { onMount } from 'svelte';
  import { params } from '@sveltech/routify';
  import SkinCard from './SkinCard.svelte';
  import SkinFilterModal from './SkinFilterModal.svelte';
  import { SortableArray } from '../../utils/';
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';

  export let skins = [];
  export let showFilter = true;
  export let showCollection = true;

  export let sortingStore;
  const selectedSortStore = derived(sortingStore, $sortingStore => {
    return $sortingStore.availableSorts[$sortingStore.sortingIndex];
  });

  export let filtersStore;

  const basePath = window.location.pathname + '?';

  let showFilterModal = false;
  $: filtered_skins = filterSkinList(skins, $filtersStore);

  const handleUpdateFilters = e => {
    clearPagination();
    $filtersStore = e.detail;
  };

  $: sorted_skins = SortableArray.from(filtered_skins).sortBy($selectedSortStore.key, $selectedSortStore.type, $sortingStore.sortAsc);

  $: clearPagination($sortingStore.sortingIndex, $sortingStore.sortingAsc);
  const clearPagination = () => {
    page = 0;
    paginated_skins = [];
  };

  let page = 0;
  let size = 20;
  let paginated_skins = [];
  $: paginated_skins = [...paginated_skins, ...sorted_skins.slice(size * page, size * (page + 1) - 1)];

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

    if (weaponId !== undefined) {
      newFilters.weaponId = Number(weaponId);
    }
    if (paintkitTag !== undefined) {
      newFilters.paintkitTag = paintkitTag;
    }
    if (collectionId !== undefined) {
      newFilters.collectionId = Number(collectionId);
    }
    if (rarityIds !== undefined) {
      newFilters.rarityIds = rarityIds.split(',').map(Number);
    }
    if (minFloat !== undefined) {
      newFilters.minFloat = Number(minFloat);
    }
    if (maxFloat !== undefined) {
      newFilters.maxFloat = Number(maxFloat);
    }

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

<style>
  .filter-and-order-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .filter-container {
    margin: 0 15px 15px 0;
  }

  .filter-container :global(button) {
    margin-top: 1rem;
  }

  .filter-container label {
    position: absolute;
    top: -20px;
    font-size: 0.8rem;
  }

  .skin-list {
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto 0px auto;
  }

  @media screen and (max-width: 700px) {
    .skin-list {
      width: 310px;
    }
  }
  @media screen and (min-width: 700px) and (max-width: 1020px) {
    .skin-list {
      width: 620px;
    }
  }
  @media screen and (min-width: 1020px) and (max-width: 1370px) {
    .skin-list {
      width: 930px;
    }
  }
  @media screen and (min-width: 1370px) and (max-width: 1720px) {
    .skin-list {
      width: 1240px;
    }
  }
  @media screen and (min-width: 1720px) {
    .skin-list {
      width: 100%;
    }
  }
</style>

{#if showFilterModal}
  <SkinFilterModal showModal={showFilterModal} on:close={() => (showFilterModal = false)} on:update={handleUpdateFilters} {filtersStore} />
{/if}

<div class="filter-and-order-container">
  {#if showFilter}
    <div class="filter-container input-field">
      <Button style="display: flex; align-items: center;" on:click={() => (showFilterModal = !showFilterModal)}>
        <i class="material-icons" style="margin-right: 10px;">filter_alt</i>
        <span>Filter {filtered_skins.length} skins</span>
      </Button>
      <label>Filtering</label>
    </div>
  {/if}

  <SortSelector {sortingStore} />
</div>

<div class="skin-list">
  {#if showFilter}
    {#each paginated_skins as skin}
      <SkinCard {skin} {showCollection} />
    {/each}
    <SvelteInfiniteScroll threshold={75} on:loadMore={() => page++} window={true} hasMore={page * size < filtered_skins.length} />
  {:else}
    {#each sorted_skins as skin}
      <SkinCard {skin} {showCollection} />
    {/each}
  {/if}
</div>
