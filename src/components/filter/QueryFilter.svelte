<script>
  import M from 'materialize-css';
  import { params } from '@sveltech/routify';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Button } from '../shared/';
  import AddFilter from './AddFilter.svelte';
  import { guidGenerator } from '../../utils/';
  import { compareModes } from '../../stores/';
  const dispatch = createEventDispatcher();

  export let filter_options = [];
  let active_filters = [];

  let modal;
  onMount(() => {
    loadQuery();
    const elem = document.querySelector('.modal');
    M.Modal.init(elem);
    modal = M.Modal.getInstance(elem);
  });

  const loadQuery = function () {
    let filters_param = $params['f'];
    if (!filters_param) {
      return;
    }

    if (filters_param[filters_param.length - 1] === ';') {
      filters_param = filters_param.slice(0, -1);
    }

    const filters = filters_param.split(';');
    filters.forEach(filter => {
      const split_filter = filter.split(':');
      const url_name = split_filter[0];
      const compare_mode_shortName = split_filter[1];
      const filter_value = split_filter[2];

      const compareMode = $compareModes.find(c => c.shortName === compare_mode_shortName);
      addFilter(url_name, compareMode, filter_value);
    });

    dispatch('setFilters', active_filters);
  };

  const addFilter = function (urlName, compareMode, val) {
    const { url_name, display_name, key, type } = filter_options.find(f => f.url_name === urlName);

    const new_filter = {
      id: guidGenerator(),
      column: { url_name, display_name, key, type },
      compare_mode: compareMode,
      value: val,
    };
    active_filters = [...active_filters, new_filter];
  };

  const saveFilter = function () {
    modal.close();
    dispatch('setFilters', active_filters);
    setUrl();
  };

  const removeFilter = function (id) {
    active_filters = active_filters.filter(af => af.id !== id);
  };

  const setUrl = function () {
    let filters = '?f=';
    active_filters.forEach(filter => {
      filters += `${filter.column.url_name}:${filter.compare_mode.shortName}:${filter.value};`;
    });
    window.history.replaceState({}, '', filters);
  };
</script>

<style>
  .filter {
    display: inline-block;
  }

  .divider {
    margin: 20px 0;
  }

  #filter-modal {
    width: 75%;
    height: 75%;
  }

  #filter-modal .filter {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .modal-content h4 {
    display: inline-block;
  }
</style>

<div class="filter">
  <Button dataTarget={'filter-modal'}>Filters ({active_filters.length})</Button>

  <div id="filter-modal" class="modal">
    <div class="modal-content">
      <h4>Active filters</h4>
      <div class="right">
        <Button on:click={() => modal.close()}>Close</Button>
      </div>

      <div class="divider" />

      <div class="filter-list">
        <div class="filter row">
          <div class="col s3">
            <b>Column name</b>
          </div>
          <div class="col s3">
            <b>Comparison</b>
          </div>
          <div class="col s3">
            <b>Value</b>
          </div>
          <div class="col s3" />
        </div>
        {#each active_filters as filter}
          <div class="filter row">
            <div class="col s3">{filter.column.display_name}</div>
            <div class="col s3">{filter.compare_mode.longName}</div>
            <div class="col s3">{filter.value}</div>
            <div class="col s3">
              <Button on:click={() => removeFilter(filter.id)}>x</Button>
            </div>
          </div>
        {:else}
          <div class="row">
            <p class="col s12">There are no active filters...</p>
          </div>
        {/each}
      </div>

      <div class="divider" />

      <AddFilter {filter_options} on:addFilter={e => addFilter(e.detail.column, e.detail.compare_mode, e.detail.value)} />

    </div>
    <div class="modal-footer">
      <Button on:click={() => saveFilter()}>Save</Button>
    </div>
  </div>
</div>
