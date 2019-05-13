<template>
	<div>
		<search></search>
		<div class="table-responsive-md">
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
							<td>
								<router-link :to="{name: 'adminEdit', params: {id: contact.id}}" class="btn btn-secondary btn-sm">Edit</router-link>
								<button @click='deleteContact(contact.id, index)' type="button" class="btn btn-danger btn-sm">Delete</button>
							</td>
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
					this.$swal({
						title: 'Are you sure?',
						text: "You won't be able to revert this!",
						type: 'warning',
						showCancelButton: true,
					}).then((result) => {
						if (result.value) {
							axios.delete('/contact/'+ id).then((resp) =>{
								this.contacts.splice(index, 1);
								this.$swal({
									title: 'Success!',
									text: 'Pesan berhasil dihapus!',
									type: 'success',
									timer: 2000,
									showConfirmButton: false,
        						});
							})
							.catch(error => {
								this.$swal({
									title: 'Error!',
									text: 'Pesan gagal dihapus!',
									type: 'error',
									timer: 2000,
									showConfirmButton: false,
                				});
							});
						}
					})

			},
			getContact(params = null) {
				axios.get('/contact', {
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