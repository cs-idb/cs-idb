<script>
  export let classes = '';
  export let style = '';
</script>

<style>
  .badge-c {
    font-weight: 300;
    font-size: 0.8rem;
    border-radius: 2px;

    min-width: 3rem;
    padding: 0 6px;
    text-align: center;
    line-height: 22px;
    height: 22px;
    display: inline-block;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
</style>

<span class={`badge-c ${classes}`} {style}>
  <slot />
</span>
