<template>
  <div class="colorChanger">
    <button :class="{'active': opened}" class="colorChanger__toggle" @click="toggleList">
      <svg fill="none" height="35" viewBox="0 0 35 35" width="35" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.2337 22.0459C31.0605 22.1664 27.4674 25.9685 27.4674 28.6369C27.4674 31.4503 29.2545 33.2468 31.2337 33.3447C32.9398 33.4276 35 31.6668 35 28.6369C35 25.8122 31.407 22.1664 31.2337 22.0459ZM11.6227 33.3447C12.3346 34.0565 13.2799 34.4482 14.2855 34.4482C15.2911 34.4482 16.2364 34.0565 16.9482 33.3447L30.1302 20.1628L28.7988 18.8314L14.2855 4.31803L9.96745 0L7.30469 2.66276L11.6227 6.98079L1.10352 17.5C0.391693 18.2118 0 19.1572 0 20.1628C0 21.1684 0.391693 22.1137 1.10352 22.8255L11.6227 33.3447ZM14.2855 9.64355L24.8047 20.1628H3.76628L14.2855 9.64355Z"
          fill="white" />
      </svg>
    </button>
    <ul class="colorChanger__list">
      <li
        v-for="(color, index) in colors"
        :key="color.id"
        :class="{'show': opened}"
        :data-index="index + 1"
        class="colorChanger__listItem">
        <button
          :aria-label="'Zmień motyw na – ' + color.name"
          :style="'--primary-color: ' + color.codes.primaryColor"
          @click="changeColor(color)"></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ColorChanger',
  data() {
    return {
      opened: false,
      activeColor: 1,
      colors: [
        {
          id: 1,
          name: 'Ciemny Niebieski',
          codes: {
            primaryColor: '#1A1A2E',
            primaryColorRgb: '26, 26, 46',
            secondaryColor: '#16213E',
            secondaryColorRgb: '22, 33, 62',
            thirdColor: '#E94560',
            thirdColorRgb: '233, 69, 96',
          },
        },
        {
          id: 2,
          name: 'Czerwony',
          codes: {
            primaryColor: '#420516',
            primaryColorRgb: '66, 5, 22',
            secondaryColor: '#7D1935',
            secondaryColorRgb: '125, 25, 53',
            thirdColor: '#E63E6D',
            thirdColorRgb: '230, 62, 109',
          },
        },
        {
          id: 3,
          name: 'Morski',
          codes: {
            primaryColor: '#1D3E53',
            primaryColorRgb: '29, 62, 83',
            secondaryColor: '#254B62',
            secondaryColorRgb: '37, 75, 98',
            thirdColor: '#77ABB7',
            thirdColorRgb: '119, 171, 183',
          },
        },
        {
          id: 4,
          name: 'Fioletowy',
          codes: {
            primaryColor: '#363062',
            primaryColorRgb: '54, 48, 98',
            secondaryColor: '#4D4C7D',
            secondaryColorRgb: '77, 76, 125',
            thirdColor: '#D8B9C3',
            thirdColorRgb: '216, 185, 195',
          },
        },
        {
          id: 5,
          name: 'Czarny',
          codes: {
            primaryColor: '#000000',
            primaryColorRgb: '54, 48, 98',
            secondaryColor: '#4C4C4C',
            secondaryColorRgb: '77, 76, 125',
            thirdColor: '#A6A6A6',
            thirdColorRgb: '216, 185, 195',
          },
        },
      ],
    };
  },
  created() {
    const storageTheme = process.isClient ? localStorage.getItem('theme') : 1;
    const actualTheme = this.colors.find(item => item.id === Number(storageTheme));
    this.changeColor(actualTheme);
  },
  mounted() {
    this.detectMobile();
    window.addEventListener('resize', this.detectMobile);
  },
  methods: {
    toggleList() {
      this.opened = !this.opened;
    },
    changeColor({ id, codes }) {
      this.activeColor = id;
      const root = document.documentElement;

      Object.entries(codes).forEach(([key, value]) => {
        const property = '--' + key.split(/(?=[A-Z])/).join('-').toLowerCase();
        process.isClient ? root.style.setProperty(property, value) : false;
        process.isClient ? localStorage.setItem('theme', id) : false;
      });
    },
    detectMobile() {
      const width = (window.innerWidth > 0) ? window.innerWidth : document.documentElement.clientWidth;
      this.opened = width <= 768;
    },
  },
};
</script>

<style lang="scss" scoped>
.colorChanger {
  position: fixed;
  z-index: 2;
  right: 45px;
  bottom: 45px;
  display: none;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;

  &__toggle {
    width: 30px;
    height: 30px;
    display: none;
    transition: transform var(--transition-duration) var(--transition-timing-function);

    &.active {
      svg {
        path {
          fill: var(--font-color);
        }
      }
    }

    svg {
      width: 20px;
      height: 20px;

      path {
        transition: fill var(--transition-duration) var(--transition-timing-function);
        fill: rgba(var(--font-color-rgb), 0.4);
      }
    }

    @include hover {
      transform: scale(1.12) translateY(-5px);

      path {
        fill: var(--third-color) !important;
      }
    }
  }

  &__list {
    display: flex;
    column-gap: 5px;

    &Item {
      width: 30px;
      height: 30px;
      display: grid;
      opacity: 0;
      visibility: hidden;
      transform: translateX(-20px);
      transition-delay: 0s;
      transition-timing-function: var(--transition-timing-function);
      transition-duration: var(--transition-duration);
      transition-property: opacity, visibility, transform;
      place-items: center;

      @for $i from 1 through 10 {
        &:nth-child(#{$i + 1}) {
          transition-delay: $i * 0.25s;
        }
      }

      &.show {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
      }

      button {
        cursor: pointer;
        position: relative;
        width: 20px;
        height: 20px;
        transition: transform var(--transition-duration) var(--transition-timing-function);

        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background-color: var(--primary-color);
          border: 2px solid rgba(var(--font-color-rgb), 0.2);
          border-radius: 100%;
          transform: translate(-50%, -50%);
          transition: border var(--transition-duration) var(--transition-timing-function),;
        }

        @include hover {
          transform: scale(1.12) translateY(-5px);

          &:before {
            border-color: var(--third-color);
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .colorChanger {
    display: flex;

    &__toggle {
      display: block;
    }

    &__list {
      margin-right: 10px;
    }
  }
}
</style>