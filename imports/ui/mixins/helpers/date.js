export default {

    methods: {
        currentLocalDate(){
            const date= new Date();
            const offsetMs = date.getTimezoneOffset() * 60 * 1000;
            console.log('ofset en Horas ',date.getTimezoneOffset());
            const msLocal = date.getTime() - offsetMs;
            return new Date(msLocal);
        }
    }
}