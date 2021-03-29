
import {Meteor} from "meteor/meteor";
import {Company} from "./Company";

export default {

    validateCompanyBussinessId(newCompanyBussinesId,idCompany){

        const existsCompany= Company.findOne({companyBussinessId:newCompanyBussinesId});
        if(idCompany !== null){  // actualizacion de Compañia
            const oldCompany= Company.findOne(idCompany);
            if(oldCompany.companyBussinessId !== newCompanyBussinesId && existsCompany){
                throw new Meteor.Error('403', 'El nuevo RFC de empresa ya esta siendo usado');
            }
        }else if(existsCompany){ // es compañia nuevo pero el CompanyBussinesId  ya existe.
                throw new Meteor.Error('403', 'El nuevo RFC de empresa  ya esta siendo utilizado');

        }

    },
    validateCompanyName(newCompanyName,idCompany){
        const existsCompany= Company.findOne({name:newCompanyName});
        if(idCompany !== null){  // actualizacion de Compañia
            const oldCompany= Company.findOne(idCompany);
            if(oldCompany.name !== newCompanyName && existsCompany){
                throw new Meteor.Error('403', 'El nuevo nombre de empresa ya esta siendo usado');
            }
        }else if(existsCompany){ // es compañia nuevo pero el CompanyBussinesId  ya existe.
                throw new Meteor.Error('403', 'El nuevo nombre de empresa  ya esta siendo utilizado');

        }
    },
    getUsersBycompany(idCompany){
        const company = Company.findOne(idCompany);
        return Meteor.users.find({'companyName':company.name}).fetch();
    }
}