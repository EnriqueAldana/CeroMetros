
import {ProductionLineRepository} from "./ProductionLine";

ProductionLineRepository.rawCollection().createIndex({'name':1},{unique: true});

