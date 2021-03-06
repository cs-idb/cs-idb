<script>
  import { collections_with_knife_amount, knife_paintkit_tags, knife_weapon_names } from '../../stores';
  import { onMount } from 'svelte';
  import Select from 'svelte-select';

  export let newFiltersStore;
  export const resetFilter = () => {
    selectedWeapon = undefined;
    selectedPaintkit = undefined;
    selectedCollection = undefined;

    $newFiltersStore.minFloat = 0.0;
    $newFiltersStore.maxFloat = 1.0;
  };

  let loaded = false;

  onMount(() => {
    selectedWeapon = weaponOptions.find(w => w.value === $newFiltersStore.weaponId);
    selectedPaintkit = skinOptions.find(s => s.value === $newFiltersStore.paintkitTag);
    selectedCollection = collectionOptions.find(c => c.value === $newFiltersStore.collectionIdIn);
    if (!$newFiltersStore.minFloat) $newFiltersStore.minFloat = 0.0;
    if (!$newFiltersStore.maxFloat) $newFiltersStore.maxFloat = 1.0;
    loaded = true;
  });

  let selectedWeapon, selectedPaintkit, selectedCollection;
  $: {
    if (loaded) {
      $newFiltersStore.weaponId = (selectedWeapon || {}).value;
    }
  }
  $: {
    if (loaded) {
      $newFiltersStore.paintkitTag = (selectedPaintkit || {}).value;
    }
  }
  $: {
    if (loaded) {
      $newFiltersStore.collectionIdIn = (selectedCollection || {}).value;
    }
  }

  $: weaponOptions = $knife_weapon_names
    .sort((a, b) => {
      if (a.knife_amount === b.knife_amount) {
        return a.tag > b.tag ? 1 : -1;
      }
      return a.knife_amount < b.knife_amount ? 1 : -1;
    })
    .map(w => {
      return { value: w.id, label: `${w.tag} (${w.knife_amount})` };
    });
  $: skinOptions = $knife_paintkit_tags
    .sort((a, b) => {
      if (a.knife_amount === b.knife_amount) {
        return a.label > b.label ? 1 : -1;
      }
      return a.knife_amount < b.knife_amount ? 1 : -1;
    })
    .map(s => {
      return { value: s.value, label: `${s.label} (${s.knife_amount})` };
    });
  $: collectionOptions = $collections_with_knife_amount
    .filter(c => {
      return c.knife_amount !== 0;
    })
    .sort((a, b) => {
      if (a.knife_amount === b.knife_amount) {
        return a.tag > b.tag ? 1 : -1;
      }
      return a.knife_amount < b.knife_amount ? 1 : -1;
    })
    .map(c => {
      return { value: c.id, label: `${c.tag} (${c.knife_amount})` };
    });
</script>

<style lang="scss">
  .val {
    display: flex;
    align-items: center;

    .range-field {
      width: 100%;
      margin-right: 15px;

      input[type='range'] {
        border: none;
      }

      input[type='range']::-moz-range-thumb,
      input[type='range']::-webkit-slider-thumb {
        background-color: var(--color-accent);
      }
    }

    .input-field {
      width: 65px;
      margin: 0 0 0 15px;

      input[type='number'] {
        color: var(--color-primary);

        &:focus {
          border-bottom: 1px solid var(--color-accent);
        }
      }
    }
  }

  .val .range-field {
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
</style>

<div class="knife-filter-modal">
  <div>
    <label>Knife name</label>
    <Select items={weaponOptions} bind:selectedValue={selectedWeapon} />
  </div>

  <div>
    <label>Skin name</label>
    <Select items={skinOptions} bind:selectedValue={selectedPaintkit} />
  </div>

  <div>
    <label>Found in collection</label>
    <Select items={collectionOptions} bind:selectedValue={selectedCollection} />
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
