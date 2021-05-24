<template>
  <v-dialog id="ModalProduct"  v-model="dialog">
     
         <v-grid :source="rows" :columns="columns"/>
        <v-btn color="default" text v-on:click="cancel">
          Cancelar
        </v-btn>
        <v-btn color="error" depressed @click="acept">
          Aceptar
        </v-btn>
  </v-dialog>
</template>

<script >
import VGrid from '@revolist/vue-datagrid';

export default {
  name: 'ModalProduct',
  props: ['modalData'],
  data() {
    return {
      columns: [
        { prop: 'name', name: 'First' },
        { prop: 'details', name: 'Second' },
      ],
      rows: [{ name: '1', details: 'Item 1' }],
      dialog: false
    }
  },
  methods: {
    acept() {
      //console.info('this.modalData ',this.modalData);
      //this.$emit('id_element', this.modalData._id);
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    }
  },
  components: { VGrid }
}
</script>

<style scoped>

</style>



