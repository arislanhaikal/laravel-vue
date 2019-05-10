<template>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" name="name" id="name" v-model="fields.name" />
            <div v-if="errors && errors.name" class="text-danger">{{ errors.name[0] }}</div>
        </div>

        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" name="email" id="email" v-model="fields.email" />
            <div v-if="errors && errors.email" class="text-danger">{{ errors.email[0] }}</div>
        </div>

        <div class="form-group">
            <label for="message">Message</label>
            <textarea class="form-control" id="message" name="message" rows="5" v-model="fields.message"></textarea>
            <div v-if="errors && errors.message" class="text-danger">{{ errors.message[0] }}</div>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="!isValidForm">Send message</button>

    </form>
</template>

<script>
export default {
    data() {
        return {
            fields: {},
            errors: {},
        }
    },
    mounted(){
        this.getContact();
    },
    methods: {
        submit() {
            this.errors = {};
            let id = this.$route.params.id;
            axios.put('/api/contact/' + id, this.fields).then(response => {
                this.fields = {};
                this.$swal({
                    title: 'Success!',
                    text: 'Pesan berhasil di edit!',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
                this.$router.replace('/admin');
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors || {};
                }
            });
        },

        getContact() {
            let id = this.$route.params.id;
            axios.get('/api/contact/' + id).then(response => {
                this.fields = response.data;
            })
            .catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors || {};
                }
            });
        }
    },
    computed: {
        isValidForm() {
            return this.fields.name && this.fields.email && this.fields.message;
        }
    },
}
</script>