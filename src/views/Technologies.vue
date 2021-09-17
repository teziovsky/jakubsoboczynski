<template>
  <section v-if="technologies" id="technologies">
    <h2 class="section--title">Technologies</h2>
    <div class="wrapper">
      <Technology
        v-for="technology in technologies"
        :key="technology.id" :technology="technology" />
    </div>
  </section>
</template>

<script>
import Technology from '../components/Technology.vue';
import Airtable from 'airtable';

export default {
  name: 'Technologies',
  components: {
    Technology,
  },
  data() {
    return {
      technologies: [],
    };
  },
  mounted() {
    const base = new Airtable({ apiKey: 'keyARCmM79wgxzEKF' }).base('appQyH2lhdVfa8dLf');
    base('technologies').select({ view: 'Grid view' }).eachPage((records, fetchNextPage) => {
      const result = records.map(item => item.fields);
      this.technologies.push(...result);
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

#Technologies {
  padding-bottom: 50px;
}
</style>
