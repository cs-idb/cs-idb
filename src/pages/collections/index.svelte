<script>
  import { CardList } from '../../components/shared';
  import { CollectionCard } from '../../components/collections';
  import { collections } from '../../stores';
  import { PageHeader } from '../../components/shared/';
  import { writable } from 'svelte/store';

  const sortingStore = writable({
    sortingIndex: 4,
    sortAsc: false,
    availableSorts: [
      { key: 'name', type: 'str', name: 'Name' },
      { key: 'case', type: 'str', name: 'Case available' },
      { key: 'stattrak', type: 'bol', name: 'StatTrak available' },
      { key: 'souvenir', type: 'bol', name: 'Souvenir available' },
      { key: 'released', type: 'dte', name: 'Release date'}
    ],
  });
</script>

<style>
  .collections-container {
    margin: 2rem 0;
  }
</style>

<div class="collections-container">
  <PageHeader>Collections</PageHeader>
  <CardList items={$collections} {sortingStore} showFilter={false} cardComponent={CollectionCard} />
</div>
