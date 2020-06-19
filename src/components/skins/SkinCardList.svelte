<script>
  import SkinCard from "./SkinCard.svelte"
  import { SortableArray } from "../../utils/"
  import { Button } from "../../components/shared/"
  import { onMount } from 'svelte'
  import M from 'materialize-css'
  import SvelteInfiniteScroll from "svelte-infinite-scroll";

  export let skins = [];
  export let showFilter = true;
  export let showCollection = true;

  $: filtered_skins = skins;

  onMount(() => { 
    const elems = document.querySelectorAll('select.needs-select-init');
    M.FormSelect.init(elems);
  })

  let sortingIndex = 2;
  let sortingAsc = false;
  const availableSorts = [
    { "key": "weapon.tag", "type": "str" },
    { "key": "paintkit.tag", "type": "str" },
    { "key": "rarity.id", "type": "num" },
    { "key": "collection.tag", "type": "str" },
    { "key": "collection.released", "type": "dte" },
    { "key": "paintkit.minFloat", "type": "num" },
    { "key": "paintkit.maxFloat", "type": "num" }
  ]

  $: selectedSort = availableSorts[Number(sortingIndex)];
  $: sorted_skins = SortableArray.from(filtered_skins).sortBy(selectedSort.key, selectedSort.type, sortingAsc);

  $: clearPagination(sortingIndex, sortingAsc)

  const clearPagination = () => {
    page = 0;
    paginated_skins = [];
  }

  let page = 0;
  let size = 10;
  let paginated_skins = [];
  $: paginated_skins = [
    ...paginated_skins,
    ...sorted_skins.slice(size * page, size * (page + 1) - 1)
  ]
</script>

<style>
  .order-container {
    margin-top: 25px;
    max-width: 300px;
  }

  .order-container label {
    left: 0;
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

{#if showFilter}
  <div class="filter-container">
    <Button style="display: flex; align-items: center;">
      <i class="material-icons" style="margin-right: 10px;">filter_alt</i>
      <span>Filter {filtered_skins.length} skins</span>
    </Button>
  </div>
{/if}

<div class="order-container">
  <div class="input-field col s12">
    <select class="needs-select-init" bind:value={sortingIndex}>
      <option value="0">Weapon name</option>
      <option value="1">Skin name</option>
      <option value="2" selected>Rarity</option>
      <option value="3">Collection name</option>
      <option value="4">Collection release date</option>
      <option value="5">Min float</option>
      <option value="6">Max float</option>
    </select>
    <label>Sorting</label>
  </div>
  <Button on:click={() => sortingAsc = !sortingAsc}>{sortingAsc ? 'Sorting ASC' : 'Sorting DESC'}</Button>
</div>

<div class="skin-list">
  {#if showFilter}
    {#each paginated_skins as skin}
      <SkinCard {skin}/>
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