import { Company } from './Company';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const companyPublication=new PublishEndpoint('company.list',function(param1){
        return Company.find({},{
                sort:{createdAt: -1}
        });
});

companyPublication.use(new PermissionMiddleware(Permissions.COMPANIES.LIST.VALUE));