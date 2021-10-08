
import {OperatingStationRepository} from "./OperatingStation";

OperatingStationRepository.rawCollection().createIndex({'name':1},{unique: true});

