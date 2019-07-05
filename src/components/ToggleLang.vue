<template>
  <!-- v-for each lang in lang_supported ... -->
  <button role="button" aria-label="Set language" @click.prevent="toggleLang" class="toggle-lang">
    EN
  </button>
</template>

<script>
export default {
  lang: '',
  data() {
    return {
      lang: lang
    }
  },
  methods: {
    toggleLang(lang) {
      this.darkTheme = !this.darkTheme

      // This is using a script that is added in index.html
      window.__setPreferredLang(
        this.lang
      )
    }
  },
  mounted() {
    this.lang = window.__lang;
  }
}
</script>

<style lang="scss">
.toggle-lang {
  background-color: transparent;
  border: 0;
  color: var(--body-color);
  cursor: pointer;

  &:hover {
    opacity: .8
  }
  &:focus {
    outline: none;
  }
}
</style>
