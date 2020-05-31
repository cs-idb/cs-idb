<script>
  export let error
</script>

<style>
  .error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .error span {
    font-size: 100px;
  }

  .error h3 {
    margin: 0;
  }

  .error p {
    margin: 20px;
  }

  .error button {
    cursor: pointer;
  }
</style>

<div class="error">
  <span class="material-icons red-text text-darken-1">error</span>
  <h3 class="red-text text-darken-1">Something went wrong!</h3>
  <p class="red-text text-darken-1">{error}</p>

  <button class="btn red darken-1" on:click={() => location.reload()}>Refresh page</button>
</div>
