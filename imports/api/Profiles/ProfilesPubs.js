import { Profile } from './Profile';
import ProfilesServ from "./ProfilesServ";
import {PermissionMiddleware} from "../../middlewares/PermissionMiddleware";
import Permissions from "../../startup/server/Permissions";

const notStaticProfilePublication=new PublishEndpoint('notStaticProfile.list', function(param1) {
         return Profile.find({name: { $nin:ProfilesServ.getStaticprofilesName()}});
    });
const profilePublication=new PublishEndpoint('profile.listAll', function(param1) {
    return Profile.find();
});

notStaticProfilePublication.use(new PermissionMiddleware(Permissions.PROFILES.LIST.VALUE));
profilePublication.use(new PermissionMiddleware(Permissions.PROFILES.LIST.VALUE));
