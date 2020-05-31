<script>
  import M from 'materialize-css'
  import { goto, url } from '@sveltech/routify'
  import { onMount, tick } from 'svelte'
  import { skins } from '../../stores'
  import { Button, SkinFloat, Badge } from '../../components/shared'
  export let id

  let skin

  $: {
    loadSkin(id)
  }

  onMount(() => {
    loadSkin()
  })

  const loadSkin = async () => {
    skin = $skins.find(s => Number(s.id) === Number(id))

    if (!skin) {
      return $goto($url('/skins'))
    }

    await tick()
    const imageBoxElements = document.querySelectorAll('.needs-materialbox')
    M.Materialbox.init(imageBoxElements)
    imageBoxElements.forEach(el => {
      el.classList.remove('needs-materialbox')
    })
  }
</script>

<style>
  .skin {
    margin-bottom: 2rem;
  }

  .heading {
    display: flex;
    align-items: center;
  }

  .heading span {
    margin-left: 15px;
  }

  .skin-collection h6,
  .skin-weapon h6 {
    display: inline-block;
  }

  .image-container {
    position: relative;
    height: 250px;
  }

  .image-container img {
    background-color: white;
  }

  .image-placeholder {
    height: 225px;
    width: 300px;
    position: absolute;
    top: 0;
    border: 1px solid black;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .skin-collection span,
  .skin-weapon span {
    display: inline-flex;
  }
</style>

<div class="skin">
  {#if skin}
    <h3 class="heading">
      <Button on:click={() => $goto('/skins')}>&lt;</Button>
      <span>{skin.weapon.tag} | {skin.paintkit.tag}</span>
    </h3>

    <div class="image-container">
      <img
        class="needs-materialbox"
        width="300"
        src={'http://media.steampowered.com/apps/730/icons/econ/default_generated/' + skin.image.mediaSteamPowered}
        alt={`An image of ${skin.weapon.tag} | ${skin.paintkit.tag}`} />
      <div class="image-placeholder">Loading image...</div>
    </div>

    {#if skin.collection.stattrak === true}
      <Badge color="orange">StatTrak™ available</Badge>
    {:else if skin.collection.souvenir === true}
      <Badge color="yellow accent-4">Souvenir available</Badge>
    {/if}

    <h6 class="grey-text">
      <b>Description:</b>
      {skin.paintkit.desc}
    </h6>
    {#if skin.paintkit.flavor}
      <h6 class="grey-text">
        <b>Flavor text:</b>
        <i>{skin.paintkit.flavor}</i>
      </h6>
    {/if}
    <h6 class="grey-text">
      <b>Paintkit:</b>
      {skin.paintkit.name}
    </h6>
    <div class="skin-collection">
      <h6 class="grey-text">
        <b>Collection:</b>
        {skin.collection.tag}
      </h6>
      <Button on:click={() => $goto(`/collections/${skin.collection.id}`)}>
        <span>
          View
          <i class="material-icons">chevron_right</i>
        </span>
      </Button>
    </div>
    <div class="skin-weapon">
      <h6 class="grey-text">
        <b>Weapon:</b>
        {skin.weapon.tag}
      </h6>
      <Button on:click={() => $goto(`/skins?f=w:eq:${skin.weapon.tag}`)}>
        <span>
          View skins
          <i class="material-icons">chevron_right</i>
        </span>
      </Button>
    </div>
    <div class="skin-float">
      <h6 class="grey-text">
        <b>Float info:</b>
      </h6>
      <SkinFloat min={skin.paintkit.minFloat} max={skin.paintkit.maxFloat} />
    </div>
  {:else}
    <span>Loading...</span>
  {/if}
</div>
