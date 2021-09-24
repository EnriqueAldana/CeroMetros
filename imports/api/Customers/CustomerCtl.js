import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {Customer} from "./Customer";
import CustomerServ from "./CustomerServ";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'customer.save',
     mixins:[MethodHooks],
     permissions: [Permissions.CUSTOMERS.CREATE.VALUE,Permissions.CUSTOMERS.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(customer){
        try {
            console.log("Obj Cliente",customer);
            check(customer,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                customerBussinessId: String,
                address: String,
                phones: String,
                web: String,
                email: String,
                isAvailable: Boolean
            });

        }catch ( exception){
            console.error('customer.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya compañias con el mismo nombre y BussinesID
        CustomerServ.validateCustomerBussinessId(customer.customerBussinessId,customer._id);
        CustomerServ.validateCustomerName(customer.name,customer._id);
    },
    run(customer){
        const responseMessage = new ResponseMessage(); 
        try {
            if(customer._id !== null){
                Customer.update(customer._id,{
                    $set: {
                    name: customer.name,
                    name_full: customer.name_full,
                    companyBussinessId: customer.customerBussinessId,
                    address: customer.address,
                    phones: customer.phones,
                    web: customer.web,
                    email: customer.email,
                    isAvailable: customer.isAvailable
                    }
                });
                responseMessage.create('Se actualizó el cliente exitosamente');
            }else{
                Customer.insert({
                    name: customer.name,
                    name_full: customer.name_full,
                    customerBussinessId: customer.customerBussinessId,
                    address: customer.address,
                    phones: customer.phones,
                    web: customer.web,
                    email: customer.email,
                    isAvailable: customer.isAvailable
                });
                responseMessage.create('Se insertó el cliente exitosamente');
            }
        }catch ( exception){
            console.error('customer.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el cliente');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'customer.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.CUSTOMERS.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idCustomer }){
        try {
            check(idCustomer, String);
        }catch (exception) {
            console.error('customer.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el cliente');
        }
        // ToDo validar que no sea posible eliminar una empresa si hay un usuario utilizandolo.
        const orderWithCustomer = CustomerServ.getOrdersByCustomer(idCustomer);

        if (orderWithCustomer > 0){
            throw new Meteor.Error('403','No es posible eliminar el cliente',
                'Hay al menos un pedido utilizando el cliente');
        }
    },
    run({ idCustomer }){
        const responseMessage = new ResponseMessage();
        try {
            Customer.remove(idCustomer);
                responseMessage.create('Cliente eliminado exitosamente');
        }catch (exception) {
            console.error('customer.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el cliente');
        }

        return responseMessage;
    }
});
