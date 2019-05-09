<template>
	<div>
		<search></search>
		<div class="table-responsive-md">
			<div v-if="success" class="alert alert-success mt-3">
            Contact deleted!
      </div>
			<div v-if="errors" class="alert alert-danger mt-3">
            Contact error deleted!
      </div>
			<table class="table">
				<thead>
					<tr>
							<th scope="col">No</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Message</th>
							<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(contact, index) in contacts" :key="index">
							<td>{{ index+1 }}</td>
							<td>{{ contact.name }}</td>
							<td>{{ contact.email }}</td>
							<td>{{ contact.message }}</td>
							<td><button @click='deleteContact(contact.id, index)' type="button" class="btn btn-danger">Delete</button></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>

import Search from './SearchComponent.vue'

export default {
		data(){
			return {
				contacts: {},
				success: false,
				errors: false,
			}
		},
		components: {
			Search
		},
		mounted(){
			this.getContact();

			// listen when search
			this.$bus.$on('search', params => {
				this.getContact(params);
			});
		},
		methods: {
			deleteContact(id, index){
				if(confirm("Do you really want to delete?")){
					axios.delete('/api/contact/'+ id).then((resp) =>{
						this.contacts.splice(index, 1);
						this.success = true;
						this.errors = false;
					})
					.catch(error => {
						this.success = false;
						this.errors = true;
					});
				}
			},
			getContact(params = null) {
				axios.get('/api/contact', {
					params: {
						keywords: params
					}
				}).then(response => {
						this.contacts = response.data;
				});
			}
		}
}
</script>