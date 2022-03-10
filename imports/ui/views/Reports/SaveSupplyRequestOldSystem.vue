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
                    <div v-if="nuevo">
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
                      <img v-if="nuevo"
                      :src="'/img/File.png'" width="100px" />
                    </div>

                    <v-file-input
                      v-if="nuevo"
                      v-show="false"
                      ref="docFile"
                      :rules="rules"
                      :show-size="1000"
                      type="file"
                      v-model="file"
                      accept="application/vnd.ms-excel,
                              application/msword,application/pdf,
                              application/vnd.ms-powerpoint,
                              application/zip,application/rtf,
                              text/*,
                              image/*"
                    >
                    </v-file-input>
                    <v-btn
                      v-if="nuevo"
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
                    v-if="file || edit"
                    readonly
                    v-model="file.name"
                    id="inputName"
                    name="name"
                    label="Nombre del archivo"
                  >
                  </v-text-field>

                  <v-text-field
                    v-if="file || edit"
                    readonly
                    v-model="file.size"
                    id="inputFilesize"
                    name="Filesize"
                    label="Tamaño del archivo bytes"
                  >
                  </v-text-field>
                  <v-text-field
                    v-if="file || edit" 
                    v-model="fileComments"
                    id="inputFileComments"
                    name="filecomments"
                    label="Anotaciones"
                  >
                  </v-text-field>
                  <v-menu
                  v-if="file || edit"
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Fecha de expiración"
                      hint="formato dd-mm-aaaa"
                      readonly
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="pickerIni"
                    v-model="date"
                    no-title
                    locale="es-es"
                    show-current
                    show-adjacent-months
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
                

                 
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

import uploadFile from "../../mixins/uploadFile";

export default {
  name: "SaveSupplyRequestOldSystem",
  mixins:[uploadFile], // docFile should be teh input Id name on v-file-input directive
  data() {
    return {
      fileComments: "" ,
      edit:false,
      rules: [
        value => !value || value.size < 5000000 || 'Avatar size should be less than 10 MB!',
      ],
      nuevo:true,
      file:{
        name:'',
        size:'',
        fileComments:'',
        lastModifiedDate:'',
        type:''
      },
      docFile:{
        _id:null,
        name:'',
        dataBaseName:null,
        size:0,
        lastModifiedDate:null,
        storedDate: null,
        storePath: null,
        group:'SupplyRequestMonthlyReportOldsystem',
        type:'',
        data:null,
        annotations:'',
        extension:'',
        extensionWithDot:'',
        expireDate: this.date
      },
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      ),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
      ,
      menu1: false,
      dataView: {
        title: "",
        targetButton: "",
      },
      
    };
  },
  created() {
    // fecha propuesta de expiracion de 6 meses
    let currentDate = new Date(this.date)
    currentDate.setMonth(currentDate.getMonth()+6);
    this.date= currentDate.toISOString().substr(0, 10)

    if(this.$router.currentRoute.name.includes("create")){
      this.dataView.title="Agregar archivo de Reporte de Solicitudes de Suministro";
      this.dataView.targetButton="Agregar";
      this.edit=false
      this.nuevo=true
    }else if(this.$router.currentRoute.name.includes("edit")){
      this.dataView.title="Editar archivo de Reporte de Solicitudes de Suministro";
      this.dataView.targetButton="Actualizar";
      this.nuevo=false
      const tempRepor = this.$store.state.temporal.element;
      console.info("Edit report",tempRepor)
      this.docFile={
       _id:tempRepor._id,
        name:tempRepor.name,
        dataBaseName:tempRepor.dataBaseName,
        size:tempRepor.size,
        lastModifiedDate:tempRepor.lastModifiedDate,
        storedDate: tempRepor.storedDate,
        storePath: tempRepor.storePath,
        group:tempRepor.group,
        type:tempRepor.type,
        data: null,
        annotations:tempRepor.annotations,
        extension:tempRepor.extension,
        extensionWithDot:tempRepor.extensionWithDot,
        expireDate: tempRepor.expireDate
      }
      // Cargar el archivo NO IMPLEMENTADO para rendimiento
      this.edit=true
      this.file.name=this.docFile.name
      this.file.size= this.docFile.size
      this.fileComments=this.docFile.annotations
      this.date=this.formatDateView(this.docFile.expireDate)
    }

  },
  watch:{
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
      // Fijar fecha inicial permitida en calendario
    },
    file(val){
      console.info("Archivo:" , val)
      console.info("Contenido:", this.dataFile)
    }
  },
  methods: {
    saveFileUploaded() {
      if(this.edit){
        this.docFile.annotations=this.fileComments
        this.docFile.expireDate= this.date
      }else{
        this.docFile.name=this.file.name
        this.docFile.size= this.file.size
        this.docFile.lastModifiedDate= this.file.lastModifiedDate
        this.docFile.type= this.file.type
        this.docFile.data=this.dataFile
        this.docFile.annotations=this.fileComments
        this.docFile.expireDate= this.date
      }
      console.info("Archivo x guardar: ", this.docFile.data)
      this.$loader.activate('Guardando archivo...');
      Meteor.call('uploadedFile.save',this.docFile,(error,response) => {
        this.$loader.deactivate();
        if(error){
              this.$alert.showAlertSimple('error',error.reason);
        }else{
          this.$alert.showAlertSimple('success',response.message);
          this.$router.push({name: 'home.report.supplyrequest'});
        }
      });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },formatDateView(date) {
      if (!date) return null;
      const [day, month, year] = date.split("-");
      return `${year}-${month}-${day}`;
    }

  },
};
</script>

<style scoped>
</style> 