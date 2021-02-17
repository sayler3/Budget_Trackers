const staticCache = "site-static-v1";

const assets = ["./", "./index.html", "./index.js", "./styles.css"];

//install event
self.addEventListener("install", (evt) => {
	evt.waitUntil(
		caches.open(staticCache).then((cache) => {
			console.log("cacheing shell");
			cache.addAll(assets);
		})
	);
	// console.log("Service worker has been installed");

	// const preCache = async () => {
	// 	try {
	// 		const cache = await caches.open(staticCache);
	// 		cache.addAll(assets);
	// 	} catch (err) {
	// 		console.log("problems happened");
	// 	}
	// };

	// evt.waitUntil(preCache());
});

//activate event
self.addEventListener("activate", (evt) => {
	console.log("Service worker has been activated");

	// grab keys from caches
	const getKeys = async () => {
		try {
			const keys = await caches.keys();
			return keys
				.filter((key) => key !== staticCache)
				.map((key) => caches.delete(key));
		} catch (err) {
			console.log(err);
		}
	};

	evt.waitUntil(getKeys());
});

// fetch event
self.addEventListener("fetch", (evt) => {
	// console.log("fetch event: ", evt);
	const cacheResponse = async () => {
		try {
			const catchReponse = await caches.match(evt.request);
			return catchReponse || fetch(evt.request);
		} catch (err) {
			console.log(err);
		}
	};

	evt.respondWith(cacheResponse());
});
