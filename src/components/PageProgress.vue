<template>
  <ul class="pageProgress">
    <li v-for="section in sections" ref="circle" class="pageProgress__element">
      <a v-smooth-scroll :data-section="section.id" :href="'#' + section.id" class="pageProgress__link">
        <span class="sr-only">Przejdź do sekcji {{ section.id | splitString("_", " ") }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "PageProgress",
  data() {
    return {
      sections: [],
      circles: [],
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    this.sections = document.querySelectorAll("section");

    this.$nextTick(() => {
      gsap.utils.toArray(".pageProgress__link").forEach((element, index) => {
        gsap.to(element, {
          backgroundColor: `rgba(${document.documentElement.style.getPropertyValue("--third-color-rgb")}, 0.3)`,
          ease: "none",
          scrollTrigger: {
            trigger: this.sections[index],
            start: "top 45%",
            end: "bottom 45%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.pageProgress {
  position: fixed;
  top: calc(50% - 120px);
  right: 45px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;

  &__element {
    width: 30px;
    height: 30px;
    padding: 3px;
  }

  &__link {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    border: 2px solid var(--font-color);
    border-radius: 50%;
    transition: border var(--transition-duration) var(--transition-timing-function),
      transform var(--transition-duration) var(--transition-timing-function);

    &.hover {
      border-color: var(--third-color);
      transform: scale(1.12) translateY(-5px);
    }

    @include hover {
      border-color: var(--third-color);
      transform: scale(1.12) translateY(-5px);
    }
  }
}

@media screen and (min-width: 768px) {
  .pageProgress {
    display: flex;
  }
}
</style>
