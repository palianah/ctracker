<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <h2>Register</h2>
        <br>
        <div class="input" :class="{invalid: $v.fullName.$error}">
          <input
                  type="text"
                  id="fullName"
                  placeHolder="Name"
                  @blur="$v.fullName.$touch()"
                  v-model="fullName">
        </div>

        <div class="input" :class="{invalid: $v.email.$error}">
          <input
                  type="email"
                  id="email"
                  placeHolder="E-Mail"
                  @blur="$v.email.$touch()"
                  v-model="email">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
        </div>
        <div class="input" :class="{invalid: $v.age.$error}">
          <input
                  type="number"
                  placeHolder="Age"
                  id="age"
                  @blur="$v.age.$touch()"
                  v-model.number="age">
          <p v-if="!$v.age.minVal">You have to be at least {{ $v.age.$params.minVal.min }} years old.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <input
                  type="password"
                  id="password"
                  placeHolder="Password"
                  @blur="$v.password.$touch()"
                  v-model="password">
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <input
                  type="password"
                  placeHolder="Confirm Password"
                  id="confirm-password"
                  @blur="$v.confirmPassword.$touch()"
                  v-model="confirmPassword">
        </div>
        <div class="input">
          <select id="country" v-model="country" class="form-control">
            <option value="select">Country</option>
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>

        <div class="form-check input inline" :class="{invalid: $v.terms.$error}">
          <input
                  type="checkbox"
                  id="terms"
                  @change="$v.terms.$touch()"
                  v-model="terms">
          <label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
          <button type="submit" :disabled="$v.$invalid" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    data () {
      return {
        fullName: "",
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'select',
        terms: false
      }
    },
    validations: {
      email: {
        required,
        email,
        unique: val => {
          if (val === '') return true
          return axios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
            .then(res => {
              return Object.keys(res.data).length === 0
            })
        }
      },
      fullName: {
        required
      },
      age: {
        required,
        numeric,
        minVal: minValue(18)
      },
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
//        sameAs: sameAs('password')
        sameAs: sameAs(vm => {
          return vm.password
        })
      },
      terms: {
        required: requiredUnless(vm => {
          return vm.country === 'germany'
        })
      }
    },
    methods: {
      onAddHobby () {
        const newHobby = {
          id: Math.random() * Math.random() * 1000,
          value: ''
        }
        this.hobbyInputs.push(newHobby)
      },
      onDeleteHobby (id) {
        this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
      },
      onSubmit () {
        const formData = {
          fullName: this.fullName,
          email: this.email,
          age: this.age,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country,
          terms: this.terms
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .signup-form {
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

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }
</style>
