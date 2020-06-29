<script>
  import { BackToTop, PageHeader } from '../../components/shared/';
  import { KnifeCard } from '../../components/knives/';
  import { knive_skins } from '../../stores'
  import SvelteInfiniteScroll from 'svelte-infinite-scroll';

  let page = 0;
  let size = 20;
  let paginated_knives = [];
  $: paginated_knives = [...paginated_knives, ...$knive_skins.slice(size * page, size * (page + 1) - 1)];
</script>

<style>
  .knives-container {
    margin: 2rem 0;
  }
</style>

<div class="knives-container">
  <PageHeader>Knives</PageHeader>

  {#each paginated_knives as knife}
    <KnifeCard {knife} />
  {/each}
  <SvelteInfiniteScroll threshold={75} on:loadMore={() => page++} window={true} hasMore={page * size < $knive_skins.length} />
  
  <BackToTop />
</div>
