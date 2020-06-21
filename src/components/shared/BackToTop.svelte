<script>
  import Button from './Button.svelte';

  const handleGotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  let windowScrollY = 0;
  $: hideTopButton = windowScrollY < 100;
</script>

<style>
  .back-to-top-wrapper {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  .back-to-top-wrapper :global(button) {
    display: flex;
    align-items: center;
  }

  .back-to-top-wrapper :global(button .icon) {
    margin-left: 5px;
  } 

  .hidden {
    display: none;
  }
</style>

<svelte:window bind:scrollY={windowScrollY}/>
<div class="back-to-top-wrapper" class:hidden={hideTopButton}>
  <Button on:click={handleGotoTop}>
    <span>Top</span>
    <span class="material-icons icon">arrow_circle_up</span>
  </Button>
</div>
