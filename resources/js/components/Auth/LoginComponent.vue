<template>
    <div>
        <div class="alert alert-danger" v-if="error">
            <p>There was an error, unable to sign in with those credentials.</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>
</template>
<script>
  export default {
    data(){
        return {
            email: null,
            password: null,
            error: false
        }
    },
    methods: {
      login(){
        var app = this
        this.$auth.login({
            params: {
                email: app.email,
                password: app.password
            },
            success: function () {},
            error: function (resp) {
                this.$swal({
                    title: 'Error!',
                    text: resp.response.data.msg,
                    type: 'error',
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
            rememberMe: true,
            redirect: '/admin',
            fetchUser: true,
        });
      },
    }
  }
</script>