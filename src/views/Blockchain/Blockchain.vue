<template>
	<router-view v-slot="{ Component }">
		<component :is="Component" />
	</router-view>
</template>

<script>
export default {
	name: "Blockchain",
	components: {},
	data() {
		return {};
	},
	methods: {
    },
};
</script>
<style scoped></style>