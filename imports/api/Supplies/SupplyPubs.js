import { Supplies } from './Supplies';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const supplyPublication=new PublishEndpoint('supply.list',function(param1){
        return Supplies.find();
});

supplyPublication.use(new PermissionMiddleware(Permissions.SUPPLIES.LIST.VALUE));