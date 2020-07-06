<script>
  import { tick } from 'svelte';

  let showSettings = false;
  let switchThemeInput;

  $: openSettings(showSettings);

  async function openSettings() {
    if (showSettings) {
      await tick();
      const theme = localStorage.getItem('csdb/settings/theme');
      if (theme && theme === 'dark') {
        switchThemeInput.checked = true;
      }
    }
  }

  function switchTheme(e) {
    let theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('csdb/settings/theme', theme);
  }
</script>

<style lang="scss">
  .open-settings-wrapper {
    height: 100%;
    margin: 0 20px;

    span {
      transition: transform 0.5s ease-in-out;
      display: inline-block;
      vertical-align: middle;
    }
    span.rotate {
      transform: rotate(360deg);
    }
  }

  .settings {
    position: fixed;
    margin: 5px;
    background-color: #555;
    z-index: 10000;
    width: 300px;
    padding: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.5);

    .header {
      line-height: normal;
      margin-bottom: 20px;
      font-weight: bold;
      font-size: 20px;

      span {
        font-weight: normal;
        font-size: 10px;
        display: block;
      }
    }

    .setting {
      p {
        margin-bottom: 5px;
      }
    }

    .theme-switch {
      margin-right: 10px;
      line-height: normal;

      label {
        .lever {
          margin: 0;
          padding: 0;
        }

        .theme {
          font-weight: bold;

          &.light {
            color: white;
          }
          &.dark {
            color: black;
          }
        }
      }
    }
  }

  .background-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 999;
    top: 0;
    left: 0;
    position: fixed;

    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
  }
  .background-mask.show {
    opacity: 1;
    visibility: visible;
  }
</style>

<div class="open-settings-wrapper">
  <span class="material-icons" class:rotate={showSettings} on:click={() => (showSettings = !showSettings)}>settings</span>
</div>

<div class="background-mask" class:show={showSettings} on:click={() => (showSettings = false)} />
{#if showSettings}
  <div class="settings">
    <p class="header">
      Settings
      <span>(Click outside form to close.)</span>
    </p>
    <div class="switch theme-switch setting">
      <p>1) Theme</p>
      <label>
        <span class="theme light">Light</span>
        <input bind:this={switchThemeInput} type="checkbox" on:change={switchTheme} />
        <span class="lever" />
        <span class="theme dark">Dark</span>
      </label>
    </div>
  </div>
{/if}
