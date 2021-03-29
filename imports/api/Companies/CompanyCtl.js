import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {Company} from "./Company";
import CompanyServ from "./CompanyServ";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'company.save',
     mixins:[MethodHooks],
     permissions: [Permissions.COMPANIES.CREATE.VALUE,Permissions.COMPANIES.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(company){
        try {
            console.log("Obj Empresa",company);
            check(company,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                companyBussinessId: String,
                address: String,
                phones: String,
                web: String,
                email: String,
                isAvailable: Boolean
            });

        }catch ( exception){
            console.error('company.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya compañias con el mismo nombre y BussinesID
        CompanyServ.validateCompanyBussinessId(company.companyBussinessId,company._id);
        CompanyServ.validateCompanyName(company.name,company._id);
    },
    run(company){
        const responseMessage = new ResponseMessage(); 
        try {
            if(company._id !== null){
                Company.update(company._id,{
                    $set: {
                    name: company.name,
                    name_full: company.name_full,
                    companyBussinessId: company.companyBussinessId,
                    address: company.address,
                    phones: company.phones,
                    web: company.web,
                    email: company.email,
                    isAvailable: company.isAvailable
                    }
                });
                responseMessage.create('Se actualizó la empresa exitosamente');
            }else{
                Company.insert({
                    name: company.name,
                    name_full: company.name_full,
                    companyBussinessId: company.companyBussinessId,
                    address: company.address,
                    phones: company.phones,
                    web: company.web,
                    email: company.email,
                    isAvailable: company.isAvailable
                });
                responseMessage.create('Se insertó la empresa exitosamente');
            }
        }catch ( exception){
            console.error('company.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la empresa');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'company.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.COMPANIES.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idCompany }){
        try {
            check(idCompany, String);
        }catch (exception) {
            console.error('company.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar la compañia');
        }
        // validar que no sea posible eliminar una empresa si hay un usuario utilizandolo.
        const userWithCompany = CompanyServ.getUsersBycompany(idCompany);

        if (userWithCompany.length > 0){
            throw new Meteor.Error('403','No es posible elimiar la empresa',
                'Hay al menos un usuario utilizando la empresa');
        }
    },
    run({ idCompany }){
        const responseMessage = new ResponseMessage();
        try {
                Company.remove(idCompany);
                responseMessage.create('Compañia eliminada exitosamente');
        }catch (exception) {
            console.error('profile.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la empresa');
        }

        return responseMessage;
    }
});
