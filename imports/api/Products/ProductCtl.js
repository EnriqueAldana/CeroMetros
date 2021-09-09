import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {Product} from "./Product";
import ProductServ from "./ProductServ";
import {check, Match} from "meteor/check";

new ValidatedMethod({
    name:'product.save',
     mixins:[MethodHooks],
     permissions: [Permissions.PRODUCTS.CREATE.VALUE,Permissions.PRODUCTS.UPDATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(product){
        try {
            console.info('product ', product)
            check(product,{
                _id: Match.OneOf(String, null),
                name: String,
                name_full: String,
                unit: {
                    _id: String,
                    name: String,
                    symbol: String
                },
                stock: String
                ,
                provider: {
                    _id: String,
                    name: String
                },
                location: String,
                sku: String,
                warehouse: {
                    _id: String,
                    name: String,
                    name_full: String,
                    location: String
                },
                production_line: {
                    _id: String,
                    description: String,
                    name: String,
                    workstations: [
                        {
                            _id: String,
                            name: String,
                            name_full: String,
                            location: String,
                            productionline: {
                                description : String,
                                name : String,
                                _id : String
                            }
                        }
                    ]
                }
                ,
                components: [
                    {
                        amount: String,
                        isAvailable: Boolean,
                        location: String,
                        name: String,
                        name_full: String,
                        provider:  {
                            _id: String,
                            name: String
                        },
                        sku: String,
                        stock: String,
                        unit: {
                            _id: String,
                            name: String,
                            symbol: String
                        },
                        warehouse: {
                            _id: String,
                            name: String,
                            name_full: String,
                            location: String
                        },
                        _id: String,
                        workstationId: String
                    }
                ],
                isAvailable: Boolean
            });

        }catch ( exception){
            console.error('product.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que no haya producto con el mismo nombre
        ProductServ.validateProductName(product.name,product._id);
    },
    run(product){
        const responseMessage = new ResponseMessage(); 
        try {
            if(product._id !== null){
                // ToDO
                // agregar registro en kardex si se ha cambiado el valor de stock
                Product.update(product._id,{
                    $set: {
                    name: product.name,
                    name_full: product.name_full,
                    unit: product.unit,
                    stock: product.stock,
                    location: product.location,
                    sku: product.sku,
                    warehouse: product.warehouse,
                    production_line: product.production_line,
                    provider: product.provider,
                    isAvailable: product.isAvailable,
                    components: product.components
                    }
                });
                responseMessage.create('Se actualizó el producto exitosamente');
            }else{
                Product.insert({
                    name: product.name,
                    name_full: product.name_full,
                    unit: product.unit,
                    stock: product.stock,
                    location: product.location,
                    sku: product.sku,
                    warehouse: product.warehouse,
                    production_line: product.production_line,
                    provider: product.provider,
                    isAvailable: product.isAvailable,
                    components: product.components

                });
                responseMessage.create('Se insertó el producto exitosamente');
            }
        }catch ( exception){
            console.error('product.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el producto');
        }
        return responseMessage;
    }
 });

new ValidatedMethod({
    name: 'product.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTS.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({ idProduct }){
        try {
            check(idProduct, String);
        }catch (exception) {
            console.error('product.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar el producto');
        }
        // validar que no sea posible eliminar un producto si hay un almacen utilizandolo.
        // ToDo
        const isUseredByWarehouse = 0;
        //CompanyServ.getUsersBycompany(idCompany);

        if (isUseredByWarehouse.length > 0){
            throw new Meteor.Error('403','No es posible elimiar el producto',
                'Hay al menos un almacen utilizando el producto');
        }
    },
    run({ idProduct }){
        const responseMessage = new ResponseMessage();
        try {
            Product.remove(idProduct);
                responseMessage.create('Producto eliminado exitosamente');
        }catch (exception) {
            console.error('product.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar el producto');
        }

        return responseMessage;
    }
});
