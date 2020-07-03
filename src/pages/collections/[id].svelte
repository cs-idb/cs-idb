<script>
  import { Badge, PageHeader } from '../../components/shared/';
  import { collections, skins } from '../../stores';
  import { goto, url } from '@sveltech/routify';
  import { KnifeCard } from '../../components/knives'
  import { onMount } from 'svelte';
  import { SkinCard } from '../../components/skins/';
  import { writable } from 'svelte/store';
  export let id;

  let collection;
  let collection_skins = [];
  let collection_knives = [];
  let knivesCollapsed = false;
  let skinsCollapsed = false;

  const sortingStore = writable({
    sortingIndex: 2,
    sortAsc: false,
    availableSorts: [
      { key: 'weapon.tag', type: 'str', name: 'Weapon name' },
      { key: 'paintkit.tag', type: 'str', name: 'Skin name' },
      { key: 'rarity.id', type: 'num', name: 'Rarity' },
      { key: 'paintkit.minFloat', type: 'num', name: 'Min float' },
      { key: 'paintkit.maxFloat', type: 'num', name: 'Max float' },
    ],
  });
  const filtersStore = writable({});

  $: {
    loadCollection(id);
  }

  onMount(() => {
    loadCollection();
  });

  const loadCollection = () => {
    collection = $collections.find(c => Number(c.id) === Number(id));

    if (!collection) {
      return $goto($url('/collections'));
    }

    collection_skins = $skins.filter(s => Number((s.collection || {}).id) === Number(id));
  };
</script>

<style>
  .collection-container {
    margin: 30px 0;
  }
</style>

<div class="collection-container">
  <PageHeader>{collection ? collection.tag : 'Loading collection...'}</PageHeader>

  {#if collection}
    <div class="badges">
      <Badge classes="blue lighten-2">Released: {collection.released.toLocaleDateString()}</Badge>
      <Badge classes="blue">
        Case:
        <b>{collection.case ? 'Yes' : 'No'}</b>
      </Badge>
      <Badge classes="orange">
        StatTrak™:
        <b>{collection.stattrak ? 'Yes' : 'No'}</b>
      </Badge>
      <Badge classes="yellow accent-2">
        Souvenir:
        <b>{collection.souvenir ? 'Yes' : 'No'}</b>
      </Badge>
    </div>

    <br>
    <h4 
      on:click={() => knivesCollapsed = !knivesCollapsed}
      class="item-header"
      class:collapsed={knivesCollapsed}
    >
      <i class="material-icons">expand_more</i>
      Knives ({collection_knives.length})
    </h4>
    <CardList collapsed={knivesCollapsed} items={collection_knives} showFilter={false} sortingStore={knifeSortingStore} filtersStore={knifeFiltersStore} cardComponent={KnifeCard} />

    <h4
      on:click={() => skinsCollapsed = !skinsCollapsed}
      class="item-header"
      class:collapsed={skinsCollapsed}
    > 
      <i class="material-icons">expand_more</i>
      Skins ({collection_skins.length})
    </h4>
    <CardList collapsed={skinsCollapsed} items={collection_skins} showFilter={false} sortingStore={skinSortingStore} filtersStore={skinFiltersStore} cardComponent={SkinCard} />
  {/if}
</div>
