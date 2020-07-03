<script>
  import { BackToTop, CardList, PageHeader } from '../../components/shared/';
  import { KnifeCard, KnifeFilterModal } from '../../components/knives';
  import { knive_skins } from '../../stores';
  import { writable } from 'svelte/store';

  const sortingStore = writable({
    sortingIndex: 0,
    sortAsc: true,
    availableSorts: [
      { key: 'weapon.tag', type: 'str', name: 'Weapon name' },
      { key: 'paintkit.tag', type: 'str', name: 'Skin name' },
      { key: 'paintkit.minFloat', type: 'num', name: 'Min float' },
      { key: 'paintkit.maxFloat', type: 'num', name: 'Max float' },
      { key: 'collectionIdAmount', type: 'num', name: 'Included in x collections' },
    ],
  });
  const filtersStore = writable({});
</script>

<style>
  .knives-container {
    margin: 2rem 0;
  }
</style>

<div class="knives-container">
  <PageHeader>Knives</PageHeader>
  <CardList items={$knive_skins} {sortingStore} {filtersStore} cardComponent={KnifeCard} cardFilterComponent={KnifeFilterModal} />
  <BackToTop />
</div>
