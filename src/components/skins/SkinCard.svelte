<script>
  import { Badge, Button, SkinFloat } from "../shared"
  export let skin;
</script>

<style>
  .skin-card {
    border: 1px solid black;
    padding: 10px;
    max-width: 400px;
    margin: 0 10px 10px 0;
  }

  .name {
    margin-top: 0;
  } 

  .badges {
    margin-bottom: 10px;
  }

  .img-container {
    display: flex;
  }
</style>

<div class="skin-card">
  <h6><b class="name">{skin.weapon.tag} | {skin.paintkit.tag}</b></h6>
  <div class="badges">
    {#if (skin.collection||{}).stattrak}
      <Badge classes="orange">StatTrak™</Badge>
    {/if}
    {#if (skin.collection||{}).souvenir}
      <Badge classes="orange">Souvenir</Badge>
    {/if}
    <Badge style={`background-color: ${skin.rarity.color};`}>{skin.rarity.tag} {skin.weapon.type}</Badge>
  </div>
  <div class="img-container">
    <img style={`background: radial-gradient(circle, ${skin.rarity.color}b3 0%, #00000080 100%);`} src={`https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/${skin.image.fullname_filehash_png}`} alt={`An image of ${skin.weapon.tag} | ${skin.paintkit.tag}`}>
  </div>
  {#if skin.collection}
    <Button style="width: 100%; margin-top: 10px;" type="blue">{skin.collection.tag}</Button>
  {/if}
  <SkinFloat style="margin-top: 10px;" min={skin.paintkit.minFloat} max={skin.paintkit.maxFloat}/>
</div>
