<script>
  import { Badge, Card } from '../shared';
  import { goto } from '@sveltech/routify';
  export let item;
</script>

<style>
  .content {
    padding: 0;
    position: relative;
  }
  .visit {
    cursor: pointer;
    position: absolute;
    right: 0;
  }
  .name {
    max-width: 220px;
    height: 40px;
  }

  :global(.collections-container .card) {
    min-height: 155px !important;
  }

  :global(.collections-container .card-action) {
    padding: 0 !important;
  }
</style>

<Card>
  <div slot="card-content" class="content">
    <span class="visit" on:click={$goto(`/collections/${item.id}`)}>
      <i class="material-icons">visibility</i>
    </span>
    <h6 class="name">{item.tag}</h6>
    <p>Released date: {item.released.toLocaleDateString()}</p>
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
</Card>