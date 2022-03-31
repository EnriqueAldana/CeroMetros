import { RequestsChartRepository } from './RequestsChart';
export default {

    validatePeriod(periodKey){

        let clavesPeriodo = ["HY", "US", "UM", "U3M", "U6M","UA","U2A"];

        if(clavesPeriodo.includes(periodKey))
            return
            throw new Meteor.Error('403', 'La clave para el periodo introducida no es valida');

    },
    

}