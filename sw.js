let staticCacheName = 'restaurant-static-v6';

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'js/main.js',
				'js/dbhelper.js',
				'js/restaurant_info.js',
				'css/styles.css',
				'data/restaurants.json',
				'img/1.jpg',
				'img/10.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
				'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css'
			]);
		})

	);
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// self.addEventListener('fetch', event => {
// 	event.respondWith(
// 		caches.open(staticCacheName).then(function(cache) {
// 	      	return cache.match(event.request).then(function (response) {
// 		        return response || fetch(event.request).then(function(response) {
// 		        	cache.put(event.request, response.clone());
// 	          		return response;
// 		}).catch(error => {
// 			console.log(error);
// 		})
// 		)
// 	})
// })

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});