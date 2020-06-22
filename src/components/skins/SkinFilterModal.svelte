<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { Button } from '../shared';
  import { weapons, skins, collections, rarities } from '../../stores'
  import M from 'materialize-css';
  import Select from 'svelte-select';
  export let showModal = false;
  const dispatch = createEventDispatcher()

  $: weaponOptions = $weapons
    .sort((a, b) => { return a.tag > b.tag })
    .map(w => { return { "value": w.id, "label": w.tag } })
  $: skinOptions = $skins
    .filter((v,i,a) => a.findIndex(t=>(t.paintkit.tag === v.paintkit.tag))===i)
    .sort((a, b) => { return a.paintkit.tag > b.paintkit.tag })
    .map(s => { return { "value": s.paintkit.tag, "label": s.paintkit.tag } })
  $: collectionOptions = $collections
    .sort((a, b) => { return a.tag > b.tag })
    .map(c => { return { "value": c.id, "label": c.tag } })
  $: rarityOptions = $rarities
    .sort((a, b) => { return a.id < b.id });

  let selectedWeapon, selectedSkin, selectedCollection;
  let selectedRarities = [];
  $: allRaritiesAreSelected = rarityOptions.every(option => selectedRarities.find(r => r === option.id) !== undefined)

  let minFloat = 0.00;
  let maxFloat = 1.00;

  onMount(() => {
    const elems = document.querySelectorAll('select.needs-materialize-select');
    M.FormSelect.init(elems);
    invertSelectedRarities()
  })

  const hideModal = () => {
    dispatch('close');
  }

  const invertSelectedRarities = () => {
    selectedRarities = [];
    if (!allRaritiesAreSelected) {
      rarityOptions.forEach(option => {
        selectedRarities.push(option.id)
      })
    }
  }

  const resetAllFilters = () => {
    selectedWeapon = undefined;
    selectedSkin = undefined;
    selectedCollection = undefined;
    minFloat = 0.00;
    maxFloat = 1.00;
    selectedRarities = [];
    invertSelectedRarities();
  }

  const updateFilters = () => {
    const filters = {
      weaponId: selectedWeapon && selectedWeapon.value,
      paintkitTag: selectedSkin && selectedSkin.value,
      collectionId: selectedCollection && selectedCollection.value,
      rarityId: selectedRarities,
      minFloat: minFloat,
      maxFloat: maxFloat
    }
    hideModal();
    dispatch('update', filters);
  }
</script>

<style>
  .background-shadow {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    top: 0;
    left: 0;
    position: fixed;

    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
  }
  .background-shadow.show {
    opacity: 1;
    visibility: visible;
  }

  .skin-filter-modal {
    position: fixed;
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
    padding: 20px;
    z-index: 1000;
    top: 50%;
    left: 50%;
    max-height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
    transform: translate(-50%, -50%);
    min-width: min(400px, 90%);
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title .header {
    margin-top: 0px;
    text-align: center;
    width: 100%;
  }

  .title :global(button) {
    border-radius: 5px;
    padding: 0px 10px;
  }

  .body :global(.input-field label) {
    left: 0;
  }

  .body .rarities {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .body .rarities .invert-button {
    margin: 10px 0;
    text-decoration: underline;
    color: #0101b3;
    cursor: pointer;
  }

  .body .rarities .name {
    font-weight: bold;
  }

  .body .val {
    display: flex;
    align-items: center;
  }

  .body .val .range-field {
    width: 100%;
    margin-right: 15px;
  }

  .body .val .input-field {
    width: 65px;
    margin: 0 0 0 15px;
  }

  :global(.selectContainer.focused) {
    border-color: var(--borderFocusColor, #26a69a) !important;
  }

  :global(.selectContainer input) {
    box-shadow: none !important;
    top: 0;
  }

  .footer {
    margin: 15px 0;
    text-align: right;
  }
</style>

<div class="background-shadow" on:click={hideModal} class:show={showModal}></div>
{#if showModal}
  <div class="skin-filter-modal">
    <div class="title">
      <h6 class="header"><b>Filters</b></h6>
      <Button on:click={hideModal}>x</Button>
    </div>

    <div class="body">

      <div>
        <label>Weapon name</label>
        <Select items={weaponOptions} bind:selectedValue={selectedWeapon}/>
      </div>

      <div>
        <label>Skin name</label>
        <Select items={skinOptions} bind:selectedValue={selectedSkin}/>
      </div>

      <div>
        <label>Collection name</label>
        <Select items={collectionOptions} bind:selectedValue={selectedCollection}/>
      </div>

      <div class="rarities">
        <label>Rarity</label>
        <p class="invert-button" on:click={invertSelectedRarities}>{allRaritiesAreSelected ? 'Clear all' : 'Select all'}</p>
        {#each rarityOptions as option}
          <label>
            <input type="checkbox" class="filled-in" bind:group={selectedRarities} value={option.id}/>
            <span class="name" style={`color: ${option.color};`}>{option.tag}</span>
          </label>
        {/each}
      </div>

      <div class="min-float">
        <label>Min float</label>
        <div class="val">
          <p class="range-field">
            <input type="range" min="0" max="1" step="0.01" bind:value={minFloat}/>
          </p>
          <div class="input-field">
            <input bind:value={minFloat} type="number" min="0" max="1" step="0.01">
          </div>
        </div>
      </div>

      <div class="max-float">
        <label>Max float</label>
        <div class="val">
          <p class="range-field">
            <input type="range" min="0" max="1" step="0.01" bind:value={maxFloat}/>
          </p>
          <div class="input-field">
            <input bind:value={maxFloat} type="number" min="0" max="1" step="0.01">
          </div>
        </div>
      </div>

    </div>

    <div class="footer">
      <Button type="red" on:click={resetAllFilters}>Reset</Button>
      <Button type="green" on:click={updateFilters}>Save</Button>
    </div>
  </div>
{/if}