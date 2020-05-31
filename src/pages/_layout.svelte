<script>
  import { Header, Footer } from '../components/layout/'
  import { UpdateData } from '../components/data_updating/'

  let updating_data = true
</script>

<style>
  .content {
    margin: 0 auto;
    width: 90%;
    flex: 1 0 auto;
    position: relative;
  }
</style>

{#if updating_data}
  <UpdateData on:done={() => (updating_data = false)} />
{:else}
  <Header />
  <main class="content">
    <slot />
  </main>
  <Footer />
{/if}
