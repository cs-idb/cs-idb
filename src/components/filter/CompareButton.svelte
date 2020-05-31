<script>
  import { Button } from '../shared/'
  import { createEventDispatcher } from 'svelte'
  export let type = 'text'
  export let current = 'equals'
  const dispatch = createEventDispatcher()

  const switchMode = function () {
    switch (type) {
      case 'text': {
        if (current === 'equals') {
          current = 'includes'
        } else if (current === 'includes') {
          current = 'does not include'
        } else if (current === 'does not include') {
          current = 'does not equal'
        } else {
          current = 'equals'
        }

        break
      }
      case 'number': {
        break
      }
      case 'boolean': {
        break
      }
    }

    dispatch('updateMode', current)
  }
</script>

<style>

</style>

<Button on:click={() => switchMode()}>{current}</Button>
