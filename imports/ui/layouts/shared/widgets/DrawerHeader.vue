<template>
</template>

<script>
  // Utilities
import {mapMutations} from 'vuex';

  export default {
    name: 'DefaultDrawerHeader',
  data() {
    return {
      user: {
        _id: null,
        username: null,
        emails: [{address: null, verified: false}],
        profile: {
          profile: null,
          name: null,
          path: null
        }
      }
    }
  },
  created() {
  const user= this.$store.state.auth.user;
      this.user= {
        _id: user._id,
        username: user.username,
        emails: user.emails,
        profile: user.profile
      }
  console.log("Usuario",this.user)
  },
   methods:{
    ...mapMutations('auth',['setUser']),
  }
  }
</script>
