<script>
  import { Badge, Button, SkinFloat } from '../shared';
  import { goto } from '@sveltech/routify';
  export let item;
  export let showCollection = true;
</script>

<style>
  .skin-card {
    border: 1px solid #00000030;
    padding: 10px;
    width: 300px;
    margin: 0 10px 10px 0;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    transition: background-color 0.1s ease-in-out;
    position: relative;
    background-color: var(--color-background3);
  }
  .skin-card:hover {
    background-color: var(--color-foreground);
  }

  .skin-card .visit {
    position: absolute;
    right: 10px;
    cursor: pointer;
    color: var(--color-secondary);
  }

  .skin-card .name {
    margin-top: 0;
    color: var(--color-primary);
  }

  .name {
    margin-top: 0;
  }

  .badges {
    margin-bottom: 10px;
  }

  .img-container {
    width: 100%;
    min-height: 215px;
  }

  .img-container img {
    width: 100%;
  }
</style>

<div class="skin-card">
  <span class="visit" on:click={$goto(`/skins/${item.id}`)}>
    <i class="material-icons">visibility</i>
  </span>
  <h6 class="name">
    <b>{item.weapon.tag} | {item.paintkit.tag}</b>
  </h6>
  <div class="badges">
    {#if (item.collection || {}).stattrak}
      <Badge classes="orange">StatTrak™</Badge>
    {/if}
    {#if (item.collection || {}).souvenir}
      <Badge classes="orange">Souvenir</Badge>
    {/if}
    <Badge style={`background-color: ${item.rarity.color};`}>{item.rarity.tag} {item.weapon.type}</Badge>
  </div>
  <div class="img-container" style={`background: radial-gradient(circle, ${item.rarity.color}b3 0%, #00000080 100%);`}>
    <img
      loading="lazy"
      src={`https://steamcdn-a.akamaihd.net/apps/730/icons/econ/${item.image}`}
      alt={`An image of ${item.weapon.tag} | ${item.paintkit.tag}`} />
  </div>
  {#if item.collection && showCollection}
    <Button
      style="width: 100%; margin-top: 10px; display: flex; flex-direction: column; height: 50px; padding: 0; align-items: center;"
      type="blue"
      on:click={$goto(`/collections/${item.collection.id}`)}>
      <span class="tag" style="font-size: 11px;">{item.collection.tag}</span>
      <span class="released" style="font-size: 10px; margin-top: -20px; color: #403d3d; text-transform: none;">
        Released: {item.collection.released}
      </span>
    </Button>
  {/if}
  <SkinFloat style="margin-top: 10px;" min={item.paintkit.minFloat} max={item.paintkit.maxFloat} />
</div>
