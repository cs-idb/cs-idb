<script>
  import { url } from '@sveltech/routify';

  const firstYear = 2020;
  const currentYear = new Date().getFullYear();
  const year = firstYear === currentYear ? currentYear : `${firstYear} - ${currentYear}`;
</script>

<style>
  footer {
    background-color: var(--color-background2);
  }

  .footer-copyright p {
    display: inline-block;
  }

  .links li a {
    display: inline-flex;
    align-items: center;
  }

  .links li a i {
    margin-right: 5px;
  }
</style>

<footer class="page-footer">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">CSGO Item Database</h5>
        <p class="grey-text text-lighten-4">A simple Counter Strike: Global Offensive skin, weapon and collection database.</p>
      </div>
      <div class="col l4 offset-l2 s12 links">
        <h5 class="white-text">Links</h5>
        <ul>
          <li>
            <a class="grey-text text-lighten-3" href={$url('https://github.com/cs-idb/cs-idb/')}>
              <i class="material-icons">timeline</i>
              Github repository
            </a>
          </li>
          <li>
            <a class="grey-text text-lighten-3" href={$url('/sitemap')}>
              <i class="material-icons">map</i>
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
      <p>© {year} CSDB</p>
      <p class="grey-text text-lighten-4 right">This site is not in any way or form associated or affiliated with Valve Corp.</p>
    </div>
  </div>
</footer>
