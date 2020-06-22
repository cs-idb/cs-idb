<script>
  import { Table, PageHeader } from '../../components/shared/';
  import { weapons } from '../../stores';

  $: tableHeaders = ['name', 'type', 'desc'];
  $: tableRows = $weapons.map(function (weapon) {
    return {
      name: weapon.tag,
      type: weapon.type,
      desc: weapon.desc,
    };
  });

  const activeSort = {
    header: 'name',
    sortAsc: true,
  };
</script>

<style>
  .weapons-container {
    margin: 2rem 0;
  }
</style>

<div class="weapons-container">
  <PageHeader>Weapons</PageHeader>

  <Table {tableHeaders} {tableRows} {activeSort} />
</div>
