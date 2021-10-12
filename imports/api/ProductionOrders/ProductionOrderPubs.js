import { ProductionOrders } from './ProductionOrder';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const productionOrderPublication=new PublishEndpoint('production-order.list',function(){
        return ProductionOrders.find({},{
                customer:1,
                createdAt:1, 
                requiredDate:1,
                estimatedDeliveryAt:1, 
                products:1
              });
});

const productionOrderPublicationByPL_WS_CONF=new PublishEndpoint('production-orderByPL_WS_CONF',function(
        productionlineId,workstationId,configurationId){
        return ProductionOrders.find(
                {"products.production_line._id": productionlineId, 
                "products.production_line.workstations._id":workstationId, 
                "products.production_line.workstations.configurations._id":configurationId},
                {
                customer:1,
                createdAt:1, 
                requiredDate:1,
                estimatedDeliveryAt:1, 
                products:1
              });
});
productionOrderPublication.use(new PermissionMiddleware(Permissions.PRODUCTIONORDERS.LIST.VALUE));
productionOrderPublicationByPL_WS_CONF.use(new PermissionMiddleware(Permissions.PRODUCTIONORDERS.LIST.VALUE));