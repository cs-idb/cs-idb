<script>
  import { PageHeader } from '../../components/shared/'
  import { skins } from '../../stores'
  import { SkinCardList } from '../../components/skins/'
</script>

<style>
  .skins-container {
    margin: 2rem 0;
  }
</style>

<div class="skins-container">
  <PageHeader>
    Skins
  </PageHeader>

  <SkinCardList skins={$skins}/>
</div>
