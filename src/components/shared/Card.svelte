<script>
  import { fade, fly } from 'svelte/transition';
  export let bgColor = '';
  export let flat = false;
</script>

<style class="scss">
  .card {
    width: 300px;
    max-width: 300px;
    border: 1px solid var(--color-foreground);
    min-height: 200px;
    margin: 10px 0 0 10px;
    display: inline-flex;
    flex-direction: column;
    background-color: var(--color-background3);
  }

  .card:hover {
    box-shadow: 0 0px 1px 0px var(--color-secondary) !important;
  }

  .card .card-content {
    flex: 1;
  }

  .card.flat {
    border: none;
    min-height: 0;
  }

  @media screen and (max-width: 710px) {
    .card {
      min-width: calc(100% - 20px);
      width: auto;
    }
  }
</style>

{#if false}
  <slot />
{/if}
<div
  class="card hoverable"
  class:flat
  style={`background-color: ${bgColor};`}
  in:fly={{ x: 300, duration: 150 }}
  out:fade={{ delay: 0, duration: 150 }}>
  <div class="card-content">
    <slot name="card-content" />
  </div>
  <div class="action">
    <slot name="card-action" />
  </div>
</div>
