<script>
  import { Badge, Button, PageHeader, SkinFloat } from '../../components/shared';
  import { goto, url } from '@sveltech/routify';
  import { onMount, tick } from 'svelte';
  import M from 'materialize-css';
  import { skins } from '../../stores';
  export let id;

  let skin;

  $: {
    loadSkin(id);
  }

  onMount(() => {
    loadSkin();
  });

  const loadSkin = async () => {
    skin = $skins.find(s => Number(s.id) === Number(id));

    if (!skin) {
      return $goto($url('/skins'));
    }

    await tick();
    const imageBoxElements = document.querySelectorAll('.needs-materialbox');
    M.Materialbox.init(imageBoxElements);
    imageBoxElements.forEach(el => {
      el.classList.remove('needs-materialbox');
    });
  };
</script>

<style>
  .skin {
    margin-bottom: 2rem;
  }

  .skin-collection h6,
  .skin-weapon h6 {
    display: inline-block;
  }

  .image-container {
    position: relative;
    height: 250px;
  }

  :global(.skin button, .skin button:hover, .skin button:focus) {
    background-color: var(--color-accent);
  }

  .skin-collection span,
  .skin-weapon span {
    display: inline-flex;
  }
</style>

<div class="skin">
  {#if skin}
    <PageHeader>{skin.weapon.tag} | {skin.paintkit.tag}</PageHeader>

    <div class="image-container">
      <img
        class="needs-materialbox"
        width="300"
        src={'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/' + skin.image}
        alt={`An image of ${skin.weapon.tag} | ${skin.paintkit.tag}`} />
    </div>

    {#if (skin.collection || {}).stattrak === true}
      <Badge classes="orange">StatTrak™ available</Badge>
    {:else if (skin.collection || {}).souvenir === true}
      <Badge classes="yellow accent-4">Souvenir available</Badge>
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
        {(skin.collection || {}).tag || '-'}
      </h6>
      {#if skin.collection}
        <Button type="btn-small" on:click={() => $goto(`/collections/${skin.collection.id}`)}>
          <span>
            View
            <i class="material-icons">chevron_right</i>
          </span>
        </Button>
      {/if}
    </div>
    <div class="skin-weapon">
      <h6 class="grey-text">
        <b>Weapon:</b>
        {skin.weapon.tag}
      </h6>
      <Button type="btn-small" on:click={() => $goto(`/skins?weaponId=${skin.weapon.id}`)}>
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
