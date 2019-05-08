<template>
    <form @submit.prevent="submit">
        <div v-if="success" class="alert alert-success mt-3">
            Message sent!
        </div>

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

        <button type="submit" class="btn btn-primary">Send message</button>

    </form>
</template>

<script>
export default {
    data() {
        return {
            fields: {},
            errors: {},
            success: false,
        }
    },
    methods: {
        submit() {
            this.errors = {};
            axios.post('/api/contact', this.fields).then(response => {
                this.fields = {};
                this.success = true;
            }).catch(error => {
                this.success = false;
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors || {};
                }
            });
        },
    }
}
</script>