import { Supplies } from './Supplies';

Supplies.rawCollection().createIndex({'name':1},{unique: true});
