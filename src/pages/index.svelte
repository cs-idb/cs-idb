<script>
  import { collections, knive_skins, skins } from '../stores';
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

  .header .title {
    margin-bottom: 0;
    color: var(--color-accent) !important;
  }

  .header .subtitle {
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--color-heading) !important;
  }

  .header .description {
    color: var(--color-primary) !important;
  }  

  .header .version {
    color: var(--color-secondary) !important;
  }

  .divider {
    margin: 50px 0;
    background-color: var(--color-foreground);
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
    color: var(--color-accent) !important;
  }

  .ref a {
    color: var(--color-primary);
    display: flex;
    align-items: center;
  }

  .ref a i {
    height: 20px;
    color: var(--color-accent);
  }

  .ref p {
    color: var(--color-secondary);
  }

  .sources {
    text-align: center;
  }

  .sources .heading {
    color: var(--color-heading);
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

  .source .title {
    color: var(--color-primary);
  }

  .source .subtitle {
    margin-bottom: 10px;
    color: var(--color-secondary);
  }

  :global(.index .sources .source a button) {
    background-color: var(--color-accent);
  }
</style>

<div class="index">
  <div class="header">
    <h2 class="title">Counter Strike: Global Offensive</h2>
    <h3 class="subtitle">Item Database</h3>
    <h5 class="description">A simple Counter Strike: Global Offensive skin wiki.</h5>
    <h6 class="version">Version __VERSION__</h6>
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
    <h3 class="heading">Powered by</h3>
    <div class="flex">
      <div class="source">
        <h5 class="title">SvelteJS v3</h5>
        <p class="subtitle">A javascript framework/compiler.</p>
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
        <h5 class="title">Materializecss</h5>
        <p class="subtitle">CSS Framework + iconset</p>
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
        <h5 class="title">Vercel</h5>
        <p class="subtitle">Static site + cloud functions hosting</p>
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
