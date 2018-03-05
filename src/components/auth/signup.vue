<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <h2>Register</h2>
        <br>
        <div class="input" :class="{invalid: $v.fullName.$error}">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">face</i></span>
            </div>
            <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    placeHolder="Name"
                    @blur="$v.fullName.$touch()"
                    v-model="fullName"
            />
          </div>
        </div>
        <div class="input" :class="{invalid: $v.email.$error}">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">email</i></span>
            </div>
            <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeHolder="E-Mail"
                    @blur="$v.email.$touch()"
                    v-model="email"
            />
          </div>

          <div class="alert alert-danger margin-top" v-if="!$v.email.email">
            Please provide a valid email address.
          </div>
        </div>
        <div class="input">
          <datepicker
              bootstrap-styling=true
              calendar-button-icon-content="cake"
              calendar-button-icon="material-icons"
              calendar-button=true
              v-model="birthday"
              placeholder="Birthday"
              required=true
              language="de"></datepicker>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">lock</i></span>
            </div>
            <input
                    class="form-control"
                    type="password"
                    id="password"
                    placeHolder="Password"
                    @blur="$v.password.$touch()"
                    v-model="password"
            />
          </div>
          <div class="alert alert-danger margin-top" v-if="!$v.password.minLen">
            Your Password must have a minlength of {{ $v.password.$params.minLen.min }}.
          </div>
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">lock</i></span>
            </div>
            <input
                    class="form-control"
                    type="password"
                    placeHolder="Confirm Password"
                    id="confirm-password"
                    @blur="$v.confirmPassword.$touch()"
                    v-model="confirmPassword"
            />
          </div>
        </div>
        <div class="input">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="material-icons">flight_land</i></span>
            </div>
            <select id="country" v-model="country" class="form-control">
              <option value="select">Country</option>
              <option value="usa">USA</option>
              <option value="india">India</option>
              <option value="uk">UK</option>
              <option value="germany">Germany</option>
            </select>
          </div>
        </div>

        <div class="submit">
          <button type="submit" :disabled="$v.$invalid" class="btn btn-primary btn-block">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker';

  export default {
    data () {
      return {
        fullName: "",
        email: '',
        birthday: null,
        password: '',
        confirmPassword: '',
        country: 'select'
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
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
//        sameAs: sameAs('password')
        sameAs: sameAs(vm => {
          return vm.password
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
          birthday: this.birthday,
          password: this.password,
          confirmPassword: this.confirmPassword,
          country: this.country
        }
        console.log(formData)
        this.$store.dispatch('signup', formData)
      }
    },
    components: {
      Datepicker
    }
  }
</script>

<style lang="scss">
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

  .invalid .input-group-text {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .form-control[readonly] {
    background-color: transparent !important;
  }

  .vdp-datepicker__calendar-button {
    display: flex;
    align-items: center;
    padding: .375rem .75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: .25rem;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .margin-top {
    margin-top: 15px;
  }
</style>
