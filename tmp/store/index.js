export const state = () => ({
  socialLinks: [],
});

export const getter = {
  getSocialLinks(state) {
    return state.socialLinks;
  },
};

export const mutations = {
  SET_SOCIAL_LINKS(state, payload) {
    state.socialLinks = payload;
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { $content }) {
    const socialLinks = await $content("social-links").sortBy("sort").fetch();
    commit("SET_SOCIAL_LINKS", socialLinks);
  },
};
