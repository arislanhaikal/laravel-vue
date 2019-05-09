<template>
	<form @submit.prevent="search" method="post">
        <div class="input-group mb-3">
            <input type="text" v-model="keyword" class="form-control" placeholder="Search" aria-label="search" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-secondary" type="submit" id="button-addon2">Button</button>
            </div>
        </div>
	</form>
</template>

<script>
	export default {
		props: {
			limit: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {
				keyword: ''
			}
		},
		methods: {
			search() {
				this.$bus.$emit('search', this.keyword);
			}
		}
	}
</script>