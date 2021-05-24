import Permissions, {permissionsArray} from '../../startup/server/Permissions';
import {WarehouseRepository} from "./Warehouse";

WarehouseRepository.rawCollection().createIndex({'name':1},{unique: true});

