<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let dataTarget = undefined;
  export let type = 'primary';
  export let style = '';
</script>

<style>

</style>

<button
  data-target={dataTarget}
  class:modal-trigger={dataTarget}
  class="waves-effect waves-light btn {type}"
  on:click|stopPropagation={() => dispatch('click')}
  {style}>
  <slot />
</button>
