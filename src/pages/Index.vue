<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <!-- <Author :show-title="false" /> -->

		<center>
			<a href="https://cividi.ch">
				<g-image v-if='lightMode' class="logotype" src="~/assets/images/logo/cividi_logotype_white.png" blur="5" />
				<g-image v-else class="logotype" src="~/assets/images/logo/cividi_logotype_primary.png" blur="5" />
			</a>

			<p class="nav__intro">
				The <b><a href="https://cividi.ch">cividi</a></b> team blog.
			</p>
		</center>

    <!-- <Nav /> -->

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" v-if="edge.node.published" :key="edge.node.id" :post="edge.node"/>
    </div>

  </Layout>
</template>

<style>
.nav__intro { margin: 1em 0 5em; }
</style>

<page-query>
{
  posts: allPost {
    edges {
      node {
        id
        title
        path
        lang
        tags {
          id
          title
          path
        }
        date (format: "D. MMMM YYYY")
        timeToRead
        published
        description
        coverImage (width: 770, height: 380, blur: 10)
        ...on Post {
            id
            title
            path
        }
      }
    }
  }
}
</page-query>

<script>
// import Nav from '~/components/Nav.vue'
import Author from '~/components/Author.vue'
import PostCard from '~/components/PostCard.vue'

export default {
  components: {
    Author,
    // Nav,
    PostCard
  },
	data () {
		return {
			lightMode: (window.__theme != 'dark')
		}
	},
  metaInfo: {
    title: '(cividi)'
  }
}
</script>
