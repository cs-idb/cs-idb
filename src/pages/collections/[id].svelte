<script>
  import { goto, url } from '@sveltech/routify';
  import { Badge, PageHeader } from '../../components/shared/';
  import { SkinCardList } from '../../components/skins/';
  import { collections, skins } from '../../stores';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  export let id;

  let collection;
  let collection_skins = [];

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

    <br />
    <h4>Skins</h4>

    <SkinCardList skins={collection_skins} showFilter={false} showCollection={false} {sortingStore} {filtersStore} />
  {/if}
</div>
