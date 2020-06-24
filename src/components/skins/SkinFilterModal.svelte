<script>
  import { collections, rarities, skins, weapons } from '../../stores';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Button } from '../shared';
  import M from 'materialize-css';
  import Select from 'svelte-select';
  export let showModal = false;
  export let filtersStore;
  const dispatch = createEventDispatcher();

  $: weaponOptions = $weapons
    .sort((a, b) => {
      return a.tag > b.tag ? 1 : -1;
    })
    .map(w => {
      return { value: w.id, label: w.tag };
    });
  $: skinOptions = $skins
    .filter((v, i, a) => a.findIndex(t => t.paintkit.tag === v.paintkit.tag) === i)
    .sort((a, b) => {
      return a.paintkit.tag > b.paintkit.tag ? 1 : -1;
    })
    .map(s => {
      return { value: s.paintkit.tag, label: s.paintkit.tag };
    });
  $: collectionOptions = $collections
    .sort((a, b) => {
      return a.tag > b.tag ? 1 : -1;
    })
    .map(c => {
      return { value: c.id, label: c.tag };
    });
  $: rarityOptions = $rarities.sort((a, b) => {
    return a.id < b.id ? 1 : -1;
  });

  const getSelectedWeapon = () => {
    const weaponId = $filtersStore.weaponId;
    if (weaponId === undefined) return undefined;
    const fullWeapon = $weapons.find(w => w.id === weaponId);
    return { value: weaponId, label: fullWeapon.tag };
  };

  const getSelectedSkin = () => {
    const tag = $filtersStore.paintkitTag;
    if (tag === undefined) return undefined;
    return { value: $filtersStore.paintkitTag, label: $filtersStore.paintkitTag };
  };

  const getSelectedCollection = () => {
    const collectionId = $filtersStore.collectionId;
    if (collectionId === undefined) return undefined;
    const fullCollection = $collections.find(c => c.id === collectionId);
    return { value: collectionId, label: fullCollection.tag };
  };

  const loadActiveFilters = () => {
    newFilters.selectedWeapon = getSelectedWeapon();
    newFilters.selectedSkin = getSelectedSkin();
    newFilters.selectedCollection = getSelectedCollection();
    newFilters.selectedRarities = $filtersStore.rarityIds;
    if (newFilters.selectedRarities === undefined) {
      newFilters.selectedRarities = [];
      tickAllRarities(true);
    }
    newFilters.minFloat = $filtersStore.minFloat || 0.0;
    newFilters.maxFloat = $filtersStore.maxFloat || 1.0;
  };

  let newFilters = {
    selectedWeapon: undefined,
    selectedSkin: undefined,
    selectedCollection: undefined,
    selectedRarities: [],
    minFloat: 0.0,
    maxFloat: 1.0,
  };

  $: allRaritiesAreSelected = rarityOptions.every(option => newFilters.selectedRarities.find(r => r === option.id) !== undefined);

  onMount(() => {
    const elems = document.querySelectorAll('select.needs-materialize-select');
    M.FormSelect.init(elems);
    loadActiveFilters();
  });

  const hideModal = () => {
    dispatch('close');
  };

  const tickAllRarities = tick => {
    newFilters.selectedRarities = [];
    if (tick === true) {
      rarityOptions.forEach(option => {
        newFilters.selectedRarities.push(option.id);
      });
    }
  };

  const resetAllFilters = () => {
    newFilters = {
      selectedWeapon: undefined,
      selectedSkin: undefined,
      selectedCollection: undefined,
      selectedRarities: [],
      minFloat: 0.0,
      maxFloat: 1.0,
    };
    tickAllRarities(true);
  };

  const updateFilters = () => {
    const filters = {
      weaponId: newFilters.selectedWeapon && newFilters.selectedWeapon.value,
      paintkitTag: newFilters.selectedSkin && newFilters.selectedSkin.value,
      collectionId: newFilters.selectedCollection && newFilters.selectedCollection.value,
      rarityIds: newFilters.selectedRarities,
      minFloat: newFilters.minFloat,
      maxFloat: newFilters.maxFloat,
    };
    hideModal();
    dispatch('update', filters);
  };
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

  .modal-container {
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .skin-filter-modal {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
    padding: 20px;
    min-width: 90%;
    max-height: 90%;
    overflow-y: auto;
  }

  @media only screen and (min-width: 600px) {
    .skin-filter-modal {
      width: 500px;
      min-width: auto;
    }
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

<div class="background-shadow" class:show={showModal} />
{#if showModal}
  <div class="modal-container" on:click|self={hideModal}>
    <div class="skin-filter-modal">
      <div class="title">
        <h6 class="header">
          <b>Filters</b>
        </h6>
        <Button on:click={hideModal}>x</Button>
      </div>

      <div class="body">

        <div>
          <label>Weapon name</label>
          <Select items={weaponOptions} bind:selectedValue={newFilters.selectedWeapon} />
        </div>

        <div>
          <label>Skin name</label>
          <Select items={skinOptions} bind:selectedValue={newFilters.selectedSkin} />
        </div>

        <div>
          <label>Collection name</label>
          <Select items={collectionOptions} bind:selectedValue={newFilters.selectedCollection} />
        </div>

        <div class="rarities">
          <label>Rarity</label>
          <p class="invert-button" on:click={() => tickAllRarities(!allRaritiesAreSelected)}>{allRaritiesAreSelected ? 'Clear all' : 'Select all'}</p>
          {#each rarityOptions as option}
            <label>
              <input type="checkbox" class="filled-in" bind:group={newFilters.selectedRarities} value={option.id} />
              <span class="name" style={`color: ${option.color};`}>{option.tag}</span>
            </label>
          {/each}
        </div>

        <div class="min-float">
          <label>Min float</label>
          <div class="val">
            <p class="range-field">
              <input type="range" min="0" max="1" step="0.01" bind:value={newFilters.minFloat} />
            </p>
            <div class="input-field">
              <input bind:value={newFilters.minFloat} type="number" min="0" max="1" step="0.01" />
            </div>
          </div>
        </div>

        <div class="max-float">
          <label>Max float</label>
          <div class="val">
            <p class="range-field">
              <input type="range" min="0" max="1" step="0.01" bind:value={newFilters.maxFloat} />
            </p>
            <div class="input-field">
              <input bind:value={newFilters.maxFloat} type="number" min="0" max="1" step="0.01" />
            </div>
          </div>
        </div>

      </div>

      <div class="footer">
        <Button type="red" on:click={resetAllFilters}>Reset</Button>
        <Button type="green" on:click={updateFilters}>Save</Button>
      </div>
    </div>
  </div>
{/if}
