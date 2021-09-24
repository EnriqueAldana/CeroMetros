import { Customer } from './Customer';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const customerPublication=new PublishEndpoint('customer.list',function(param1){
        return Customer.find({},{
                sort:{createdAt: -1}
        });
});

customerPublication.use(new PermissionMiddleware(Permissions.CUSTOMERS.LIST.VALUE));