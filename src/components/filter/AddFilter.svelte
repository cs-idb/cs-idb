<script>
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import { Button } from '../shared/';
  import CompareModeSelect from './CompareModeSelect.svelte';
  import M from 'materialize-css';
  export let filter_options;

  const dispatch = createEventDispatcher();

  let new_filter = {
    column: undefined,
    compare_mode: undefined,
    value: undefined,
  };
  let new_filter_type = undefined;
  let selectOptions = [];

  let columnSelectEl;
  let newFilterValueError = undefined;

  onMount(() => {
    initMatSelects();
    columnSelectEl = document.getElementById('column-select');
  });

  const initMatSelects = function () {
    const elems = document.querySelectorAll('.mat-select');
    M.FormSelect.init(elems);
    elems.forEach(el => {
      el.classList.remove('mat-select');
    });
  };

  const setColumnName = async function () {
    new_filter.compare_mode = undefined;
    new_filter.value = undefined;
    new_filter_type = undefined;

    await tick();
    const filter_option = filter_options.find(fo => fo.url_name === new_filter.column);
    new_filter_type = filter_option.type;
  };

  const setCompareMode = async function (e) {
    new_filter.compare_mode = e.detail;
    const current_filter = filter_options.find(f => f.url_name === new_filter.column);
    if (current_filter && current_filter.type === 'select') {
      selectOptions = current_filter.options;
      await tick();
      initMatSelects();
    }
  };

  const resetSelectEl = function () {
    const inputEl = columnSelectEl.parentElement.querySelector('input.select-dropdown');

    columnSelectEl.selectedIndex = 0;
    inputEl.value = 'Choose your option';
  };

  const addFilter = function () {
    if (new_filter_type === 'text' && new_filter.value.includes(':')) {
      newFilterValueError = "You can't use a (semi)colon in the filter value";
      return;
    }

    dispatch('addFilter', new_filter);
    new_filter = {
      column: undefined,
      compare_mode: undefined,
      value: undefined,
    };
    newFilterValueError = undefined;
    resetSelectEl();
  };
</script>

<style>
  .values {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .values .input-field {
    margin-right: 20px;
  }

  .error {
    font-weight: bold;
    margin: 20px 0;
  }
</style>

<div class="add-filter">
  <h5>Add a filter</h5>
  {#if newFilterValueError}
    <p class="error red-text text-lighten-2">{newFilterValueError}</p>
  {/if}

  <div class="values">
    <div class="input-field">
      <select class="mat-select" id="column-select" bind:value={new_filter.column} on:change={setColumnName}>
        <option value="" disabled selected>Choose your option</option>
        {#each filter_options as filter_option (filter_option.url_name)}
          <option value={filter_option.url_name}>{filter_option.display_name}</option>
        {/each}
      </select>
      <label>Column</label>
    </div>

    {#if new_filter_type}
      <CompareModeSelect type={new_filter_type} on:change={setCompareMode} />
    {/if}

    {#if new_filter.compare_mode}
      <div class="input-field">
        {#if new_filter_type === 'text'}
          <input type="text" bind:value={new_filter.value} />
        {:else if new_filter_type === 'number'}
          <input type="number" bind:value={new_filter.value} min="0" max="1" />
        {:else if new_filter_type === 'select'}
          <select class="mat-select" bind:value={new_filter.value}>
            <option value="" disabled selected>Choose your option</option>
            {#each selectOptions as opt}
              <option value={opt}>{opt}</option>
            {/each}
          </select>
        {:else}
          <p>I don't know what {new_filter_type} is...</p>
        {/if}
        <label>Value</label>
      </div>
    {/if}

    {#if new_filter.value !== undefined}
      <Button on:click={addFilter}>+</Button>
    {/if}
  </div>
</div>
