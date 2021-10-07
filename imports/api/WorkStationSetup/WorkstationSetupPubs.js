import {WorkstationSetupRepository} from "./WorkstationSetup";
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const workstationSetupPublication=new PublishEndpoint('workstationSetup.list',function(param1){
        return WorkstationSetupRepository.find({},{});
});

workstationSetupPublication.use(new PermissionMiddleware(Permissions.WORKSTATIONSETUP.LIST.VALUE));