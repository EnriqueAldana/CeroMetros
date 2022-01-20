<template>
<v-list>
          <v-list-item class="mb-0 justify-space-between pl-3">

              <v-list-item-content class="pl-2">
                <v-list-item-title class="text-h3">
                <div class="text-center">
                <img src="/img/LogoCeroMts.png" alt="Logo Cero Mts" id="Logo0Mts" height="120px" />
                </div>
                  <!-- strong class="mr-1 font-weight-black">Cero metros</strong -->
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-card
            outlined
          >
          <v-card-text>
              <p>Usuario</p>
          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{user.profile.name}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{user.emails[0].address}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          </v-card-text>
          </v-card>
        </v-list>
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
