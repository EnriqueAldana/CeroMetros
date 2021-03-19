/* Forma de publicar
Meteor.publish('user.list',function(){
        return Meteor.users.find();
});

 */
// no lo reconoce quitar advertencia
import {PermissionMiddleware} from "../../middlewares/PermissionMiddleware"
import Permissions from "../../startup/server/Permissions"
const userPublication=new PublishEndpoint('user.list',function(param1){
        return Meteor.users.find({},{
                sort:{createdAt: -1}
        });
});

userPublication.use(new PermissionMiddleware(Permissions.USERS.LIST.VALUE));
