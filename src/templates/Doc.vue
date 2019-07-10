<template>
  <Layout>
    <div class="doc-title">
      <h1 class="doc-title__text">
        {{ $page.doc.title }}
      </h1>
    </div>

    <div class="doc content-box">
      <div class="doc__content" v-html="$page.doc.content" />
    </div>
  </Layout>
</template>

<script>
export default {
  components: {
  },
  metaInfo () {
    return {
      title: this.$page.doc.title,
      meta: [
        {
          name: 'summary',
          content: this.$page.doc.summary
        }
      ]
    }
  }
}
</script>

<page-query>
query Doc ($path: String!) {
  doc: doc (path: $path) {
    title
    path
    summary
    content
  }
}
</page-query>

<style lang="scss">
.doc-title {
  padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
  text-align: center;
}

.doc {

  &__header {
    width: calc(100% + var(--space) * 2);
    margin-left: calc(var(--space) * -1);
    margin-top: calc(var(--space) * -1);
    margin-bottom: calc(var(--space) / 2);
    overflow: hidden;
    border-radius: var(--radius) var(--radius) 0 0;

    img {
      width: 100%;
    }

    &:empty {
      display: none;
    }
  }

  &__content {
    h2:first-child {
      margin-top: 0;
    }

    p:first-of-type {
      font-size: 1.2em;
      color: var(--title-color);
    }

    img {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      display: block;
      max-width: none;
    }
  }
}
</style>
