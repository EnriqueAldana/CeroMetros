
import {Meteor} from "meteor/meteor";
import {Customer} from "./Customer";

export default {

    validateCustomerBussinessId(newCustomerBussinesId,idCustomer){

        const existsCustomer= Customer.findOne({customerBussinessId:newCustomerBussinesId});
        if(idCustomer !== null){  // actualizacion de Cliente
            const oldCustomer= Customer.findOne(idCustomer);
            if(oldCustomer.customerBussinessId !== newCustomerBussinesId && existsCustomer){
                throw new Meteor.Error('403', 'El nuevo RFC del cliente ya esta siendo usado');
            }
        }else if(existsCustomer){ // es compañia nuevo pero el CompanyBussinesId  ya existe.
                throw new Meteor.Error('403', 'El nuevo RFC del cliente ya esta siendo utilizado');

        }

    },
    validateCustomerName(newCustomerName,idCustomer){
        const existsCustomer= Customer.findOne({name:newCustomerName});
        if(idCustomer !== null){  // actualizacion de Cliente
            const oldCustomer= Customer.findOne(idCustomer);
            if(oldCustomer.name !== newCustomerName && existsCustomer){
                throw new Meteor.Error('403', 'El nuevo nombre del cliente ya esta siendo usado');
            }
        }else if(existsCustomer){ // es compañia nuevo pero el CompanyBussinesId  ya existe.
                throw new Meteor.Error('403', 'El nuevo nombre del cliente ya esta siendo utilizado');

        }
    },
    getOrdersByCustomer(idCustomer){
        //const company = Company.findOne(idCompany);
        return 0;
    }
}