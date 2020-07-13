<script>
  import { collections, knive_skins, skins } from '../stores';
  import { Button } from '../components/shared';
  import { url } from '@sveltech/routify';
</script>

<style lang="scss">
  .index {
    margin: 50px 0;
    margin-left: -5.56%; // 10% / 2 sides / 90% container width * 100
    margin-right: -5.56%;
  }

  .header {
    text-align: center;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  .wave-top {
    color: var(--color-accent);
    margin-bottom: -10px;
  }

  .refs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: var(--color-accent);
    min-height: 300px;
    padding: 50px 0;
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
    color: white;
  }

  .ref a {
    color: white;
    display: flex;
    align-items: center;
  }

  .ref a i {
    height: 20px;
    color: white;
  }

  .ref p {
    color: #1d1d1d;
  }

  .sources {
    text-align: center;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .sources .heading {
    color: var(--color-heading);
    margin: 0;
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

  <svg class="wave-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,160L24,154.7C48,149,96,139,144,144C192,149,240,171,288,170.7C336,171,384,149,432,149.3C480,149,528,171,576,192C624,213,672,235,720,218.7C768,203,816,149,864,138.7C912,128,960,160,1008,154.7C1056,149,1104,107,1152,101.3C1200,96,1248,128,1296,165.3C1344,203,1392,245,1416,266.7L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z" fill="currentColor"></path></svg>

  <div class="refs">
    <div class="ref">
      <i class="material-icons">list</i>
      <h5>
        <a href={$url('/collections')}>
          Collections
          <i class="material-icons">chevron_right</i>
        </a>
      </h5>
      <p>A list of all {$collections.length} collections!</p>
    </div>

    <div class="ref">
      <i class="material-icons">brush</i>
      <h5>
        <a href={$url('/skins')}>
          Skins
          <i class="material-icons">chevron_right</i>
        </a>
      </h5>
      <p>A list of all {$skins.length} weapon skins!</p>
    </div>

    <div class="ref">
      <i class="material-icons">restaurant</i>
      <h5>
        <a href={$url('/knives')}>
          Knives
          <i class="material-icons">chevron_right</i>
        </a>
      </h5>
      <p>A list of all {$knive_skins.length} knive skins!</p>
    </div>
  </div>

  <svg class="wave-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill-opacity="1" d="M0,256L24,261.3C48,267,96,277,144,240C192,203,240,117,288,96C336,75,384,117,432,128C480,139,528,117,576,90.7C624,64,672,32,720,53.3C768,75,816,149,864,181.3C912,213,960,203,1008,192C1056,181,1104,171,1152,176C1200,181,1248,203,1296,202.7C1344,203,1392,181,1416,170.7L1440,160L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z" style="color: var(--color-accent);" fill="currentColor"></path></svg>

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
