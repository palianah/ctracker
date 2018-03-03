<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <h2>Login</h2>
        <br>
        <p v-if="loggedIn" class="error">Your E-Mail or password is incorrect. Please try again.</p>
        <div class="input" :class="{invalid: $v.email.$error}">
          <input
                  type="email"
                  class="form-control"
                  placeHolder="E-Mail"
                  id="email"
                  @blur="$v.email.$touch()"
                  v-model="email">
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <input
                  type="password"
                  placeHolder="Password"
                  id="password"
                  @blur="$v.password.$touch()"
                  class="form-control"
                  v-model="password">
        </div>
        <div class="submit">
          <button class="btn btn-primary" type="submit">Submit</button>
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
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
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

.error {
  color: red;
}
</style>
