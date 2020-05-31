<script>
  import M from "materialize-css";
  import { onMount } from "svelte";
  import { fetchChecksums } from "../../dal/";
  import { Spinner } from "../shared";
  import { fetchDataByNames } from "../../dal";
  import { createEventDispatcher } from "svelte";
  import localforage from 'localforage'

  const dispatch = createEventDispatcher();

  const TOAST_DISPLAY_TIME = 1000;

  let updating_data = true;

  onMount(async () => {
    const localCheckSums = await localforage.getItem('checksums') !== null;
    if (localCheckSums) {
      updating_data = false;
      dispatch("done");
      showCheckUpdatesToast()
    }
    fetchData();
  });

  const fetchData = () => {
    fetchChecksums()
      .then(fetchChecksumsres => {
        fetchDataByNames(fetchChecksumsres);
      })
      .then(() => {
        showUpdatedSuccesfulToast()
        updating_data = false;
        dispatch("done");
      })
      .catch(() => {
        showUpdateErrorToast()
      });
  };

  const showCheckUpdatesToast = () => {
    M.toast({
      html:
        '<span class="material-icons mr-15 rotate-anim">hourglass_empty</span>Checking for updates...',
      displayLength: Infinity,
      classes: "update-check-toast"
    });
  }
  const showUpdatedSuccesfulToast = () => {
    if (!updating_data) {
      setTimeout(() => {
        M.Toast.dismissAll();
        M.toast({
          html:
            "<span class='material-icons mr-15'>thumb_up</span>Successfully updated!",
          displayLength: TOAST_DISPLAY_TIME
        });
      }, TOAST_DISPLAY_TIME);
    }
  }
  const showUpdateErrorToast = () => {
    setTimeout(() => {
      M.Toast.dismissAll();
      M.toast({
        html:
          "<span class='material-icons mr-15'>error</span>Something went wrong while fetching the data...",
        displayLength: TOAST_DISPLAY_TIME * 5
      });
    }, TOAST_DISPLAY_TIME);
  }
</script>

{#if updating_data}
  <div class="update">
    <Spinner />
  </div>
{/if}
