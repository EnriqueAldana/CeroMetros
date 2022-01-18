<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="drawer"
    :right="$vuetify.rtl"

    app
    width="260"
    permanent
        expand-on-hover
  >
  <v-list>
          <v-list-item class="mb-0 justify-space-between pl-3">

              <v-list-item-content class="pl-2">
                <v-list-item-title class="text-h3">
                  <strong class="mr-1 font-weight-black">0m</strong>
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{user.profile.name}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{user.emails[0].address}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>


    <div class="px-2">
      <default-drawer-header />
      <v-divider class="mx-3 mb-2" />
      <v-list
          nav
          dense
        >
            <v-list-item v-for="option in options" :key="option.title" :to="{name:option.routeName}"
                       v-text="option.title">
                
            </v-list-item>

            
        </v-list>


      <!-- default-list :items="items" /-->
    </div>

    <template #append>
      <div class="pa-4 text-center">

      </div>
    </template>

    <div class="pt-12" />
  </v-navigation-drawer>
</template>

<script>
// Utilities
import DefaultDrawerHeader from "./widgets/DrawerHeader";
import DefaultList from "./List";
import AppBtn from "../../components/App/Btn.vue"
export default {
  name: "DefaultDrawer",
  components: {
    DefaultDrawerHeader,
    DefaultList,
    AppBtn,
  },
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
      },
      optionSelected: 0,
      options: [],
      dark: false,
      gradient: "0",
      drawer: null,
      drawerImage: true,
      mini: false,
      items: [
        {
          title: "Bienvenido",
          icon: "mdi-view-dashboard",
          to: "/",
        },
        {
          title: "Perfil del usuario",
          icon: "mdi-account",
          to: "{name:'home.account'}",
          group:"1",
        },
        {
          title: "Tablas regulares",
          icon: "mdi-clipboard-outline",
          to: "/tables/regular/",
          group:"1",
        },
        {
          title: "Typography",
          icon: "mdi-format-font",
          to: "/components/typography/",
        },
        {
          title: "Icons",
          icon: "mdi-chart-bubble",
          to: "/components/icons/",
        },
        {
          title: "Google Maps",
          icon: "mdi-map-marker",
          to: "/maps/google/",
        },
        {
          title: "Notifications",
          icon: "mdi-bell",
          to: "/components/notifications/",
        },
      ],
      
    };
  },
  created() {
    const user= this.$store.state.auth.user;
      this.user= {
        _id: user._id,
        username: user.username,
        emails: user.emails,
        profile: user.profile
      }

    Meteor.call("user.getSystemOptions", null, (error, response) => {
      if (error) {
        this.$alert.showAlertSimple("error", error.reason);
      } else {
        this.options = response.data;
        console.log("opciones menu ",this.options)
        this.updateSelectedOption();
      }
    });
    
  },
  watch: {
    $route() {
      this.updateSelectedOption();
    },
  },
  methods: {
    goToView(option) {
      this.$router.push({ name: option.routeName });
    },
    updateSelectedOption() {
      const optionSelected = this.options.find(
        (option) => option.routeName === this.$route.name
      );
      this.optionSelected = optionSelected
        ? this.options.indexOf(optionSelected)
        : this.optionSelected;
    },
  }
  
};
</script>

<style lang="sass">
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
</style>
