<script>
  import { onMount } from 'svelte'
  import { fetchChecksums } from '../../dal/'
  import { Spinner } from '../shared'
  import { fetchDataByNames } from '../../dal'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  let updating_data = true

  onMount(async () => {
    const fetchChecksumsres = await fetchChecksums()
    await fetchDataByNames(fetchChecksumsres)
    updating_data = false
    dispatch('done')
  })
</script>

{#if updating_data}
  <div class="update">
    <Spinner />
  </div> 
{/if}


