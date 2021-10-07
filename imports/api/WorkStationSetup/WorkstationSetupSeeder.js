
import {WorkstationSetupRepository} from "./WorkstationSetup";

WorkstationSetupRepository.rawCollection().createIndex({'name':1},{unique: true});
