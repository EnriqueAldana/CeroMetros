export default {
    data(){
        return{
            file: null,
            photoFileUser : null,
        }
    },
    watch: {
        // El nombre de la funcion debera ser el de la variable por observar
        file(newFile){
            if(newFile && typeof (FileReader) != 'undefined'){
                const reader= new FileReader();
                reader.onload= function(ev){
                    this.user.profile.path=ev.target.result;
                    this.photoFileUser= ev.target.result;
                }.bind(this);
                reader.readAsDataURL(newFile);
            }
        }
    },
    methods:{
        onClickUploadButtom(){
            this.$refs.imageFile.$refs.input.click();
        }
    }
}