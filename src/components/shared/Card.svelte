<script>
  import { fade, fly } from 'svelte/transition'
  export let bgColor = ''
  export let flat = false
</script>

<style>
  .card {
    width: 300px;
    max-width: 300px;
    border: 1px solid lightgrey;
    min-height: 200px;
    margin: 10px 0 0 10px;
    display: inline-flex;
    flex-direction: column;
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

<div
  class="card hoverable"
  class:flat
  style={`background-color: ${bgColor};`}
  in:fly={{ x: 300, duration: 150 }}
  out:fade={{ delay: 0, duration: 150 }}>
  <div class="card-content">
    <slot name="card-content" />
  </div>
  <div class="card-action">
    <slot name="card-action" />
  </div>
</div>
