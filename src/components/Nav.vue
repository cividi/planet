<template>
	<div class="nav">

		<ul class="nav__links">
			<li><g-link v-for="edge in $static.docs.edges" :key="edge.node.id" :to="edge.node.path">
				{{ edge.node.title }}
			</g-link></li>
		</ul>

	</div>
</template>

<static-query>
{
	docs: allDoc(sortBy: "position", order: ASC) {
		edges {
			node {
				id
				title
				path
				position
			}
		}
	}
}
</static-query>

<script>
export default {
	props: []
}
</script>

<style lang="scss">
.nav {
	margin: 0 auto;
	max-width: 500px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;

	&__image {
		border-radius: 100%;
		width: 90px;
		height: 90px;
		margin-bottom: 1em;
	}

	&__intro {
		opacity: .8;
	}

	&__site-title {
		font-size: 1.5em;
	}

	&__links {
		margin-top: -.5em;
		a {
			margin: 0 .5em;
			text-decoration: none;
			color: blue;
			border-bottom: 1px dashed blue;
		}
		list-style: none;
	}
}
</style>
