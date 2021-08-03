import {UnitOfMeasurementRepository} from './UnitOfMeasurement';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const unitOfMeasurementPublication=new PublishEndpoint('unitofmeasurement.list',function(param1){
        return UnitOfMeasurementRepository.find({},{});
});

unitOfMeasurementPublication.use(new PermissionMiddleware(Permissions.UNITOFMEASUREMENT.LIST.VALUE));