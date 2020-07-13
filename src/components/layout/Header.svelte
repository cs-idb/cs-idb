<script>
  import M from 'materialize-css';
  import { onMount } from 'svelte';
  import SearchSite from './SearchSite.svelte';
  import SiteSettings from './SiteSettings.svelte';
  import { url } from '@sveltech/routify';

  onMount(() => {
    initNav();
  });

  let materializeSideNav;

  const initNav = function () {
    const dropdowns_bottom = document.querySelectorAll('.dropdown-trigger');
    const dropdown_options_bottom = {
      coverTrigger: false,
      alignment: 'bottom',
      hover: true,
      constrainWidth: false,
    };
    M.Dropdown.init(dropdowns_bottom, dropdown_options_bottom);

    const sidenav_el = document.querySelector('.sidenav');
    const sidenav_options = { inDuration: 100, outDuration: 100 };
    M.Sidenav.init(sidenav_el, sidenav_options);

    materializeSideNav = M.Sidenav.getInstance(sidenav_el);
    document.querySelectorAll('.navitem').forEach(el => el.addEventListener('click', () => materializeSideNav.close()));
  };

  const closeSideNav = () => {
    materializeSideNav.close();
  };
</script>

<style lang="scss">
  nav {
    background-color: var(--color-background2);
  }

  nav .brand-logo {
    position: relative;
    padding: 0 15px;
  }
  .search-wrapper {
    height: inherit;
  }

  .icon-fix {
    display: flex;
    align-items: center;
  }

  .icon-fix i {
    margin-right: 5px;
  }

  .divider {
    margin: 8px;
    background-color: var(--color-foreground);
  }

  .sidenav .brand-logo {
    color: white;
    font-size: 2.1rem;
    height: 56px;
    line-height: 56px;
    font-weight: normal;
  }

  .sidenav :global(li.move p) {
    line-height: normal !important;
  }

  #main-sidenav {
    background-color: var(--color-background);

    a.brand-logo {
      background-color: var(--color-background2);
      color: white !important;
    }

    a.navitem {
      padding: 0 20px;
      color: var(--color-primary);

      i {
        margin: 0 20px 0 0;
        color: var(--color-secondary);
      }
    }
  }

  #searchsite {
    position: relative;
    height: inherit;

    :global(#search-box i) {
      color: var(--color-primary);
    }
  }

  #csgoinfo-dropdown {
    background-color: var(--color-background);

    li:hover {
      background-color: var(--color-background2);
    }

    a.navitem {
      color: var(--color-primary);
    }
  }

  @media only screen and (min-width: 601px) {
    .sidenav .brand-logo {
      height: 64px;
      line-height: 64px;
    }
  }
</style>

<header>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" data-target="main-sidenav" class="sidenav-trigger">
        <i class="material-icons">menu</i>
      </a>
      <a href={$url('/')} class="brand-logo left">CSDB</a>
      <ul class="hide-on-med-and-down left">
        <li>
          <a class="dropdown-trigger" href="#!" data-target="csgoinfo-dropdown">
            CS:GO
            <i class="material-icons right">arrow_drop_down</i>
          </a>
        </li>
        <li>
          <a class="navitem icon-fix" href={$url('/changelog')}>
            <i class="material-icons">history</i>
            Changelog
          </a>
        </li>
      </ul>
      <ul class="right">
        <li>
          <SiteSettings />
        </li>
      </ul>
      <ul class="hide-on-med-and-down right search-wrapper">
        <li id="searchsite">
          <SearchSite />
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="main-sidenav">
    <li>
      <a class="brand-logo navitem" href={$url('/')}>CSDB</a>
    </li>
    <li id="searchsite-mobile">
      <SearchSite mobile={true} on:closeSideNav={closeSideNav} />
    </li>
    <div class="divider" />
    <li>
      <a class="navitem" href={$url('/collections')}>
        <i class="material-icons">list</i>
        Collections
      </a>
    </li>
    <li>
      <a class="navitem" href={$url('/skins')}>
        <i class="material-icons">brush</i>
        Skins
      </a>
    </li>
    <li>
      <a class="navitem" href={$url('/knives')}>
        <i class="material-icons">restaurant</i>
        Knives
      </a>
    </li>
    <li>
      <a class="navitem icon-fix" href={$url('/changelog')}>
        <i class="material-icons">history</i>
        Changelog
      </a>
    </li>
  </ul>

  <ul id="csgoinfo-dropdown" class="dropdown-content">
    <li>
      <a class="navitem" href={$url('/collections')}>
        <i class="material-icons">list</i>
        Collections
      </a>
    </li>
    <li>
      <a class="navitem" href={$url('/skins')}>
        <i class="material-icons">brush</i>
        Skins
      </a>
    </li>
    <li>
      <a class="navitem" href={$url('/knives')}>
        <i class="material-icons">restaurant</i>
        Knives
      </a>
    </li>
  </ul>
</header>
