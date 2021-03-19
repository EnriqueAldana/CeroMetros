import './Permissions';
import './services/MailServ';
import '../../api/Users/UsersCtrl';
import '../../api/Users/User';
import '../../api/Users/UsersPubs';
import '../../api/Profiles/ProfileSeeder';
import '../../api/Profiles/ProfileCtl';
import '../../api/Profiles/ProfilesServ';
import '../../api/Profiles/ProfilesPubs';
import '../../api/Permissions/PermissionCtl';
import '../../api/Permissions/PermissionPubs';
import '../../api/SystemOptions/SystemOptionsCtl';
import '../server/services/FirebaseAdmin';
import '../../api/Messages/Message';
import '../../api/Messages/MessagesCtl';
import '../../api/Messages/MessagePubs';
import '../../api/Messages/MessageSeeder';

// Ejemplos de creacion de metodos o End Points
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {check} from 'meteor/check';
Meteor.methods( {
    testmethod(){
        console.log('Hola mundo')
        return 'Este es un end point';
    },
    suma(a,b){
        return {result: a +  b};
    },
    connectionData(){
        console.log(this);
        if(userId){
            console.log('Ususario logeado');
        }else {
            console.log('Usuario no esta logeado');

        }
        /*
        Datos del contexto

            I20210219-17:16:23.677(-6)?   isSimulation: false,
            I20210219-17:16:23.677(-6)?   _unblock: [Function],
            I20210219-17:16:23.677(-6)?   _calledUnblock: false,
            I20210219-17:16:23.678(-6)?   userId: null,
            I20210219-17:16:23.678(-6)?   _setUserId: [Function: setUserId],
            I20210219-17:16:23.678(-6)?   connection: null,
            I20210219-17:16:23.678(-6)?   randomSeed: null,
            I20210219-17:16:23.678(-6)?   randomStream: null
            I20210219-17:16:23.678(-6)? }

         */

    }, async delayFunction() {
                let delayMessage = 'Antes';
                await new Promise(  resolve => {
                        setTimeout(()=>{
                            delayMessage = "Despues";
                            resolve(1);
                        },2000)
        });

                return delayMessage;
        }
})

new ValidatedMethod( {
    name:'multiplicacion',
    validate({a,b}){
        check(a,Number);
        check(b, Number);

    },run({a,b}){
        return {result: a*b};
        }
}
);

new ValidatedMethod( {
    name:'multiplication',
        validate: null,
    run({a,b}){  // se ej
    return { result: a*b};

    }
});
