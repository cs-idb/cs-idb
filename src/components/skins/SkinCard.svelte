<script>
  import { goto } from '@sveltech/routify'
  import { Badge, Button, SkinFloat } from "../shared"
  export let skin;
</script>

<style>
  .skin-card {
    border: 1px solid #00000030;
    padding: 10px;
    max-width: 300px;
    margin: 0 10px 10px 0;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.1s ease-in-out;
  }
  .skin-card:hover {
    transform: scale(1.05);
  }

  .name {
    margin-top: 0;
  } 

  .badges {
    margin-bottom: 10px;
  }

  .img-container {
    width: 100%;
    height: auto;
  }

  .img-container img {
    width: 100%;
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
  <div class="img-container" style={`background: radial-gradient(circle, ${skin.rarity.color}b3 0%, #00000080 100%);`}>
    <img loading="lazy" src={`https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/${skin.image.fullname_filehash_png}`} alt={`An image of ${skin.weapon.tag} | ${skin.paintkit.tag}`}>
  </div>
  {#if skin.collection}
    <Button 
      style="width: 100%; margin-top: 10px; display: flex; flex-direction: column; height: 50px; padding: 0;" 
      type="blue"
      on:click={$goto(`/collections/${skin.collection.id}`)}
    >
      <span class="tag" style="font-size: 11px;">{skin.collection.tag}</span>
      <span class="released" style="font-size: 10px; margin-top: -20px; color: #403d3d; text-transform: none;">Released: {skin.collection.released}</span>
    </Button>
  {/if}
  <SkinFloat style="margin-top: 10px;" min={skin.paintkit.minFloat} max={skin.paintkit.maxFloat}/>
</div>
