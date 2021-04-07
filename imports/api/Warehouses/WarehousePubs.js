import { WarehouseRepository } from './Warehouse';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const warehousePublication=new PublishEndpoint('warehouse.list',function(param1){
        return WarehouseRepository.find({},{});
});

warehousePublication.use(new PermissionMiddleware(Permissions.WAREHOUSES.LIST.VALUE));