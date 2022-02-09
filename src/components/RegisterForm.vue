<template>
  <div>
    <h1>Register Here</h1>
    <form method="POST"  @submit.prevent="submit">
        <input type="text" name="fname" v-model.trim="$v.fname.$model"  placeholder="First Name">
         <div class="error" v-if="!$v.fname.required">Field is required</div><br>
          <div class="error" v-if="!$v.fname.alpha">Only Characters</div>
          <div class="error" v-if="!$v.fname.minLength">Field must have at least 3 characters.</div>
        <br>
        
        <input type="text" name="lname" v-model.trim="$v.lname.$model" placeholder="Last Name">
        <div class="error" v-if="!$v.lname.required">Field is required</div><br>
        <div class="error" v-if="!$v.fname.alpha">Only Characters</div>     
        <br>

        <input type="tel" name="phone_no" v-model.trim="$v.phone_no.$model" placeholder="Mobile Number">
        <div class="error" v-if="!$v.phone_no.required">Field is required</div><br>
        <div class="error" v-if="!$v.phone_no.minLength">Field must have only 10 characters.</div>
        <div class="error" v-if="!$v.phone_no.maxLength">Field must have only 10 characters.</div>
               
        <br>
        
        <input type="email" name="email" v-model.trim="$v.email.$model" placeholder="Email Id">
        <div class="error" v-if="!$v.email.required">Field is required</div>
        <div class="error" v-if="!$v.email.email">Enter valid email address</div>
        <br>
        <br>

        <input type="password" name="password" v-model.trim="$v.password.$model" placeholder="Enter Password">
        <div class="error" v-if="!$v.password.required">Field is required</div>
        <div class="error" v-if="!$v.password.valid ">Minimum Length of password should be 8 and contain atleast 1 Upercase, 1 lowercase and 1 special character</div>
        <br>
        <br>
        <a href="wwww.google.com">
          <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
        </a>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'"> Sending... </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { required,alpha,numeric, maxLength, minLength,email} from 'vuelidate/lib/validators';

export default {
    devServer: {
      proxy: 'http://localhost:3000'
    },
    data() {
      return {
        fname: null,
        lname: null,
        phone_no: null,
        email: null,
        password: null,
        submitStatus: ''
      };
    },
    validations: {
      fname:{
          required,
          alpha,
          minLength:  minLength(3)
      },
      lname:{
        required,
        alpha
      },
      phone_no:{
          required,
          numeric,
          maxLength: maxLength(10),
          minLength: minLength(10)
      },
      email:{
          required,
          email
      },
      password:{
        required,
        minLength: minLength(8),
        valid:function(value){
          const containsUppercase = /[A-Z]/.test(value)
          const containsLowercase = /[a-z]/.test(value)
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return containsUppercase && containsLowercase && containsNumber && containsSpecial
        }  
      }
    },
    methods: {
      async submit() {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        }
        else {
          const options = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            url: 'http://localhost:3000/signup/',
            data: { 
              fname: this.fname,
              lname: this.lname,
              phone_no: this.phone_no,
              email: this.email,
              password: this.password 
              },
            }
            const data = await axios.request(options)
            console.log(data)
            this.submitStatus = 'PENDING'
            setTimeout(() => {
              this.submitStatus = 'OK'
            }, 5000)
          }
      }
    },
  }

</script>
<style>
 .error {
  color: red;
  font-size: 12px;
}
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}
div{
  text-align: center;
}
h1 {
  margin: 40px 0 10px;
}
</style>