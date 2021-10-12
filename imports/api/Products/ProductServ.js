
import {Meteor} from "meteor/meteor";
import {Product} from "./Product";
import {ProductionOrders} from "../ProductionOrders/ProductionOrder";

export default {
    
    validateProductName(newProductName,idProduct){
        const existsProduct= Product.findOne({name:newProductName});
        if(idProduct !== null){  // actualizacion de producto
            const oldProduct= Product.findOne(idProduct);
            if(oldProduct.name !== newProductName && existsProduct){
                throw new Meteor.Error('403', 'El nuevo nombre de producto ya esta siendo usado');
            }
        }else if(existsProduct){ // es producto nuevo pero el nombre  ya existe.
                throw new Meteor.Error('403', 'El nuevo nombre del producto  ya esta siendo utilizado');

        }
    },
    validateProductBusy(idProduct){
            const exitProductOnProdOrder= ProductionOrders.find({products:{_id:idProduct}}).fetch()
            console.info("exitProductOnProdOrder",exitProductOnProdOrder)
            if(exitProductOnProdOrder.length>0){
                throw new Meteor.Error('403', 'El producto tiene al menos una orden de produccion utilizandolo');
            }
        }
}