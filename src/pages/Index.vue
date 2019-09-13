<template>
  <Layout>
    <!-- Author intro -->
    <!-- <Author :show-title="false" /> -->

		<center>
			<g-image v-if='lightMode' class="logotype" src="~/assets/images/logo/cividi_icon_logotype_transparent_bg.png" blur="5" />
			<g-image v-else class="logotype" src="~/assets/images/logo/cividi_icon_logotype_white_bg.png" blur="5" />

			<p class="nav__intro">
				The <b><a href="https://cividi.ch">cividi</a></b> team blogs here.
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
		return { lightMode: true }
	},
	mounted () {
		this.lightMode = (window.__theme != 'dark');
		// Causes issues on Chrome
		// var self = this;
		// window.__onThemeChange = function() {
		// 	console.log('update...');
		// 	self.lightMode = (window.__theme != 'dark');
		// 	self.$forceUpdate;
		// };
	},
  metaInfo: {
    title: 'planet cividi'
  }
}
</script>
