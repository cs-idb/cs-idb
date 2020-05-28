<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let dataTarget
  export let type = 'primary'
  export let flat = false
  export let inverse = false
</script>

<button
  data-target={dataTarget}
  class:modal-trigger={dataTarget}
  class:flat={flat}
  class:inverse={inverse}
  class="waves-effect waves-light btn red lighten-2 {type}" 
  on:click={() => dispatch('click')}>
  <slot />
</button>

<style>
</style>
