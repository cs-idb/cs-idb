<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Button from './Button.svelte';
  import M from 'materialize-css';

  export let showModal = false;
  const dispatch = createEventDispatcher();

  onMount(() => {
    const elems = document.querySelectorAll('select.needs-materialize-select');
    M.FormSelect.init(elems);
  });

  const hideModal = () => {
    dispatch('close');
  };

  const updateFilters = () => {
    hideModal();
    dispatch('update');
  };

  const clearFilters = () => {
    dispatch('clearFilters');
  }
</script>

<style>
  .background-shadow {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    top: 0;
    left: 0;
    position: fixed;

    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out !important;
  }
  .background-shadow.show {
    opacity: 1;
    visibility: visible;
  }

  .modal-container {
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .basemodal {
    background-color: var(--color-background3);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
    padding: 20px;
    min-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @media only screen and (min-width: 600px) {
    .basemodal {
      width: 500px;
      min-width: auto;
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title .header {
    margin-top: 0px;
    text-align: center;
    width: 100%;
    color: var(--color-heading);
  }

  .title :global(button) {
    border-radius: 5px;
    padding: 0px 10px;
    background-color: var(--color-accent);
  }

  .body :global(.input-field label) {
    left: 0;
  }

  .footer {
    margin: 15px 0;
    text-align: right;
  }
</style>

<div class="background-shadow" class:show={showModal} />
{#if showModal}
  <div class="modal-container" on:click|self={hideModal}>
    <div class="basemodal">
      <div class="title">
        <h6 class="header">
          <b>Filters</b>
        </h6>
        <Button on:click={hideModal}>x</Button>
      </div>

      <div class="body">
        <slot name="modal-body" />
      </div>

      <div class="footer">
        <Button type="red lighten-1" on:click={clearFilters}>Clear</Button>
        <Button type="green lighten-1" on:click={updateFilters}>Save</Button>
      </div>
    </div>
  </div>
{/if}
