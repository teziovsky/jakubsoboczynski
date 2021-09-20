// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import HomepageLayout from '~/layouts/Homepage.vue';
import '~/assets/main.scss';

export default function (Vue, { router, head, isClient }) {
  Vue.component('HomepageLayout', HomepageLayout);

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  });

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700&family=Space+Mono:wght@400;700&display=swap',
  });
}