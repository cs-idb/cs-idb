<script>
  import { BackToTop, PageHeader } from '../../components/shared/';
  import { knive_skins } from '../../stores'

  $: paginated_knives = ($knive_skins || []).slice(0, 1)
</script>

<style>
  .knives-container {
    margin: 2rem 0;
  }
</style>

<div class="knives-container">
  <PageHeader>Knives</PageHeader>

  {#each paginated_knives as knife}
    <div><p>{JSON.stringify(knife)}</p></div>
  {/each}
  
  <BackToTop />
</div>
