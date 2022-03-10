<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">Lista de reportes de solicitudes de suministro</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex flex-row-reverse mb-5">
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn v-can:create.hide="'workstations'" color="success" v-on="on" fab dark :to="{name:'home.report.supplyrequest.create'}">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Agregar archivo de reporte</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="16" sm="16" md="14" lg="12" xl="9">
        
        <v-data-table :headers="headers" :items="supplyRequestOldSystem" @dblclick:row="(event,{item})=>openEditReport(item)"
                      sort-by="name" class="elevation-1">
          <template v-slot:item.action="{item}">
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:edit.hide="'workstations'" color="info" v-on="on" small class="mr-2" @click="openEditReport(item)">
                  edit
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-icon v-can:delete.hide="'workstations'" color="error" v-on="on" small class="mr-2" @click="openRemoveModal(item)">
                  delete
                </v-icon>
              </template>
              <span>Eliminar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                
                <v-icon v-can:delete.hide="'workstations'" color="error" v-on="on" small class="mr-2" @click="gotoDownload(item)">
                  download
                </v-icon>
              </template>
              <span>Descargar</span>
            </v-tooltip>
          </template>
          <template v-slot:body.append="{isMobile}">
            <tr v-if="!isMobile">
              <td>
                <v-text-field v-model="headersFilter.name" type="text"
                              label="Nombre"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.size" type="text"
                              label="Tamaño"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.annotations" type="text"
                              label="Anotaciones"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="headersFilter.expireDate" type="text"
                              label="Fecha de expiración"></v-text-field>
              </td>
            </tr>
          </template>
        </v-data-table>
     </v-col>
    </v-row>
    <modal-remove ref="refModalRemove" v-bind:modalData="reportTemp"
                  @id_element="downloadReportFile"></modal-remove>
  </v-container>
</template>

<script>
import ModalRemove from "../../components/Utilities/Modals/ModalRemove";
import {UploadedFiles} from "../../../api/FileUploaded/FileUploaded"

import {mapMutations} from "vuex";
export default {
        name: 'ListSupplyRequestOldSystem',
        components: {
          ModalRemove
        },
        data() {
          return {
             headersFilter: {
                  name: '',
                  size: '',
                  annotations: '',
                  expireDate: ''
          },reportTemp: {
              preposition: 'el',
              typeElement: ' reporte de solicitudes ',
              mainNameElement: '',
              _id: null,
              element: {}
            }
          }
        },
        methods: {
          ...mapMutations('temporal',['setElement']),
            gotoDownload(item) {
             
              window.open(Meteor.settings.public.URL_REMOTE_FILE_SERVER+item.dataBaseName+item.extensionWithDot+"/"+item.name,'_blank');
              
            },
            openEditReport(report) {
              //Guardar en Vuex para recuperar en la vistad de company.save
              this.setElement(report);
              this.$router.push({name: 'home.report.supplyrequest.edit'});
            },
            openRemoveModal(report) {
              this.reportTemp.element = report;
              this.reportTemp._id = report._id;
              this.reportTemp.mainNameElement = report.name;
              this.$refs.refModalRemove.dialog = true;
            },
            deleteReportFile(idReport) {
              this.$loader.activate("Eliminando reporte de solicitudes....");
              Meteor.call('report.supply.request.old.system.delete',{idReport},(error,response)=>{
                this.$loader.deactivate();
                if(error){
                  this.$alert.showAlertSimple('error',error.reason);
                }else{
                  this.$alert.showAlertSimple('success',response.message);
                }
              });
            },
            downloadReportFile(idReport){
              this.$loader.activate("Eliminando reporte de solicitudes....");
              Meteor.call('uploadedFile.get',{idReport},(error,response)=>{
                this.$loader.deactivate();
                if(error){
                  this.$alert.showAlertSimple('error',error.reason);
                }else{
                  this.$alert.showAlertSimple('success',response.message);
                }
              });
            }
        },
        computed: {
          headers() {
            return [
              {
                value: 'name', text: 'Nombre del archivo', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.name.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'size', text: 'Tamaño del archivo bits', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.size.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'annotations', text: 'Anotaciones', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.annotations.toLocaleLowerCase()) !== -1;
                }
              },
              {
                value: 'expireDate', text: 'Fecha de expiracion (dia-mes-año)', sortable: true, filter: value => {
                  return value != null && typeof value === 'string' &&
                      value.toString().toLocaleLowerCase()
                          .indexOf(this.headersFilter.expireDate.toLocaleLowerCase()) !== -1;
                }
              },
              {value: 'action', text: 'Opciones', sortable: false}
            ]
          }
        },
        meteor:{
            $subscribe: {
              'uploadedFiles.list':function(){ 
                return ['SupplyRequestMonthlyReportOldsystem']
              }

            },
            supplyRequestOldSystem(){
              let recordsFiltered=UploadedFiles.find({group: 'SupplyRequestMonthlyReportOldsystem'}
                                       ,{}).fetch();
              
              
              recordsFiltered.map(rf=>{
                let dateTimeExpireDate=new Date(rf.expireDate);
                rf.expireDate=dateTimeExpireDate.getDate()+"-"+(parseInt(dateTimeExpireDate.getMonth())+1)+"-"+dateTimeExpireDate.getFullYear()
                rf.size=rf.size.toString()
              });
        
              return recordsFiltered
            }
        }  
}
</script>

<style scoped>

</style>