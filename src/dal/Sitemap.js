const sitemap = [
  {
    'name': 'Home',
    'url': '/',
  },

  {
    'name': 'Collections',
    'url': '/collections',
    'children': [
      {
        'name': 'Single collection',
        'url': '/collections/0',
        'placeholder': '/collections/<id>',
      },
    ],
  },
  {
    'name': 'Rarities',
    'url': '/rarities',
  },
  {
    'name': 'Weapons',
    'url': '/weapons',
  },
  {
    'name': 'Skins',
    'url': '/skins',
    'children': [
      {
        'name': 'Single skin',
        'url': '/skins/0',
        'placeholder': '/skins/<id>',
      },
    ],
  },

  {
    'name': 'Sitemap',
    'url': '/sitemap',
  },
  {
    'name': 'Changelog',
    'url': '/changelog',
  },
]

export { sitemap }
