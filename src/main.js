// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Default from '~/layouts/Default.vue';
import VueSmoothScroll from 'vue2-smooth-scroll';
import '~/assets/scss/main.scss';

export default function (Vue, { router, head, isClient }) {
  Vue.component('Layout', Default);

  Vue.filter('splitString', (value, split, join) => {
    return value.split(split).join(join);
  });

  Vue.use(VueSmoothScroll, {
    duration: 1000,
    easingFunction: 'easeOutCubic',
  });

  head.htmlAttrs = { lang: 'pl' };

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