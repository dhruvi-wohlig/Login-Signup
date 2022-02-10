<template>
  <div>
    <h1>Login Here</h1>
    <form method="POST"  @submit.prevent="submit">      
        <input type="email" name="email" v-model.trim="$v.email.$model" placeholder="Email Id">
        <div class="error" v-if="!$v.email.required">Required field</div>
        <br>

        <input type="password" name="password" v-model.trim="$v.password.$model" placeholder="Enter Password">
        <div class="error" v-if="!$v.password.required">Required field</div>
        <br>

        <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Successfully Logged in!</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Incorrect username or password</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { required} from 'vuelidate/lib/validators';

export default {
    devServer: {
      proxy: 'http://localhost:3000'
    },
    data() {
      return {
        email: null,
        password: null,
        submitStatus: ''
      };
    },
    validations: {
      email:{
          required,
      },
      password:{
        required,
      }
    },
    methods: {
      routing()
      { 
        if(this.submitStatus==='OK')
        {  this.$router.push('/successfulPage')  }
      },
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
            url: 'http://localhost:3000/login/',
            data: { 
              email: this.email,
              password: this.password 
              },
            }
            const data = await axios.request(options)
            console.log(data.status)
            this.submitStatus = 'OK'
            console.log(this.submitStatus);
          }
           console.log(this.submitStatus);
           this.routing();
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