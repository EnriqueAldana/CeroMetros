
import {UnitOfMeasurementRepository} from "./UnitOfMeasurement";

UnitOfMeasurementRepository.rawCollection().createIndex({'name':1},{unique: true});
