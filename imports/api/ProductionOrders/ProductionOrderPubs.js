import { ProductionOrders } from './ProductionOrder';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const productionOrderPublication=new PublishEndpoint('production-order.list',function(param1){
        return ProductionOrders.find({},{
                customer:1,
                createdAt:1, 
                requiredDate:1,
                estimatedDeliveryAt:1, 
                products:1
              });
});

productionOrderPublication.use(new PermissionMiddleware(Permissions.PRODUCTIONORDERS.LIST.VALUE));