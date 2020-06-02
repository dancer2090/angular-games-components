workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
    new RegExp('https://www.typesy.com/apps/test2'),
    workbox.strategies.networkFirst()
);