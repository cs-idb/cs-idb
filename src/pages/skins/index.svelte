<script>
  import { goto } from '@sveltech/routify'
  import { Button } from '../../components/shared/'
  import { skins } from '../../stores'
  import { SkinCard } from "../../components/skins/"
  import { onMount } from 'svelte'
  import M from 'materialize-css'
  import { SortableArray } from "../../utils/"

  $: all_skins = $skins;
  $: filtered_skins = all_skins//.filter(s => s.weapon.tag === "AK-47");

  onMount(() => { 
    const elems = document.querySelectorAll('select.needs-select-init');
    M.FormSelect.init(elems);
  })

  let sortingIndex = 2;
  let sortingAsc = true;
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


  // let pagination_current_page = 0;
  // const pagination_amount_options = [10, 25, 50, 100, Infinity];
  // let pagination_amount_per_page = 50;
  // $: pagination_page_count = filtered_skins.length / pagination_amount_per_page;

  $: paginated_skins = sorted_skins.slice(0, 50);
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

  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }

  .skin-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<div class="skins-container">
  <h3 class="heading">
    <Button on:click={() => $goto('/')}>&lt;</Button>
    <span>Skins</span>
  </h3>

  <div class="filter-container">
    <Button style="display: flex; align-items: center;">
      <i class="material-icons" style="margin-right: 10px;">filter_alt</i>
      <span>Filter {paginated_skins.length} skins</span>
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
    {/each}
  </div>
</div>
