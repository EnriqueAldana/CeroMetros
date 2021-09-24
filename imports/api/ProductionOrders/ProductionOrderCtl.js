import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {ProductionOrders} from "./ProductionOrder";
import ProductionOrderServ from "./ProductionOrderServ";
import { check, Match } from "meteor/check";
import  Utilities from "../../startup/server/utilities/Utilities";
import { DateTime } from "luxon";
import {status} from "../Status/Status"
import  {ControlFolios} from "../../startup/server/utilities/FoliosControl";
new ValidatedMethod({
    name: 'production-order.save',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONORDERS.CREATE.VALUE, Permissions.PRODUCTIONORDERS.UPDATE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],
    validate(productionorder) {
        try {
            //console.info('productionorder', productionorder)
            check(productionorder, {
                _id: Match.OneOf(String, null),
                folio: Match.Maybe(String), 
                requiredDate: String,
                customer: {
                    _id: String,
                    address: String,
                    customerBussinessId: String,
                    email: String,
                    isAvailable: Boolean,
                    name: String,
                    name_full: String,
                    phones: String,
                    web: String,
                },
                notes: Match.OneOf(String, null),
                products: [{
                    _id: String,
                    name: String,
                    name_full: String,
                    amount: Number,
                    unit: 
                        {
                            _id : String,
                            name : String,
                            symbol : String
                    },
                    stock: String,
                    location: String,
                    sku: String,
                    warehouse: {
                        _id: String,
                        name: String,
                        name_full: String,
                        location: String,
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
                                    description: String,
                                    name: String,
                                    _id: String
                                }
                            }
                        ]
                    },
                    provider: {
                        _id: String,
                        name: String
                    },
                    isAvailable: Boolean,
                    components: [
                        {
                            amount: String,
                            isAvailable: Boolean,
                            location: String,
                            name: String,
                            name_full: String,
                            provider: {
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
                    
                }],
                status:Match.Maybe(
                    [
                        {
                        statusDate: Match.OneOf(Date, null),
                        statusKey: Match.OneOf(String, null),
                        statusDescription: Match.OneOf(String, null),
                        statusOrigin: Match.OneOf(String, null)
                        }
                    ]
                )
                
                
            }
            );

        } catch (exception) {
            console.error('production-order.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
        // Validar que traiga al menos un producto
        try {
            const NonEmptyProducts = Match.Where((productionorder) => {
                // check(productionorder.products, []);
                return productionorder.products.length > 0;
              });
              
              check(productionorder, NonEmptyProducts);

        } catch (exception) {
            console.error('production-order.save', exception);
            throw new Meteor.Error('403', 'Debe seleccionar al menos un producto');
        } 

        // Validar que los productos tengan solicitado al menos amount > 0
        try {
            const ZeroProducts = Match.Where((productionorder) => {
                    const zero = productionorder.products.filter( 
                        product => product.amount === 0
                    );
                return !(zero.length >0) ;
              });
              
              check(productionorder, ZeroProducts);

        } catch (exception) {
            console.error('production-order.save', exception);
            throw new Meteor.Error('403', 'Debe indicar cantidades de producto mayores a cero');
        }
        

    },
    run(productionorder) {
        const responseMessage = new ResponseMessage();
        try {
            if (productionorder._id !== null) {
                Utilities.setStatusToObject(productionorder,status.ACT,"Actualizar Orden de Produccion production-order.save");
                //productionorder.createdAt=Utilities.dateTimeFromString_dd_MM_YYYY(productionorder.createdAt)
                //productionorder.estimatedDeliveryAt=Utilities.dateTimeFromString_dd_MM_YYYY(productionorder.estimatedDeliveryAt)
                productionorder.editedAt=DateTime.local();
                productionorder.requiredDate= Utilities.dateTimeFromString_dd_MM_YYYY(productionorder.requiredDate)
                ProductionOrders.update(productionorder._id, {
                    $set: {
                        //createdAt: productionorder.createdAt,
                        editedAt: productionorder.editedAt,
                        requiredDate: productionorder.requiredDate,
                        //estimatedDeliveryAt: productionorder.estimatedDeliveryAt,
                        customer: productionorder.customer,
                        notes: productionorder.notes,
                        products: productionorder.products,
                        status: productionorder.status
                    }
                });
                responseMessage.create('Se actualizó la orden de produccion exitosamente');
            } else {
                
                Utilities.setStatusToObject(productionorder,status.INI,"Crear Orden de Produccion production-order.save");
                productionorder.createdAt= DateTime.local();
                productionorder.editedAt=DateTime.local();
                productionorder.estimatedDeliveryAt=DateTime.local();
                productionorder.requiredDate= Utilities.dateTimeFromString_dd_MM_YYYY(productionorder.requiredDate)
                const folioPO= Utilities.getFolio();
                ProductionOrders.insert({
                    folio: folioPO,
                    createdAt: productionorder.createdAt,
                    editedAt: productionorder.editedAt,
                    requiredDate: productionorder.requiredDate,
                    estimatedDeliveryAt: productionorder.estimatedDeliveryAt,
                    customer: productionorder.customer,
                    notes: productionorder.notes,
                    products: productionorder.products,
                    status: productionorder.status
                });

                responseMessage.create('Se insertó la orden de produccion exitosamente');
            }
        } catch (exception) {
            console.error('production-order.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar la orden de produccion');
        }
        return responseMessage;
    }
});

new ValidatedMethod({
    name: 'productionorder.delete',
    mixins: [MethodHooks],
    permissions: [Permissions.PRODUCTIONORDERS.DELETE.VALUE],
    beforeHooks: [AuthGuard.checkPermission],  // Aqui se verifica si los permisos de usuario son adecuados para esta accion
    afterHooks: [],
    validate({idProductionOrder}) {
        try {
            check(idProductionOrder, String);
        } catch (exception) {
            console.error('productionorder.delete', exception);
            throw new Meteor.Error('403', 'Ocurrio un error al eliminar la orden de produccion');
        }
        // validar que no sea posible eliminar una orden de produccion si hay una estacion utilizandola.
          ProductionOrderServ.validateProductionOrderToErase(idProductionOrder);

    },
    run({ idProductionOrder }) {
        const responseMessage = new ResponseMessage();
        try {
            ProductionOrders.remove(idProductionOrder);
            responseMessage.create('Orden de produccion eliminada exitosamente');
        } catch (exception) {
            console.error('production-order.delete', exception);
            throw new Meteor.Error('500', 'Ocurrio un error al eliminar la orden de produccion');
        }

        return responseMessage;
    }
});
