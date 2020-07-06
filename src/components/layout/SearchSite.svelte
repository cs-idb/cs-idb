<script>
  import { collections, knive_skins, skins } from '../../stores';
  import { goto, url } from '@sveltech/routify';
  import { createEventDispatcher } from 'svelte';

  export let mobile = undefined;

  const dispatch = createEventDispatcher();

  let search_value = '';
  $: show_results = search_value.length >= 1;
  $: search_value_lower = search_value.toLowerCase();

  $: filteredCollections = $collections
    .filter(c => c.tag.toLowerCase().includes(search_value_lower))
    .map(c => {
      return { id: c.id, name: c.tag };
    });

  $: filteredSkins = $skins
    .filter(
      s =>
        s.paintkit.tag.toLowerCase().includes(search_value_lower) ||
        s.weapon.tag.toLowerCase().includes(search_value_lower) ||
        (s.weapon.tag + ' ' + s.paintkit.tag).toLowerCase().includes(search_value_lower)
    )
    .map(s => {
      return { id: s.id, name: s.paintkit.tag, weapon_name: s.weapon.tag };
    });

  $: filteredKnives = $knive_skins
    .filter(
      k =>
        k.weapon.tag.toLowerCase().includes(search_value_lower) ||
        ((k.paintkit || {}).tag || '').toLowerCase().includes(search_value_lower) ||
        (k.weapon.tag + ' ' + ((k.paintkit || {}).tag || '')).toLowerCase().includes(search_value_lower)
    )
    .map(k => {
      return { id: k.id, skin_tag: (k.paintkit || {}).tag, knife_tag: k.weapon.tag };
    });

  const clickResult = url => {
    search_value = '';
    dispatch('closeSideNav');
    $goto($url(url, {}, false, true));
  };

  const handleMoveFocus = e => {
    if (!(e.keyCode === 13 || e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 40)) return;

    if (e.keyCode === 27) {
      search_value = '';
      return;
    }

    const searchResultsEl = document.querySelector('#search-results');

    if (searchResultsEl === null) return;

    let currentSelectedEl = searchResultsEl.querySelector('li.active');
    if (!currentSelectedEl) {
      const firstEl = searchResultsEl.querySelector('li.move');
      firstEl.classList.add('active');
      return;
    }

    if (e.keyCode === 13) {
      currentSelectedEl.click();
    }

    if (e.keyCode === 38) {
      let previousResult = currentSelectedEl.previousElementSibling;
      if (previousResult.classList.contains('title')) {
        previousResult = previousResult.previousElementSibling;
      }

      if (previousResult !== null) {
        searchResultsEl.scrollTop -= previousResult.clientHeight;
        currentSelectedEl.classList.remove('active');
        previousResult.classList.add('active');
      }
    }

    if (e.keyCode === 40) {
      let nextResult = currentSelectedEl.nextElementSibling;

      if (!nextResult) return;

      if (nextResult.classList.contains('title')) {
        nextResult = nextResult.nextElementSibling;
      }

      currentSelectedEl.classList.remove('active');
      nextResult.classList.add('active');
      searchResultsEl.scrollTop += nextResult.clientHeight;
    }
  };
</script>

<style lang="scss">
  #search-box {
    display: flex;
    align-items: center;
    height: inherit;
    padding-top: 5px;

    input {
      border: 2px solid var(--color-background);
      border-right: none;
      border-radius: 5px 0 0 5px;
      padding-left: 10px;
      margin: 0;
      color: white;

      &:focus {
        box-shadow: none;
        border: 2px solid var(--color-primary);
        border-right: none;
      }

      &:focus + button {
        box-shadow: none;
        border: 2px solid var(--color-primary) !important;
        border-left: none !important;
      }
    }

    button {
      background: none;
      border: 2px solid var(--color-background) !important;
      border-left: none !important;
      display: flex;
      align-items: center;
      border: none;
      height: calc(3rem + 4px);
      border-radius: 0 5px 5px 0;
      padding: 0px 10px;

      i {
        color: white !important;
      }
    }
  }

  #search-box.mobile {
    margin: 5px 10px;
    width: 225px;

    input {
      border: 2px solid var(--color-primary);
      border-right: none;
      color: var(--color-primary);

      &::placeholder {
        color: var(--color-primary);
      }

      &:focus {
        box-shadow: none;
        border: 2px solid var(--color-accent);
        border-right: none;
      }

      &:focus + button {
        box-shadow: none;
        border: 2px solid var(--color-accent) !important;
        border-left: none !important;
      }
    }

    button {
      border: 2px solid var(--color-primary) !important;
      border-left: none !important;
      height: calc(3rem + 4px);

      i {
        color: var(--color-primary) !important;
      }
    }
  }

  #search-results {
    background: grey;
    display: grid;
    max-height: 500px;
    overflow: auto;
    position: absolute;
    z-index: 2;
    width: 100%;
    line-height: normal;
    right: 5px;
    margin-top: 5px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);
  }

  #search-results .title {
    background-color: #393939;
    padding: 10px 5px;
  }

  #search-results li b {
    margin: 0;
    padding: 0;
  }

  #search-results li p {
    margin: 0;
    padding: 5px 10px;
    cursor: pointer;
  }

  #search-results li p:hover {
    background: #5b5b5b;
  }

  #search-results.mobile {
    left: 10px;
    width: calc(100% - 20px);
    color: white;
  }
</style>

<div id="search-box" class:mobile>
  <input 
    type="text" 
    placeholder="Search" 
    bind:value={search_value} 
    on:keydown={handleMoveFocus} />
  <button>
    <i class="material-icons prefix">search</i>
  </button>
</div>

{#if show_results}
  <ul id="search-results" class:mobile>
    {#if filteredCollections.length !== 0}
      <li class="title">
        <b>Collections: ({filteredCollections.length})</b>
      </li>
      {#each filteredCollections as collection}
        <li class="move" on:click={() => clickResult(`/collections/${collection.id}`)}>
          <p>{collection.name}</p>
        </li>
      {/each}
    {/if}

    {#if filteredSkins.length !== 0}
      <li class="title">
        <b>Skins: ({filteredSkins.length})</b>
      </li>
      {#each filteredSkins as skin}
        <li class="move" on:click={() => clickResult(`/skins/${skin.id}`)}>
          <p>{skin.weapon_name} | {skin.name}</p>
        </li>
      {/each}
    {/if}

    {#if filteredKnives.length !== 0}
      <li class="title">
        <b>Knives: ({filteredKnives.length})</b>
      </li>
      {#each filteredKnives as knife}
        <li class="move" on:click={() => clickResult(`/knives/${knife.id}`)}>
          <p>
            ★ {knife.knife_tag}
            {#if knife.skin_tag}| {knife.skin_tag}{/if}
          </p>
        </li>
      {/each}
    {/if}
  </ul>
{/if}
