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

  head.meta.push({
    name: 'description',
    content: 'Jakub Soboczyński – Frontend Developer Portfolio',
  });

  head.meta.push({
    name: 'og:description',
    content: 'Jakub Soboczyński – Frontend Developer Portfolio',
  });

  head.meta.push({
    name: 'twitter:description',
    content: 'Jakub Soboczyński – Frontend Developer Portfolio',
  });

  head.meta.push({
    name: 'keywords',
    content: 'Jakub Soboczyński, Portfolio, Front-End Developer,Frontend Developer, Front-End, Frontend, Developer',
  });

  head.meta.push({
    name: 'og:title',
    content: 'Portfolio | Jakub Soboczyński',
  });

  head.meta.push({
    name: 'twitter:title',
    content: 'Portfolio | Jakub Soboczyński',
  });

  head.meta.push({
    name: 'robots',
    content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  });

  head.meta.push({
    name: 'og:url',
    content: 'https://www.jakubsoboczynski.pl',
  });

  head.meta.push({
    name: 'og:type',
    content: 'website',
  });

  head.meta.push({
    name: 'og:locale',
    content: 'pl_PL',
  });

  head.meta.push({
    name: 'twitter:card',
    content: 'summary_large_image',
  });

  head.meta.push({
    name: 'twitter:creator',
    content: '@teziovsky',
  });
}