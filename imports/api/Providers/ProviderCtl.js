import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {Provider} from "./Provider";
import ProviderServ from "./ProviderServ";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'provider.save',
     mixins:[MethodHooks],
     permissions: [Permissions.PROVIDERS.CREATE.VALUE,Permissions.PROVIDERS.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(provider){
        try {
            
            check(provider,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                providerBussinessId: String,
                address: String,
                phones: String,
                web: String,
                email: String,
                isAvailable: Boolean
            });

        }catch ( exception){
            console.error('provider.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya proveedores con el mismo nombre y BussinesID
        ProviderServ.validateProviderBussinessId(provider.providerBussinessId,provider._id);
        ProviderServ.validateProviderName(provider.name,provider._id);
    },
    run(provider){
        const responseMessage = new ResponseMessage(); 
        try {
            if(provider._id !== null){
                Provider.update(provider._id,{
                    $set: {
                    name: provider.name,
                    name_full: provider.name_full,
                    providerBussinessId: provider.providerBussinessId,
                    address: provider.address,
                    phones: provider.phones,
                    web: provider.web,
                    email: provider.email,
                    isAvailable: provider.isAvailable
                    }
                });
                responseMessage.create('Se actualizó el proveedor exitosamente');
            }else{
                Provider.insert({
                    name: provider.name,
                    name_full: provider.name_full,
                    providerBussinessId: provider.providerBussinessId,
                    address: provider.address,
                    phones: provider.phones,
                    web: provider.web,
                    email: provider.email,
                    isAvailable: provider.isAvailable
                });
                responseMessage.create('Se insertó el proveedor exitosamente');
            }
        }catch ( exception){
            console.error('company.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el proveedor');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'provider.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.PROVIDERS.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idProvider }){
        try {
            check(idProvider, String);
        }catch (exception) {
            console.error('provider.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar al proveedor');
        }
        // validar que no sea posible eliminar un proveedor si hay un producto utilizandolo.
        // ToDo 
        const toUseInToProduct = 0;
        //CompanyServ.getUsersBycompany(idCompany);

        if (toUseInToProduct.length > 0){
            throw new Meteor.Error('403','No es posible elimiar al proveedor',
                'Hay al menos un producto utilizando al proveedor');
        }
    },
    run({ idProvider}){
        const responseMessage = new ResponseMessage();
        try {
            Provider.remove(idProvider);
                responseMessage.create('Proveedor eliminado exitosamente');
        }catch (exception) {
            console.error('provider.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar al proveedor');
        }

        return responseMessage;
    }
});
