<script>
  import { Badge, Card } from '../shared';
  import { goto } from '@sveltech/routify';
  export let item;
</script>

<style lang="scss">
  .content {
    padding: 0;
    position: relative;
  }
  .visit {
    position: absolute;
    right: 0;
    color: var(--color-secondary);
  }

  .img {
    display: flex;
    justify-content: center;

    img {
      width: 150px;
      height: auto;
    }
  }

  .txt-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: max-content;
    margin: 20px auto;

    .name {
      max-width: 100%;
      margin: 0;
      text-align: center;
      color: var(--color-primary);
    }

    .released {
      color: var(--color-secondary);
    }
  }

  .badges-container {
    display: flex;
    justify-content: center;

    :global(span) {
      margin-right: 5px;
    }
  }

  :global(.collections-container .card) {
    min-height: 155px !important;
  }

  :global(.collections-container .card-action) {
    padding: 0 !important;
  }
</style>

<Card on:click={$goto(`/collections/${item.id}`)}>
  <div slot="card-content" class="content">
    <span class="visit">
      <i class="material-icons">visibility</i>
    </span>
    <div class="img">
      <img src={`/img/collections/${item.name.replace('CSGO_', '')}.png`} alt="set community 1 logo">
    </div>
    <div class="txt-container">
      <h6 class="name">{item.tag}</h6>
      <p class="released">Release date: {item.released.toLocaleDateString()}</p>
    </div>
    <div class="badges-container">
      {#if item.stattrak}
        <Badge classes="orange">StatTrak™ available</Badge>
      {/if}
      {#if item.souvenir}
        <Badge classes="yellow accent-4">Souvenir available</Badge>
      {/if}
      {#if item.case}
        <Badge classes="blue">Case available</Badge>
      {/if}
    </div>
  </div>
</Card>
