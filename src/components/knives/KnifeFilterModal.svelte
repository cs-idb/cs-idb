<script>
  import { collections, knife_paintkit_tags, knife_weapon_names } from '../../stores';
  import Select from 'svelte-select';

  export let newFiltersStore;

  $: weaponOptions = $knife_weapon_names
    .sort((a, b) => {
      return a.tag > b.tag ? 1 : -1;
    })
    .map(w => {
      return { value: w.id, label: w.tag };
    });
  $: skinOptions = $knife_paintkit_tags
    .sort((a, b) => {
      return a > b ? 1 : -1
    })
    .map(s => {
      return { value: s, label: s }
    });
  $: collectionOptions = $collections
    .sort((a, b) => {
      return a.tag > b.tag ? 1 : -1;
    })
    .map(c => {
      return { value: c.id, label: c.tag };
    });
</script>

<style>
  .val {
    display: flex;
    align-items: center;
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
    <Select items={weaponOptions} bind:selectedValue={$newFiltersStore.selectedWeapon} />
  </div>

  <div>
    <label>Skin name</label>
    <Select items={skinOptions} bind:selectedValue={$newFiltersStore.selectedSkin} />
  </div>

  <div>
    <label>Found in collection</label>
    <Select items={collectionOptions} bind:selectedValue={$newFiltersStore.selectedCollection} />
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