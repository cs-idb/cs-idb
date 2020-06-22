<script>
  import { url } from '@sveltech/routify';
  import { onMount } from 'svelte';
  import M from 'materialize-css';
  import SearchSite from './SearchSite.svelte';

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

<style>
  nav .brand-logo {
    position: relative;
    padding: 0 15px;
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
  }

  .sidenav .brand-logo {
    color: white;
    font-size: 2.1rem;
    height: 56px;
    line-height: 56px;
    font-weight: normal;
  }

  #main-sidenav a.navitem {
    padding: 0 20px;
  }

  #main-sidenav a.navitem i {
    margin: 0 20px 0 0;
  }

  #searchsite {
    position: relative;
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
      <ul class="hide-on-small-only right">
        <li id="searchsite">
          <SearchSite />
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="main-sidenav">
    <li>
      <a class="brand-logo navitem red lighten-2" href={$url('/')}>CSDB</a>
    </li>
    <li id="searchsite">
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
      <a class="navitem" href={$url('/rarities')}>
        <i class="material-icons">grade</i>
        Rarities
      </a>
    </li>
    <li>
      <a class="navitem" href={$url('/skins')}>
        <i class="material-icons">brush</i>
        Skins
      </a>
    </li>
    <li>
      <a class="navitem" href={$url('/weapons')}>
        <i class="material-icons">games</i>
        Weapons
      </a>
    </li>
  </ul>

  <ul id="csgoinfo-dropdown" class="dropdown-content">
    <li>
      <a class="navitem red-text text-lighten-2" href={$url('/collections')}>
        <i class="material-icons">list</i>
        Collections
      </a>
    </li>
    <li>
      <a class="navitem red-text text-lighten-2" href={$url('/rarities')}>
        <i class="material-icons">grade</i>
        Rarities
      </a>
    </li>
    <li>
      <a class="navitem red-text text-lighten-2" href={$url('/skins')}>
        <i class="material-icons">brush</i>
        Skins
      </a>
    </li>
    <li>
      <a class="navitem red-text text-lighten-2" href={$url('/weapons')}>
        <i class="material-icons">games</i>
        Weapons
      </a>
    </li>
  </ul>
</header>
