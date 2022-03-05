<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">{{ dataView.title }}</div>
      </v-col>
      <v-col cols="2">
        <v-btn
          v-if="file"
          block
          type="submit"
          form="saveFile"
          color="primary"
          v-text="dataView.targetButton"
        >
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-form @submit.prevent="saveFileUploaded" id="saveFile" autocomplete="off">
              <v-row>
                <v-col xs="12" sm="12" md="4">
                  <div class="d-flex flex-column align-center">
                    <div v-if="file">
                      <img
                        v-if="file.type === 'image/jpeg'"
                        :src="dataFile"
                        width="100px"
                      />
                      <img
                        v-else-if="file.type === 'image/png'"
                        :src="dataFile"
                        width="100px"
                      />
                      <img
                        v-else-if="file.type === 'image/bpm'"
                        :src="dataFile"
                        width="100px"
                      />
                      <v-text-field
                        v-else-if="file.type != 'image/png' || 'image/jpeg' || 'image/bpm' "
                        readonly
                        label="Archivo no desplegable"
                      >
                      </v-text-field>
                    </div>
                    <div v-else>
                      <img :src="'/img/File.png'" width="100px" />
                    </div>

                    <v-file-input
                      v-show="false"
                      ref="docFile"
                      v-model="file"
                      accept="application/vnd.ms-excel,
                              application/msword,application/pdf,
                              application/vnd.ms-powerpoint,
                              application/zip,text/csv,application/rtf,
                              image/png, image/jpeg , image/bpm"
                    >
                    </v-file-input>
                    <v-btn
                      color="primary"
                      class="mb-5 mt-5"
                      width="100%"
                      rounded
                      depressed
                      @click="onClickUploadButtom"
                    >
                      <span>Cargar</span>
                      
                    </v-btn>
                  </div>
                </v-col>
                <v-col xs="12" sm="12" md="8">
                  <v-text-field
                    v-if="file"
                    readonly
                    v-model="file.name"
                    id="inputName"
                    name="name"
                    label="Nombre del archivo"
                  >
                  </v-text-field>

                  <v-text-field
                    v-if="file"
                    readonly
                    v-model="file.size"
                    id="inputFilesize"
                    name="Filesize"
                    label="Tamaño del archivo bytes"
                  >
                  </v-text-field>
                  <v-text-field
                    v-if="file"
                    v-model="fileComments"
                    id="inputFileComments"
                    name="filecomments"
                    label="Anotaciones"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from 'luxon';
import uploadFile from "../../mixins/uploadFile";
export default {
  name: "SaveFileReportSupplyRequestOldSystem",
  mixins:[uploadFile], // docFile should be teh input Id name on v-file-input directive
  data() {
    return {
      fileComments: "" ,
      docFile:{
        _id:null,
        name:'',
        dataBaseName:null,
        size:0,
        lastModifiedDate:null,
        storedDate: null,
        storePath: null,
        group:'Supply Request Monthly Report',
        type:'',
        data:null,
        annotations:'',
        extension:'',
        extensionWithDot:''
      },


      dataView: {
        title: "",
        targetButton: "",
      },
      
    };
  },
  created() {
    this.dataView.title =
      "Agregar archivo de Reporte de Solicitudes de Suministro";
    this.dataView.targetButton = "Agregar";
  },
  methods: {
    
    saveFileUploaded() {
      this.docFile.name=this.file.name
      this.docFile.size= this.file.size
      this.docFile.lastModifiedDate= this.file.lastModifiedDate
      this.docFile.type= this.file.type
      this.docFile.data=this.dataFile
      this.docFile.annotations=this.fileComments
      this.$loader.activate('Guardando archivo...');
      Meteor.call('uploadedFile.save',this.docFile,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.users'});
        }
      });
    },
  },
};
</script>

<style scoped>
</style>