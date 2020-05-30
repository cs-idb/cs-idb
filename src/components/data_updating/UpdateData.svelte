<script>
  import M from "materialize-css";
  import { onMount } from "svelte";
  import { fetchChecksums } from "../../dal/";
  import { Spinner } from "../shared";
  import { fetchDataByNames } from "../../dal";
  import { createEventDispatcher } from "svelte";
  import { raw_checksums } from "../../stores/"

  const dispatch = createEventDispatcher();

  const TOAST_DISPLAY_TIME = 1000;

  let updating_data = true;
  let data_exists_locally = $raw_checksums !== null;

  onMount(async () => {
    if (data_exists_locally) {
      showLocalDataToast();
    }
    fetchData();
  });

  const showLocalDataToast = () => {
    updating_data = false;
    dispatch("done");
    M.toast({
      html:
        '<span class="material-icons mr-15 rotate-anim">hourglass_empty</span>Checking for updates...',
      displayLength: Infinity,
      classes: "update-check-toast"
    });
  };

  const fetchData = () => {
    fetchChecksums()
      .then(fetchChecksumsres => {
        fetchDataByNames(fetchChecksumsres);
      })
      .then(() => {
        updating_data = false;
        dispatch("done");

        setTimeout(() => {
          M.Toast.dismissAll();
          M.toast({
            html:
              "<span class='material-icons mr-15'>thumb_up</span>Successfully updated!",
            displayLength: TOAST_DISPLAY_TIME
          });
        }, TOAST_DISPLAY_TIME);
      })
      .catch(() => {
        setTimeout(() => {
          M.Toast.dismissAll();
          M.toast({
            html:
              "<span class='material-icons mr-15'>error</span>Something went wrong while fetching the data...",
            displayLength: TOAST_DISPLAY_TIME * 5
          });
        }, TOAST_DISPLAY_TIME);
      });
  };
</script>

{#if updating_data}
  <div class="update">
    <Spinner />
  </div>
{/if}
