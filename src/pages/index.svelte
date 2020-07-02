<script>
  import { collections, skins, knive_skins } from '../stores';
  import { Button } from '../components/shared';
  import { url } from '@sveltech/routify';
</script>

<style>
  .index {
    margin: 50px 0;
  }

  .header {
    text-align: center;
  }

  .header h2 {
    margin-bottom: 0;
  }
  .header h3 {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .divider {
    margin: 50px 0;
  }

  .refs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .ref {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .ref > i {
    font-size: 6rem;
  }

  .ref a {
    color: black;
    display: flex;
    align-items: center;
  }

  .ref a i {
    height: 20px;
  }

  .sources {
    text-align: center;
  }

  .sources span.flex {
    display: flex;
    justify-content: center;
  }

  .sources div.flex {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .source {
    width: 300px;
  }

  .source p {
    margin-bottom: 10px;
  }
</style>

<div class="index">
  <div class="header">
    <h2 class="red-text text-lighten-2">Counter Strike: Global Offensive</h2>
    <h3 class="grey-text text-darken-2">Item Database</h3>
    <h5>A simple Counter Strike: Global Offensive skin wiki.</h5>
    <h6 class="grey-text text-darken-2">Version __VERSION__</h6>
  </div>

  <div class="divider" />

  <div class="refs">
    <div class="ref">
      <i class="material-icons red-text text-lighten-2">list</i>
      <h5>
        <a href={$url('/collections')}>
          Collections
          <i class="material-icons">chevron_right</i>
        </a>
      </h5>
      <p>A list of all {$collections.length} collections!</p>
    </div>

    <div class="ref">
      <i class="material-icons red-text text-lighten-2">brush</i>
      <h5>
        <a href={$url('/skins')}>
          Skins
          <i class="material-icons">chevron_right</i>
        </a>
      </h5>
      <p>A list of all {$skins.length} weapon skins!</p>
    </div>

    <div class="ref">
      <i class="material-icons red-text text-lighten-2">restaurant</i>
      <h5>
        <a href={$url('/knives')}>
          Knives
          <i class="material-icons">chevron_right</i>
        </a>
      </h5>
      <p>A list of all {$knive_skins.length} knive skins!</p>
    </div>
  </div>

  <div class="divider" />

  <div class="sources">
    <h3 class="grey-text text-darken-2">Powered by</h3>
    <div class="flex">
      <div class="source">
        <h5>SvelteJS v3</h5>
        <p>A javascript framework/compiler.</p>
        <a href={$url('https://svelte.dev/')} target="_blank" rel="noopener noreferrer">
          <Button>
            <span class="flex">
              Homepage
              <i class="material-icons">chevron_right</i>
            </span>
          </Button>
        </a>
      </div>

      <div class="source">
        <h5>Materializecss</h5>
        <p>CSS Framework + iconset</p>
        <a href={$url('https://materializecss.com/')} target="_blank" rel="noopener noreferrer">
          <Button>
            <span class="flex">
              Homepage
              <i class="material-icons">chevron_right</i>
            </span>
          </Button>
        </a>
      </div>

      <div class="source">
        <h5>Vercel</h5>
        <p>Static site + cloud functions hosting</p>
        <a href={$url('https://vercel.com/')} target="_blank" rel="noopener noreferrer">
          <Button>
            <span class="flex">
              Vercel
              <i class="material-icons">chevron_right</i>
            </span>
          </Button>
        </a>
      </div>

    </div>
  </div>

</div>
