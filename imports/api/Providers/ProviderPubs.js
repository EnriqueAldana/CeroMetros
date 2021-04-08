import { Provider } from './Provider';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const providerPublication=new PublishEndpoint('provider.list',function(param1){
        return Provider.find({},{});
});

providerPublication.use(new PermissionMiddleware(Permissions.PROVIDERS.LIST.VALUE));