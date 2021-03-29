import { WorkstationRepository } from './WorkStation';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const workstationPublication=new PublishEndpoint('workstation.list',function(param1){
        return WorkstationRepository.find({},{
                sort:{createdAt: -1}
        });
});

workstationPublication.use(new PermissionMiddleware(Permissions.WORKSTATIONS.LIST.VALUE));