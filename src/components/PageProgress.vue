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
      this.circles = document.querySelectorAll(".pageProgress__link");
      this.circles.forEach((circle, index) => {
        gsap.to(circle, {
          backgroundColor: `rgba(${document.documentElement.style.getPropertyValue("--third-color-rgb")}, 0.3)`,
          scrollTrigger: {
            trigger: this.sections[index],
            start: "-450px top",
            end: "-250px top",
            scrub: true,
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
