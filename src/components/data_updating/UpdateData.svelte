<script>
  import M from 'materialize-css'
  import { onMount } from 'svelte'
  import { fetchChecksums } from '../../dal/'
  import { Spinner } from '../shared'
  import { fetchDataByNames } from '../../dal'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let updating_data = true
  let data_exists_locally = localStorage.getItem('csdb/checksums') !== null

  onMount(async () => {
    if (data_exists_locally) {
      M.toast({html: '<span class="material-icons rotate-anim">hourglass_empty</span>Checking for updates...', displayLength: Infinity})
      updating_data = false
      dispatch('done')
    } 

    const fetchChecksumsres = await fetchChecksums()
    await fetchDataByNames(fetchChecksumsres)
    updating_data = false
    dispatch('done')
    M.Toast.dismissAll();
    M.toast({html: 'Successfully updated!'})
  })
</script>

{#if updating_data}
  <div class="update">
    <Spinner />
  </div> 
{/if}