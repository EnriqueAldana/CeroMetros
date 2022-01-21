<template>
  <v-navigation-drawer
    id="default-drawer"
    v-model="drawer"
    app
    width="360"
    permanent
  >
  <default-drawer-header />     
  <default-menu/>

   <!--  
    <div class="px-2">
      
      <v-divider class="mx-3 mb-2" />
      <v-list
          nav
          dense
        >
            <v-list-item v-for="option in options" :key="option.title" :to="{name:option.routeName}"
                       v-text="option.title">
                
            </v-list-item>

            
        </v-list>

    </div>
 -->

  </v-navigation-drawer>
</template>

<script>
// Utilities
import DefaultDrawerHeader from "./widgets/DrawerHeader";
import DefaultMenu from "./Menu"
export default {
  name: "DefaultDrawer",
  components: {
    DefaultDrawerHeader,
    DefaultMenu
  },
  data() {
    return {
      drawer:0,
      options: [],
      model: 1,
      
    };
  },
  
  
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
