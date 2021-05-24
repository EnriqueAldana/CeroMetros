import { Product } from './Product';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const productPublication=new PublishEndpoint('product.list',function(param1){
        return Product.find({},{
                isAvailable:1,
                  name:1,
                  name_full:1,
                  unit:1,
                  stock:1,
                  location:1,
                  sku:1,
                  warehouse:1,
                  production_line:1
              });
});

productPublication.use(new PermissionMiddleware(Permissions.PRODUCTS.LIST.VALUE));