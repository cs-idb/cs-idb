<script>
  import { Badge, Button, Card, SkinFloat } from '../shared';
  import { goto } from '@sveltech/routify';
  export let item;
  export let showCollection = true;
</script>

<style lang="scss">
  .content {
    position: relative;

    .visit {
      position: absolute;
      right: 10px;
      cursor: pointer;
      color: var(--color-secondary);
    }

    .name {
      margin-top: 0;
      color: var(--color-primary);
    }
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

<Card on:click={$goto(`/skins/${item.id}`)}>
  <div slot="card-content" class="content">
    <span class="visit">
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
</Card>