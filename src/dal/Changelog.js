const changelogs = [
  {
    version: '1.0',
    time: 1589098687000, // Sunday, 10 May 2020
    header: 'Initial release',
    content: 'Initial release of the website: collections page, rarities page, weapons page and skins page.',
  },
  {
    version: '1.1',
    time: 1589199536000, // Monday, 11 May 2020
    header: 'Searching',
    content:
      'Added a searchbox at the top right of the page for desktop users and in the side-nav for mobile users. This searchbox allows searching by name for collections, weapons and skins.',
  },
  {
    version: '1.2',
    time: 1589392258000, // Wednesday, 13 May 2020
    header: 'Api overhaul',
    content: 'Reworked how paintkits are applied to skins, including paintkit name and image uri.',
  },
  {
    version: '1.3',
    time: 1590686733000, // Thursday, 28 May 2020,
    header: 'Updating in the background',
    content:
      'If your browser has the items stored locally (e.g. you visited the site already), it will check for updates in the background instead of showing a spinner.',
  },
  {
    version: '1.4',
    time: 1592146068000, // Sunday, 14 June 2020,
    header: 'Skin images',
    content: 'Fixed issue with skin images not showing in Chrome; Images now also show in the global skins- and collection lists.'
  }
]

export { changelogs }
