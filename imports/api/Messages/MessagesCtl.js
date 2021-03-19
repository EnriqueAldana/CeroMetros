import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {check} from 'meteor/check';
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage";
import AuthGuard from "../../middlewares/AuthGuard";
import Permissions from "../../startup/server/Permissions";
import {Message} from "./Message";

new ValidatedMethod({
    name:'message.save',
     mixins:[MethodHooks],
     permissions: [Permissions.CHAT.CREATE.VALUE],  
     beforeHooks: [AuthGuard.checkPermission],
    validate(message){
        try {
            check(message,{
                idSender: String,
                idReceiver: String,
                text: String,
                date: String,
                read: Boolean
            });

        }catch ( exception){
            console.error('message.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
    },
    run(message){
        const responseMessage = new ResponseMessage();
        
        try {
            Message.insert(message);
            responseMessage.create('Se insertó el mensaje exitosamente');
       
        }catch ( exception){
            console.error('message.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al guardar el mensaje');
        }
        return responseMessage;
    }
 });

 new ValidatedMethod({
    name:'messages.read',
     mixins:[MethodHooks],  
     beforeHooks: [AuthGuard.isUserLogged],
    validate(messages){
        try {
            check(messages,[
               { 
                _id: String,
                idSender: String,
                idReceiver: String,
                text: String,
                date: String,
                read: Boolean
            }
            ]);

        }catch ( exception){
            console.error('message.save', exception);
            throw new Meteor.Error('403', 'La informacion introducida no es valida');
        }
    },
    run(messages){
        const responseMessage = new ResponseMessage();
        
        try {
            Message.update({_id:{ $in: messages.map(m => m._id) } },{
                $set: {
                    read: true
                }
            }, {multi: true});
        
        }catch ( exception){
            console.error('message.save', exception);
            throw new Meteor.Error('500', 'Ha ocurrido un error al marcar los mensajes como leidos');
        }
        return responseMessage;
    }
 });