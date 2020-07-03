<script>
  import { BackToTop, Badge, CardList, PageHeader } from '../../components/shared/';
  import { collections, get_knives_in_collection, skins } from '../../stores';
  import { goto, url } from '@sveltech/routify';
  import { KnifeCard, KnifeFilterModal } from '../../components/knives'
  import { onMount } from 'svelte';
  import { SkinCardList } from '../../components/skins/';
  import { writable } from 'svelte/store';
  export let id;

  let collection;
  let collection_skins = [];
  let collection_knives = [];
  let knivesCollapsed = false;

  const knifeSortingStore = writable({
    sortingIndex: 0,
    sortAsc: true,
    availableSorts: [
      { key: 'weapon.tag', type: 'str', name: 'Weapon name' },
      { key: 'paintkit.tag', type: 'str', name: 'Skin name' },
      { key: 'paintkit.minFloat', type: 'num', name: 'Min float' },
      { key: 'paintkit.maxFloat', type: 'num', name: 'Max float' },
      { key: 'collectionIdAmount', type: 'num', name: 'Included in x collections'}
    ],
  });
  const skinSortingStore = writable({
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

  const knifeFiltersStore = writable({});
  const skinFiltersStore = writable({});

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
    collection_knives = get_knives_in_collection(collection.id);
  };
</script>

<style>
  .collection-container {
    margin: 30px 0;
  }

  .item-header {
    display: flex;
    align-items: center;
    color: #2f2f2f;
    cursor: pointer;
  }
  .item-header i {
    margin: 0 0 0 -10px;
    font-size: 2.5rem;
    transition: transform 0.3s ease-in-out;
  }
  .item-header.collapsed i {
    transform: rotate(90deg);
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
    <CardList collapsed={knivesCollapsed} items={collection_knives} showFilter={false} sortingStore={knifeSortingStore} filtersStore={knifeFiltersStore} cardComponent={KnifeCard} cardFilterComponent={KnifeFilterModal}/>

    <h4>Skins ({collection_skins.length})</h4>
    <SkinCardList skins={collection_skins} showFilter={false} showCollection={false} sortingStore={skinSortingStore} filtersStore={skinFiltersStore} />
  {/if}
  <BackToTop />
</div>
