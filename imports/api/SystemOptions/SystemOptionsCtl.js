import SystemOptions from "./SystemOptions";
import AuthGuard from "../../middlewares/AuthGuard";
import {ResponseMessage} from "../../startup/server/utilities/ResponseMesssage"

new ValidatedMethod({
   name:'user.getSystemOptions',
    mixins:[MethodHooks],
    beforeHooks: [AuthGuard.isUserLogged],
   validate:null,
   run(){
       const responseMessage = new ResponseMessage();
       const userLogged= Meteor.user();
       const userRoles=Roles.getRolesForUser(userLogged._id,userLogged.profile.profile);
       //console.log('userRoles',userRoles);
       const optionOfUser= SystemOptions.reduce((accumulator,systemOption)=>{
           if(!systemOption.permission || !!userRoles.find(role=> role === systemOption.permission)){
               accumulator.push(systemOption);
           }
           return accumulator;
       },[]);
       //console.log(optionOfUser);
       responseMessage.create('Opciones del sistema para el usuario',null,optionOfUser);
       return responseMessage;
   }
});