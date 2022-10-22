<template>
  <ul class="pageProgress">
    <li v-for="section in sections" :key="section.id" ref="circle" class="pageProgress__element">
      <a :data-section="section.id" :href="'#' + section.id" class="pageProgress__link">
        <span class="sr-only">Przejdź do sekcji {{ splitString(section.id, "_", " ") }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default {
  name: "PageProgress",
  data() {
    return {
      sections: [],
      circles: [],
    };
  },
  mounted() {
    this.sections = document.querySelectorAll("section");

    gsap.utils.toArray(".pageProgress__link").forEach((element, index) => {
      gsap.to(element, {
        backgroundColor: `rgba(${getComputedStyle(document.documentElement).getPropertyValue(
          "--third-color-rgb"
        )}, 0.3)`,
        ease: "none",
        scrollTrigger: {
          trigger: this.sections[index],
          start: "top 45%",
          end: "bottom 45%",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  },
  methods: {
    splitString(value, split, join) {
      return value.split(split).join(join);
    },
  },
};
</script>
