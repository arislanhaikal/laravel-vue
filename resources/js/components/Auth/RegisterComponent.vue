<template>
    <div>
        <div class="alert alert-danger" v-if="error && !success">
            There was an error, unable to complete registration.
        </div>
        <div class="alert alert-success" v-if="success">
            Registration completed. You can now <router-link :to="{name:'login'}">sign in.</router-link>
        </div>
        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" class="form-control" v-bind:class="{ 'is-invalid': error && errors.name }" v-model="name" required>
                <span class="invalid-feedback" v-if="error && errors.name">{{ errors.name[0] }}</span>
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="form-control" v-bind:class="{ 'is-invalid': error && errors.email }" placeholder="user@example.com" v-model="email" required>
                <span class="invalid-feedback" v-if="error && errors.email">{{ errors.email[0] }}</span>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-bind:class="{ 'is-invalid': error && errors.password }" v-model="password" required>
                <span class="invalid-feedback" v-if="error && errors.password">{{ errors.password[0] }}</span>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                name: '',
                email: '',
                password: '',
                error: false,
                errors: {},
                success: false
            };
        },
        methods: {
            register(){
                var app = this
                this.$auth.register({
                    data: {
                        name: app.name,
                        email: app.email,
                        password: app.password
                    },
                    success: function () {
                        app.success = true
                    },
                    error: function (resp) {
                        app.error = true;
                        app.errors = resp.response.data.errors;
                    },
                    redirect: null
                });
            }
        }
    }
</script>