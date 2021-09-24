
import {Meteor} from "meteor/meteor";
import {ProductionOrders} from "./ProductionOrder";
import {status} from "../Status/Status"
export default {
    
    validateProductionOrderToErase(idProductionOrder){
        const existsProductionOrder= ProductionOrders.findOne({_id:idProductionOrder});
        let statusOrder = status;
        if(existsProductionOrder !== null){  // orden de produccion existe
            // si hay un estatus en PAR - Parcial , COM Completa, CAN Cancelado 
            // no puede borrarse
            existsProductionOrder.status.filter(
                (st)=>  {      
                        if(st.statusKey == status.PAR.STATUSKEY ||
                            st.statusKey== status.COM.STATUSKEY ||
                            st.statusKey== status.CAN.STATUSKEY )
                        throw new Meteor.Error('403', 'La orden de produccion no puede ser borrada porque está en proceso,completa o cancelada');
                } 
            )
        }
    }
}