<script>
  import { goto, url } from '@sveltech/routify';
  import { knive_skins } from '../../stores';
  import { onMount } from 'svelte';
  import { PageHeader } from '../../components/shared';

  export let id;
  let knife;
  let knifeName = '';
  let sortedCollections = [];

  $: loadKnife(id);
  $: {
    if (knife.paintkit) {
      knifeName = '★ ' + knife.weapon.tag + ' | ' + knife.paintkit.tag;
    } else {
      knifeName = '★ ' + knife.weapon.tag;
    }
  }
  $: {
    sortedCollections = JSON.parse(JSON.stringify(knife.collections));
    sortedCollections.sort((a, b) => {
      return new Date(a.released) > new Date(b.released) ? 1 : -1;
    });
  }

  onMount(() => {
    loadKnife();
  });

  const loadKnife = async () => {
    knife = $knive_skins.find(k => Number(k.id) === Number(id));

    if (!knife) {
      return $goto($url('/knives'));
    }
  };
</script>

<style>
  .knife {
    margin-bottom: 2rem;
  }

  .image-container {
    position: relative;
    height: 250px;
  }

  .image-container img {
    background-color: white;
  }

  .collections li {
    padding-left: 10px;
  }

  .collections li h6 {
    margin: 0;
  }

  .collections .tag {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
  }
  .collections .tag .material-icons {
    margin-left: 5px;
  }
  .collections .released {
    font-size: 0.8rem;
    display: block;
  }

  .collections li:hover {
    color: #db5b60;
  }
</style>

<div class="knife">
  {#if knife}
    <PageHeader>{knifeName}</PageHeader>

    <div class="image-container">
      <img
        class="needs-materialbox"
        width="300"
        src={'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/' + knife.image}
        alt={`An image of ${knifeName}`} />
    </div>

    {#if knife.paintkit}
      <h6 class="grey-text">
        <b>Description:</b>
        {knife.paintkit.desc}
      </h6>
      {#if knife.paintkit.flavor}
        <h6 class="grey-text">
          <b>Flavor text:</b>
          <i>{knife.paintkit.flavor}</i>
        </h6>
      {/if}
      <h6 class="grey-text">
        <b>Paintkit name:</b>
        {knife.paintkit.name}
      </h6>
    {:else}
      <h6 class="grey-text">
        <b>Info:</b>
        Default knife, no description, flavor text or paintkit available.
      </h6>
    {/if}

    <br />
    <h5>Available in the following collections ({sortedCollections.length}):</h5>
    <ul class="collections">
      {#each sortedCollections as collection}
        <li on:click={$goto($url(`/collections/${collection.id}`))}>
          <h6>
            <b class="tag">
              <span>{collection.tag}</span>
              <span class="material-icons">arrow_forward</span>
            </b>
            <i class="released">Released: {collection.released}</i>
          </h6>
        </li>
      {/each}
    </ul>
  {:else}
    <span>Loading...</span>
  {/if}
</div>
