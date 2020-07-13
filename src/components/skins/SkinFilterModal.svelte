<script>
  import { collections, rarities, skins, weapons } from '../../stores';
  import M from 'materialize-css';
  import { onMount } from 'svelte';
  import Select from 'svelte-select';

  export let newFiltersStore;
  export const resetFilter = () => {
    selectedWeapon = undefined;
    selectedPaintkit = undefined;
    selectedCollection = undefined;
    selectedRarities = [];
    $newFiltersStore.minFloat = 0.0;
    $newFiltersStore.maxFloat = 1.0;
  }

  let loaded = false;

  let selectedWeapon, selectedPaintkit, selectedCollection, selectedRarities = [];

  onMount(() => {
    selectedWeapon = weaponOptions.find(w => w.value === $newFiltersStore.weaponId);
    selectedPaintkit = skinOptions.find(s => s.value === $newFiltersStore.paintkitTag);
    selectedCollection = collectionOptions.find(c => c.value === $newFiltersStore.collectionId);
    selectedRarities = $newFiltersStore.rarityIds  || [];
    if (!$newFiltersStore.minFloat) $newFiltersStore.minFloat = 0.0;
    if (!$newFiltersStore.maxFloat) $newFiltersStore.maxFloat = 1.0;
    
    loaded = true;
    const elems = document.querySelectorAll('select.needs-materialize-select');
    M.FormSelect.init(elems);
  })

  $: { if (loaded) { $newFiltersStore.weaponId = (selectedWeapon || {}).value; } }
  $: { if (loaded) { $newFiltersStore.paintkitTag = (selectedPaintkit || {}).value; } }
  $: { if (loaded) { $newFiltersStore.collectionId = (selectedCollection || {}).value; } }
  $: { if (loaded) { $newFiltersStore.rarityIds = selectedRarities.length > 0 ? selectedRarities : undefined; } }

  $: weaponOptions = $weapons
    .filter(w => w.type !== 'Knife')
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
  $: rarityOptions = $rarities
    .filter(r => {
      return r.name !== 'default' && r.name !== 'knife';
    })
    .sort((a, b) => {
      return a.id < b.id ? 1 : -1;
    });

  $: allRaritiesAreSelected = rarityOptions.every(option => selectedRarities.find(r => r === option.id) !== undefined);

  const tickAllRarities = tick => {
    selectedRarities = [];
    if (tick === true) {
      rarityOptions.forEach(option => {
        selectedRarities.push(option.id);
      });
    }
  };
</script>

<style lang="scss">
  @media only screen and (min-width: 600px) {
    .skin-filter-modal {
      max-width: 500px;
      min-width: auto;
    }
  }

  .skin-filter-modal :global(.input-field label) {
    left: 0;
  }

  .rarities {
    display: flex;
    flex-direction: column;
    margin-top: 5px;

    [type="checkbox"].filled-in:checked + span:not(.lever)::after {
      border: 2px solid var(--color-accent);
      background-color: var(--color-accent);
    }
  }

  .rarities .invert-button {
    margin: 10px 0;
    text-decoration: underline;
    color: var(--color-primary);
    cursor: pointer;
  }

  .rarities .name {
    font-weight: bold;
  }

  .val {
    display: flex;
    align-items: center;
  }

  .val .range-field {
    width: 100%;
    margin-right: 15px;

    input[type="range"] {
      border: none;
    }

    input[type="range"]::-moz-range-thumb, input[type="range"]::-webkit-slider-thumb {
      background-color: var(--color-accent);
    }
  }

  .val .input-field {
    width: 65px;
    margin: 0 0 0 15px;

    input[type="number"] {
      color: var(--color-primary);

      &:focus {
        border-bottom: 1px solid var(--color-accent);
      }
    }
  }

  :global(.selectContainer) {
    border: var(--border, 2px solid #d8dbdf) !important;
  }

  :global(.selectContainer.focused) {
    border-color: var(--color-accent) !important;
  }

  :global(.selectContainer input) {
    box-shadow: none !important;
    top: 0;
  }
</style>

<div class="skin-filter-modal">

  <div>
    <label>Weapon name</label>
    <Select items={weaponOptions} bind:selectedValue={selectedWeapon} />
  </div>

  <div>
    <label>Skin name</label>
    <Select items={skinOptions} bind:selectedValue={selectedPaintkit} />
  </div>

  <div>
    <label>Collection name</label>
    <Select items={collectionOptions} bind:selectedValue={selectedCollection} />
  </div>

  <div class="rarities">
    <label>Rarity</label>
    <p class="invert-button" on:click={() => tickAllRarities(!allRaritiesAreSelected)}>{allRaritiesAreSelected ? 'Clear all' : 'Select all'}</p>
    {#each rarityOptions as option}
      <label>
        <input type="checkbox" class="filled-in" bind:group={selectedRarities} value={option.id} />
        <span class="name" style={`color: ${option.color};`}>{option.tag}</span>
      </label>
    {/each}
  </div>

  <div class="min-float">
    <label>Min float</label>
    <div class="val">
      <p class="range-field">
        <input type="range" min="0" max="1" step="0.01" bind:value={$newFiltersStore.minFloat} />
      </p>
      <div class="input-field">
        <input bind:value={$newFiltersStore.minFloat} type="number" min="0" max="1" step="0.01" />
      </div>
    </div>
  </div>

  <div class="max-float">
    <label>Max float</label>
    <div class="val">
      <p class="range-field">
        <input type="range" min="0" max="1" step="0.01" bind:value={$newFiltersStore.maxFloat} />
      </p>
      <div class="input-field">
        <input bind:value={$newFiltersStore.maxFloat} type="number" min="0" max="1" step="0.01" />
      </div>
    </div>
  </div>

</div>
