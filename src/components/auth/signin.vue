<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <h2>Login</h2>
        <br>
        <div v-if="loggedIn" class="alert alert-danger" role="alert">Your E-Mail or password is incorrect. Please try again.</div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">email</i></span>
            </div>
            <input
                    type="email"
                    class="form-control"
                    placeHolder="E-Mail"
                    id="email"
                    @blur="$v.email.$touch()"
                    v-model="email"
            />
          </div>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">lock</i></span>
            </div>
            <input
                    type="password"
                    placeHolder="Password"
                    id="password"
                    @blur="$v.password.$touch()"
                    class="form-control"
                    v-model="password"
            />
          </div>
        </div>
        <div class="submit">
          <button class="btn btn-primary btn-block" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      loggedIn () {
        return this.$store.getters.isLoggedIn
      }
    },
    validations: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
        this.$store.dispatch('login', {email: formData.email, password: formData.password})
      }
    }
  }
</script>

<style lang="scss" scoped>
.signin-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input input {
  font: inherit;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
}

.input.invalid label {
  color: red;
}

.input.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}
</style>
