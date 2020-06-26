<script>
  import { fetchData, isDataLoadedLocally, isSessionDataSet, setSessionDataLoaded } from '../../dal';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { Spinner } from '../shared';

  const dispatch = createEventDispatcher();
  let updating_data = true;

  onMount(async () => {
    const dataIsLoadedLocally = await isDataLoadedLocally();
    const sessionDataIsSet = isSessionDataSet();

    if (dataIsLoadedLocally === true) {
      updating_data = false;
      dispatch('done');

      if (sessionDataIsSet === true) return;
    }

    await fetchData();
    if (sessionDataIsSet === false) {
      updating_data = false;
      dispatch('done');
      setSessionDataLoaded();
    }
  });
</script>

{#if updating_data}
  <div class="update">
    <Spinner />
  </div>
{/if}
