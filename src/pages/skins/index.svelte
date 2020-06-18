<script>
  import { Button, PageHeader } from '../../components/shared/'
  import { skins } from '../../stores'
  import { SkinCard } from "../../components/skins/"
  import { onMount } from 'svelte'
  import M from 'materialize-css'
  import { SortableArray } from "../../utils/"
  import SvelteInfiniteScroll from "svelte-infinite-scroll";

  $: all_skins = $skins;
  $: filtered_skins = all_skins//.filter(s => s.weapon.tag === "AK-47");

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
  let size = 20;
  let paginated_skins = [];
  $: paginated_skins = [
    ...paginated_skins,
    ...sorted_skins.splice(size * page, size * (page + 1) - 1)
  ]
</script>

<style>
  .skins-container {
    margin: 2rem 0;
  }

  .filter-container {
    margin-bottom: 20px;
  }

  .sorting {
    margin-top: 25px;
    max-width: 300px;
  }

  .sorting label {
    left: 0;
  }

  .skin-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
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

<div class="skins-container">
  <PageHeader>
    Skins
  </PageHeader>

  <div class="filter-container">
    <Button style="display: flex; align-items: center;">
      <i class="material-icons" style="margin-right: 10px;">filter_alt</i>
      <span>Filter {filtered_skins.length} skins</span>
    </Button>

    <div class="sorting input-field col s12">
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
    {#each paginated_skins as skin}
      <SkinCard {skin}/>
      
      <SvelteInfiniteScroll 
        threshold={90} 
        on:loadMore={() => page++} 
        window={true}
        hasMore={page * size < filtered_skins.length}
      />
    {/each}
  </div>
</div>
