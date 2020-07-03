<script>
  import { Card, SkinFloat } from '../shared';
  import { goto } from '@sveltech/routify';
  export let item;

  let name = '';
  $: {
    if (item.paintkit) {
      name = '★ ' + item.weapon.tag + ' | ' + item.paintkit.tag;
    } else {
      name = '★ ' + item.weapon.tag;
    }
  }
</script>

<style global>
  :global(.knives-container .card) {
    min-height: 400px !important;
  }
  :global(.knives-container .card .card-action) {
    padding: 0;
  }

  .card-content {
    position: relative;
    padding: 0;
    margin-bottom: -24px;
  }

  .visit {
    position: absolute;
    right: 0px;
    cursor: pointer;
  }

  .name {
    margin-top: 0;
    max-width: 220px;
    height: 40px;
  }

  .name .weapon {
    display: block;
  }

  .img-container {
    width: 100%;
    min-height: 215px;
  }

  .img-container img {
    width: 100%;
  }
</style>

<Card>
  <div slot="card-content" class="card-content">
    <span class="visit" on:click={$goto(`/knives/${item.id}`)}>
      <i class="material-icons">visibility</i>
    </span>
    <h6 class="name">
      <b class="weapon">
        ★ {item.weapon.tag}
        {#if item.paintkit}|{/if}
      </b>
      {#if item.paintkit}
        <b>{item.paintkit.tag}</b>
      {/if}
    </h6>
    <div class="img-container" style={`background: radial-gradient(circle, ${item.rarity.color}b3 0%, #00000080 100%);`}>
      <img loading="lazy" src={`https://steamcdn-a.akamaihd.net/apps/730/icons/econ/${item.image}`} alt={`An image of ${name}`} />
    </div>
    <p>
      Included in
      <b>{item.collections.length}</b>
      collections
    </p>
    <SkinFloat style="margin-top: 10px;" min={item.paintkit ? item.paintkit.minFloat : 0} max={item.paintkit ? item.paintkit.maxFloat : 1} />
  </div>
</Card>
