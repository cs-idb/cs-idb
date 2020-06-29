<script>
  import { Card, SkinFloat } from '../shared';
  import { goto } from '@sveltech/routify';
  export let knife;

  let name = '';
  $: {
    if (knife.paintkit) {
      name = '★ ' + knife.weapon.tag + ' | ' + knife.paintkit.tag
    } else {
      name = '★ ' + knife.weapon.tag
    }
  }
</script>

<style global>
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

<Card>
  <div slot="card-content" class="card-content">
    <span class="visit" on:click={$goto(`/knives/${knife.id}`)}>
      <i class="material-icons">visibility</i>
    </span>
    <h6 class="name">
      <b>{name}</b>
    </h6>
    <div class="img-container" style={`background: radial-gradient(circle, ${knife.rarity.color}b3 0%, #00000080 100%);`}>
      <img
        loading="lazy"
        src={`https://steamcdn-a.akamaihd.net/apps/730/icons/econ/${knife.image}`}
        alt={`An image of ${name}`} />
    </div>
    <p>Included in <b>{knife.collections.length}</b> collections</p>
    <SkinFloat style="margin-top: 10px;" min={knife.paintkit ? knife.paintkit.minFloat : 0} max={knife.paintkit ? knife.paintkit.maxFloat : 1} />
  </div>
</Card>