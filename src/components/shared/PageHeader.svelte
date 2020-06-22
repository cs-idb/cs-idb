<script>
  import Button from './Button.svelte';

  const handleGoBack = () => {
    window.history.go(-1);
  };
</script>

<style>
  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
    display: flex;
    align-items: center;
  }

  :global(.heading span i) {
    font-size: 40px;
    margin: 0 10px 0 0;
  }
</style>

<h3 class="heading">
  <Button on:click={handleGoBack}>&lt;</Button>
  <span class="grey-text text-darken-2">
    <slot />
  </span>
</h3>
