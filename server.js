try {
  const jsonServer = require('json-server');
  const server = jsonServer.create();
  const router = jsonServer.router(fileRouter());
  const middlewares = jsonServer.defaults({readOnly: true, logger: true});
  const port = process.env.PORT || 3000;

  function fileRouter() {
    return {
      changelog: require('./data/changelog.json'),
      collections: require('./data/collections.json'),
      rarities: require('./data/rarities.json'),
      weapons: require('./data/weapons.json'),
      skins: require('./data/skins.json'),
      paintkits: require('./data/paintkits.json'),
      knives: require('./data/knives.json')
    }
  }

  server.use(middlewares);
  server.use(router);

  server.listen(port, () => {
    console.log(`Listening on port ${port}`)
  });
} catch (error) {
  console.error(`An error occurred while starting the server: ${error}`)
}
