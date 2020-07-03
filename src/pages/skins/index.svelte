<script>
  import { BackToTop, CardList, PageHeader } from '../../components/shared/';
  import { SkinCard, SkinFilterModal } from '../../components/skins/';
  import { skins } from '../../stores';
  import { writable } from 'svelte/store';

  const sortingStore = writable({
    sortingIndex: 2,
    sortAsc: false,
    availableSorts: [
      { key: 'weapon.tag', type: 'str', name: 'Weapon name' },
      { key: 'paintkit.tag', type: 'str', name: 'Skin name' },
      { key: 'rarity.id', type: 'num', name: 'Rarity' },
      { key: 'collection.tag', type: 'str', name: 'Collection name' },
      { key: 'collection.released', type: 'dte', name: 'Collection release date' },
      { key: 'paintkit.minFloat', type: 'num', name: 'Min float' },
      { key: 'paintkit.maxFloat', type: 'num', name: 'Max float' },
    ],
  });
  const filtersStore = writable({});
</script>

<style>
  .skins-container {
    margin: 2rem 0;
  }
</style>

<div class="skins-container">
  <PageHeader>Skins</PageHeader>

  <CardList items={$skins} {sortingStore} {filtersStore} cardComponent={SkinCard} cardFilterComponent={SkinFilterModal} />
  <BackToTop />
</div>
