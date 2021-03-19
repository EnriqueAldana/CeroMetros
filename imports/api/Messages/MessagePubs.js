import { Message } from './Message';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import Permissions from '../../startup/server/Permissions';

const messagesPublication = new PublishEndpoint('message.list', function(idContact = null){
    const idUserLogged = this.userId;
    return Message.find({
        $or: [
            {idSender: idUserLogged, idReceiver: idContact},
            {idSender: idContact, idReceiver: idUserLogged}
        ]
    },{
        limit:20,
        sort:{
           date:-1 
        }
    });
});

messagesPublication.use(new PermissionMiddleware(Permissions.CHAT.LIST.VALUE));