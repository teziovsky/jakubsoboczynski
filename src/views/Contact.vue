<template>
  <section id="Contact">
    <h2 class="section--title">Contact</h2>
    <p class="contact__info">Don't forget to leave me a message!</p>
    <form
      id="form"
      action="https://formspree.io/xaypgwvk"
      autocomplete="off"
      class="form"
      method="POST"
      @submit.prevent="sendEmail"
    >
      <input
        v-model="email"
        :class="{ error: $v.email.$error }"
        class="form__input mail"
        placeholder="email"
        type="email"
        @input="$v.email.$touch()"
      />
      <transition name="fade">
        <span v-if="$v.email.$dirty && !$v.email.required" class="error">email is required.</span>
        <span v-if="$v.email.$dirty && !$v.email.email" class="error">
          please write correct address email.
        </span>
      </transition>
      <input
        v-model="title"
        :class="{ error: $v.title.$error }"
        class="form__input title"
        placeholder="title"
        type="text"
        @input="$v.title.$touch()"
      />
      <transition name="fade">
        <span v-if="$v.title.$dirty && !$v.title.required" class="error">title is required.</span>
        <span v-if="$v.title.$dirty && !$v.title.minLength" class="error">
          title must have at least {{ $v.title.$params.minLength.min }} letters.
        </span>
      </transition>
      <textarea
        v-model="message"
        :class="{ error: $v.message.$error }"
        class="form__input message"
        placeholder="message"
        @input="$v.message.$touch()"
      />
      <transition name="fade">
        <span v-if="$v.message.$dirty && !$v.message.required" class="error">
          message is required.
        </span>
        <span v-if="$v.message.$dirty && !$v.message.minLength" class="error">
          title must have at least
          {{ $v.message.$params.minLength.min }} letters.
        </span>
      </transition>
      <button :disabled="$v.$invalid" class="form__submit" type="submit">send</button>
    </form>
    <footer class="footer">
      <p class="footer__separator">
        ~
        <br />
        ~
      </p>
      <p class="footer__copy">&copy; 2020 | Designed by Jakub Soboczyński</p>
      <ul class="footer__links">
        <li
          v-for="link in social_links"
          :key="link.href"
          :data-aos-delay="link.aos_delay"
          class="footer__links__item"
          data-aos="flip-left"
          data-aos-anchor-placement="top-bottom"
        >
          <a :alt="link.name" :href="link.href" :name="link.name">
            <svg
              fill="none"
              height="36"
              viewBox="0 0 36 36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="link.svg_path_d" :fill="link.svg_path_fill" />
            </svg>
            <span class="sr-only">{{ link.name }}</span>
          </a>
        </li>
      </ul>
    </footer>
  </section>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { email, minLength, required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  name: 'Contact',
  data() {
    return {
      email: '',
      title: '',
      message: '',
      social_links: [
        {
          id: 1,
          name: 'Github',
          aos_delay: '200',
          href: 'https://github.com/teziovsky',
          svg_path_d:
            'M0 0V36H36V0H0ZM21.801 29.385C21.192 29.502 21 29.1285 21 28.809V25.5165C21 24.396 20.607 23.667 20.175 23.295C22.848 22.998 25.656 21.9825 25.656 17.3745C25.656 16.0635 25.1895 14.9925 24.42 14.154C24.5445 13.851 24.9555 12.63 24.3015 10.9785C24.3015 10.9785 23.295 10.656 21.0045 12.2085C20.046 11.9385 19.02 11.808 18 11.802C16.98 11.8065 15.954 11.9385 14.9955 12.2055C12.7035 10.653 11.6955 10.9755 11.6955 10.9755C11.0445 12.6285 11.4555 13.848 11.58 14.1525C10.812 14.9925 10.344 16.062 10.344 17.373C10.344 21.969 13.1445 22.9995 15.8115 23.304C15.468 23.604 15.1575 24.132 15.0495 24.909C14.364 25.215 12.6285 25.7445 11.5575 23.91C11.5575 23.91 10.923 22.758 9.717 22.6725C9.717 22.6725 8.547 22.6575 9.6345 23.403C9.6345 23.403 10.422 23.772 10.968 25.158C10.968 25.158 11.6625 27.3 15 26.574V28.8075C15 29.124 14.8065 29.496 14.208 29.385C9.438 27.7995 6 23.301 6 18C6 11.3715 11.373 6 18 6C24.627 6 30 11.3715 30 18C30 23.2995 26.5665 27.7965 21.801 29.385Z',
          svg_path_fill: '#d4d4dc',
        },
        {
          id: 2,
          name: 'Linkedin',
          aos_delay: '400',
          href: 'https://pl.linkedin.com/in/jakubsoboczynski',
          svg_path_d:
            'M0 0V36H36V0H0ZM12 28.5H7.5V12H12V28.5ZM9.75 10.098C8.301 10.098 7.125 8.913 7.125 7.452C7.125 5.991 8.301 4.806 9.75 4.806C11.199 4.806 12.375 5.991 12.375 7.452C12.375 8.913 11.2005 10.098 9.75 10.098ZM30 28.5H25.5V20.094C25.5 15.042 19.5 15.4245 19.5 20.094V28.5H15V12H19.5V14.6475C21.5955 10.7685 30 10.482 30 18.3615V28.5Z',
          svg_path_fill: '#d4d4dc',
        },
        {
          id: 3,
          name: 'Facebook',
          aos_delay: '600',
          href: 'https://facebook.com/teziovsky',
          svg_path_d:
            'M0 0V36H36V0H0ZM24 10.5H21.1155C20.1915 10.5 19.5 10.878 19.5 11.8335V13.5H24L23.6415 18H19.5V30H15V18H12V13.5H15V10.6155C15 7.5825 16.596 6 20.1915 6H24V10.5Z',
          svg_path_fill: '#d4d4dc',
        },
        {
          id: 4,
          name: 'Instagram',
          aos_delay: '800',
          href: 'https://www.instagram.com/teziovsky',
          svg_path_d:
            'M22.0005 18C22.0005 20.2095 20.2095 22.0005 18 22.0005C15.7905 22.0005 13.9995 20.211 13.9995 18C13.9995 15.7905 15.7905 13.9995 18 13.9995C20.2095 13.9995 22.0005 15.7905 22.0005 18ZM27.7695 13.152C27.8265 14.4165 27.8385 14.796 27.8385 18C27.8385 21.204 27.8265 21.5835 27.7695 22.8495C27.6195 26.0745 26.106 27.621 22.851 27.768C21.585 27.825 21.2055 27.8385 18 27.8385C14.796 27.8385 14.415 27.8265 13.152 27.7695C9.891 27.621 8.3805 26.0715 8.2335 22.851C8.175 21.5835 8.1615 21.204 8.1615 18C8.1615 14.796 8.175 14.4165 8.232 13.152C8.3805 9.924 9.8955 8.3805 13.1505 8.2335C14.4165 8.175 14.796 8.163 18 8.163C21.204 8.163 21.585 8.175 22.8495 8.232C26.1015 8.3805 27.6195 9.924 27.7695 13.152ZM24.162 18C24.162 14.5965 21.402 11.838 18 11.838C14.5965 11.838 11.838 14.5965 11.838 18C11.838 21.4035 14.598 24.162 18 24.162C21.4035 24.162 24.162 21.4035 24.162 18ZM25.845 11.595C25.845 10.8 25.2 10.155 24.405 10.155C23.61 10.155 22.965 10.8 22.965 11.595C22.965 12.39 23.61 13.035 24.405 13.035C25.2015 13.035 25.845 12.39 25.845 11.595ZM36 0V36H0V0H36ZM30 18C30 14.742 29.9865 14.3325 29.928 13.053C29.7315 8.7 27.3105 6.273 22.9485 6.0735C21.6675 6.0135 21.2595 6 18 6C14.7405 6 14.334 6.0135 13.053 6.072C8.694 6.2715 6.273 8.6895 6.072 13.0515C6.0135 14.3325 6 14.742 6 18C6 21.2595 6.0135 21.6675 6.072 22.947C6.273 27.306 8.691 29.7285 13.053 29.928C14.334 29.9865 14.7405 30 18 30C21.2595 30 21.6675 29.9865 22.9485 29.928C27.3015 29.7285 29.7315 27.3105 29.928 22.947C29.9865 21.6675 30 21.2595 30 18Z',
          svg_path_fill: '#d4d4dc',
        },
      ],
    };
  },
  methods: {
    sendEmail() {
      axios
        .post('https://formspree.io/xaypgwvk', {
          name: this.email,
          from: this.email,
          _subject: `${this.title}`,
          message: this.message,
        })
        .then(() => {
          this.formReset();
        });
    },

    formReset() {
      const form = document.getElementById('form');
      form.reset();
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    title: {
      required,
      minLength: minLength(3),
    },
    message: {
      required,
      minLength: minLength(3),
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.5s, opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.contact__info {
  font-size: 1.4rem;
  text-align: center;
  font-weight: 300;
  margin: 15px 0 20px;
}

span {
  max-height: 30px;

  &.error {
    color: #f08080;
    font-size: 0.8rem;
    font-style: italic;
  }
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;

  &__input {
    font: inherit;
    padding: 12.5px 30px 12.5px 50px;
    margin: 10px 0;
    border: none;
    border-bottom: 2px solid $text-primary-color;
    color: $text-primary-color;
    font-size: 1rem;
    transition: border 0.5s, color 0.5s ease;

    &:hover,
    &:focus {
      border-color: $text-third-color;
      outline: none;
    }

    &::placeholder {
      color: rgba($color: $text-primary-color, $alpha: 0.5);
    }

    &.error {
      border-color: red;
    }

    &.mail {
      background: url('../assets/inputs/Email_ico.svg') no-repeat scroll 10px 12px;
      background-size: 20px 20px;
    }

    &.title {
      background: url('../assets/inputs/Title_ico.svg') no-repeat scroll 9px 11px;
      background-size: 23px 23px;
    }

    &.message {
      background: url('../assets/inputs/Message_ico.svg') no-repeat scroll 11px 13px;
      background-size: 18px 18px;
      min-height: 150px;
      max-height: 450px;
      overflow: auto;
      resize: none;
    }
  }

  &__submit {
    border: 1px solid $text-primary-color;
    background: none;
    color: $text-primary-color;
    text-transform: uppercase;
    width: 170px;
    height: 40px;
    margin: 20px auto;
    transition: border 0.25s, color 0.25s ease;

    &:disabled {
      border: 1px solid rgba($color: $text-primary-color, $alpha: 0.3);
      color: rgba($color: $text-primary-color, $alpha: 0.3);
    }

    &:hover:enabled,
    &:focus:enabled {
      outline: none;
      border-width: 2px;
      border-color: $text-third-color;
      color: $text-third-color;
      cursor: pointer;
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__separator {
    line-height: 20%;
    margin-top: 30px;
    font-size: 2rem;
  }

  &__copy {
    margin: 25px 0;
    font-size: 0.8rem;
    font-variant: small-caps;
    font-weight: 500;
  }

  &__links {
    display: flex;
    list-style: none;
    margin-bottom: 30px;

    &__item {
      margin: 0 10px;

      & > a {
        width: 30px;
        height: 30px;
        display: block;

        &:hover svg path,
        &:focus svg path {
          fill: #feda6a;
        }

        & svg {
          width: 30px;
          height: 30px;

          & path {
            transition: fill 0.25s ease;
          }
        }
      }
    }
  }
}

//* Mobile breakpoints

@media screen and (max-width: 767.98px) {
  .contact__info {
    font-size: 1.2rem;
  }

  .form {
    width: 90%;
  }
}

@media screen and (max-width: 374.98px) {
  .contact__info {
    font-size: 1rem;
  }

  .footer {
    &__links__item {
      margin: 0 5px;

      & > a {
        width: 25px;
        height: 25px;
      }

      & svg {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
