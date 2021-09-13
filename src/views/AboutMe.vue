<template>
  <section v-if="notes" id="aboutme">
    <h2 class="section--title">About Me</h2>
    <h3>
      Hi! My name is Jakub Soboczyński.
      <span>Please just read a few notes below!</span>
    </h3>
    <div class="wrapper">
      <Note v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </section>
</template>

<script>
import Note from '../components/Note.vue';
import Airtable from 'airtable';

export default {
  name: 'AboutMe',
  components: {
    Note,
  },
  data() {
    return {
      notes: [],
    };
  },
  mounted() {
    const base = new Airtable({ apiKey: 'keyARCmM79wgxzEKF' }).base('appQyH2lhdVfa8dLf');
    base('about_me').select({ view: 'Grid view' }).eachPage((records, fetchNextPage) => {
      const result = records.map(item => item.fields);
      this.notes.push(...result);
      fetchNextPage();
    }, (error) => {
      if (error) {
        console.error(error);
        return false;
      }
    });
  },
};
</script>
<style lang="scss" scoped>
@import '../global.scss';

#AboutMe {
  background-color: $background-secondary-color;
}

h3 {
  font-size: 1.8rem;
  font-weight: 300;
  font-variant: small-caps;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;

  & span {
    font-size: 1.1rem;
    font-variant: normal;
    display: block;
    margin-top: 5px;
  }
}

//* Mobile breakpoints

@media screen and (max-width: 575.98px) {
  h3 {
    font-size: 1.6rem;

    span {
      font-size: 1rem;
    }
  }
}

@media screen and (max-width: 419.98px) {
  h3 {
    font-size: 1.4rem;

    span {
      font-size: 0.9rem;
    }
  }
}

@media screen and (max-width: 374.98px) {
  h3 {
    font-size: 1.2rem;
  }
}
</style>
