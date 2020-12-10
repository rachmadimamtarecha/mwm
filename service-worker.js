importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');



if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    {
        url: './',
        revision: '1'
    },
    {
        url: './app.js',
        revision: '1'
    },
    {
        url: './afinn111id.js',
        revision: '1'
    },
    {
        url: './app.js',
        revision: '1'
    },
    {
        url: './thirdparty/materialize.min.css',
        revision: '1'
    },
    {
        url: './thirdparty/jquery-3.5.1.slim.min.js',
        revision: '1'
    },
    {
        url: './thirdparty/materialize.min.js',
        revision: '1'
    },
    {
        url: './assets/image/android-chrome-144x144.png',
        revision: '1'
    },
    {
        url: './assets/image/android-chrome-192x192.png',
        revision: '1'
    },
    {
        url: './assets/image/android-chrome-256x256.png',
        revision: '1'
    },
    {
        url: './assets/image/android-chrome-36x36.png',
        revision: '1'
    },
    {
        url: './assets/image/android-chrome-384x384.png',
        revision: '1'
    },
    {
        url: './assets/image/android-chrome-48x48.png',
        revision: '1'
    },

    {
        url: './assets/image/android-chrome-512x512.png',
        revision: '1'
    },

    {
        url: './assets/image/android-chrome-72x72.png',
        revision: '1'
    },

    {
        url: './assets/image/android-chrome-96x96.png',
        revision: '1'
    },

    {
        url: './assets/image/apple-touch-icon-1024x1024.png',
        revision: '1'
    },

    {
        url: './assets/image/apple-touch-icon-114x114.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-120x120.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-144x144.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-152x152.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-167x167.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-180x180.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-57x57.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-60x60.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-72x72.png',
        revision: '1'
    },
    {
        url: './assets/image/apple-touch-icon-76x76.png',
        revision: '1'
    },
    {
        url: '/assets/image/apple-touch-icon-precomposed.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-icon.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1125x2436.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1136x640.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1242x2208.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1242x2688.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1334x750.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1536x2048.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1620x2160.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1668x2224.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1668x2388.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-1792x828.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2048x1536.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2048x2732.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2160x1620.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2208x1242.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2224x1668.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2388x1668.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2436x1125.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2688x1242.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-2732x2048.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-640x1136.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-750x1334.png',
        revision: '1'
    }, {
        url: './assets/image/apple-touch-startup-image-828x1792.png',
        revision: '1'
    }, {
        url: './assets/image/browserconfig.xml',
        revision: '1'
    }, {
        url: '/assets/image/coast-228x228.png',
        revision: '1'
    }, {
        url: './assets/image/favicon-16x16.png',
        revision: '1'
    }, {
        url: './assets/image/favicon-32x32.png',
        revision: '1'
    }, {
        url: './assets/image/favicon-48x48.png',
        revision: '1'
    }, {
        url: './assets/image/favicon.ico',
        revision: '1'
    }, {
        url: './assets/image/firefox_app_128x128.png',
        revision: '1'
    },
    {
        url: './assets/image/firefox_app_512x512.png',
        revision: '1'
    },
    {
        url: './assets/image/firefox_app_60x60.png',
        revision: '1'
    },
    {
        url: './assets/image/manifest.json',
        revision: '1'
    },
    {
        url: './assets/image/manifest.webapp',
        revision: '1'
    },
    {
        url: './assets/image/mstile-144x144.png',
        revision: '1'
    },
    {
        url: './assets/image/mstile-150x150.png',
        revision: '1'
    },
    {
        url: './assets/image/mstile-310x150.png',
        revision: '1'
    },
    {
        url: './assets/image/mstile-310x310.png',
        revision: '1'
    },
    {
        url: './assets/image/mstile-70x70.png',
        revision: '1'
    },
    {
        url: './assets/image/yandex-browser-50x50.png',
        revision: '1'
    },
    {
        url: './assets/image/yandex-browser-manifest.json',
        revision: '1'
    }

], {

    ignoreUrlParametersMatching: [/.*/],

});


workbox.routing.registerRoute(
    new RegExp('https://indonesian-news-headline.p.rapidapi.com/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cache-v1',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),

        ]

    })
);
