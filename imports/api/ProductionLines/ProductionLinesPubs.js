import {ProductionLineRepository} from "./ProductionLine";
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const productionLinesPublication=new PublishEndpoint('productionlines.list',function(param1){
        //return ProductionLineRepository.find({},{ _id:1,name:1,description:1,
        return ProductionLineRepository.find({},{sort:{createdAt: -1}
        });
});

productionLinesPublication.use(new PermissionMiddleware(Permissions.PRODUCTIONLINES.LIST.VALUE));