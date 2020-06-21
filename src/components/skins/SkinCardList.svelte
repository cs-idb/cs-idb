<script>
  import SkinCard from "./SkinCard.svelte"
  import { SortableArray } from "../../utils/"
  import { Button, SortSelector } from "../../components/shared/"
  import { onMount } from 'svelte'
  import M from 'materialize-css'
  import SvelteInfiniteScroll from "svelte-infinite-scroll";
  import { derived } from 'svelte/store'
  import SkinFilterModal from './SkinFilterModal.svelte';

  export let skins = [];
  export let showFilter = true;
  export let showCollection = true;

  export let sortingStore;
  const selectedSortStore = derived(sortingStore, $sortingStore => {
    return $sortingStore.availableSorts[$sortingStore.sortingIndex]
  })

  $: filtered_skins = skins;

  $: sorted_skins = SortableArray.from(filtered_skins).sortBy($selectedSortStore.key, $selectedSortStore.type, $sortingStore.sortAsc);

  $: clearPagination($sortingStore.sortingIndex, $sortingStore.sortingAsc)
  const clearPagination = () => {
    page = 0;
    paginated_skins = [];
  }

  let page = 0;
  let size = 20;
  let paginated_skins = [];
  $: paginated_skins = [
    ...paginated_skins,
    ...sorted_skins.slice(size * page, size * (page + 1) - 1)
  ]

  let showFilterModal = true;

  onMount(() => { 
    const elems = document.querySelectorAll('select.needs-select-init');
    M.FormSelect.init(elems);
  })
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

  .filter-container label {
    position: absolute;
    top: -35px;
    font-size: 0.8rem;
  }

  .skin-list {
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto 0px auto;
  }

  @media screen and (max-width: 700px) {
    .skin-list { width: 310px; }
  }
  @media screen and (min-width: 700px) and (max-width: 1020px) {
    .skin-list { width: 620px; }
  }
  @media screen and (min-width: 1020px) and (max-width: 1370px) {
    .skin-list { width: 930px; }
  }
  @media screen and (min-width: 1370px) and (max-width: 1720px) {
    .skin-list { width: 1240px; }
  }
  @media screen and (min-width: 1720px) {
    .skin-list { width: 100%; }
  }
</style>

<SkinFilterModal showModal={showFilterModal} on:close={() => showFilterModal = false}/>

<div class="filter-and-order-container">
  {#if showFilter}
    <div class="filter-container input-field">
      <Button style="display: flex; align-items: center;" on:click={() => showFilterModal = !showFilterModal}>
        <i class="material-icons" style="margin-right: 10px;">filter_alt</i>
        <span>Filter {filtered_skins.length} skins</span>
      </Button>
      <label>Filtering</label>
    </div>
  {/if}

  <SortSelector {sortingStore}/>
</div>

<div class="skin-list">
  {#if showFilter}
    {#each paginated_skins as skin}
      <SkinCard {skin} {showCollection}/>
    {/each}
    <SvelteInfiniteScroll 
        threshold={75}
        on:loadMore={() => page++} 
        window={true}
        hasMore={page * size < filtered_skins.length}
      />
  {:else}
    {#each sorted_skins as skin}
      <SkinCard {skin} {showCollection}/>
    {/each}
  {/if}
</div>