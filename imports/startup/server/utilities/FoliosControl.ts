//import { Db, ObjectId } from "mongodb";
import { Mongo} from 'meteor/mongo';
export class ControlFolios {
    private arbol: { [col: string]: { [field: string]: SubArbolType } } = {}
    protected db
    constructor( ) { 
        this.db= new Mongo.Collection('folios');
    }

    /**
     * Devuelve el folio siguiente para el control de folio especificado en los parámetros
     * @param collectionName Es el nombre de la colleción en la base de datos que contiene el folio
     * @param fieldFolio Es el nombre del campo dentro de la colleción que se debe incrementar
     * @param fieldNamesFilters Un arreglo de campos con valor para los cuales se lleva un control del folio. Ej: idCliente
     */
    async getNextFolio(collectionName: string, fieldFolio: string, ...fieldNamesFilters:
        {
            fieldName: string,
            fieldValue: string | number | boolean  | Date
        }[]) {

        return this.ultimoFolio(collectionName, fieldFolio, ...fieldNamesFilters).then(folio => ++folio)
    }

    async ultimoFolio(collectionName: string, fieldFolio: string, ...fieldNamesFilters:
        {
            fieldName: string,
            fieldValue: string | number | boolean  | Date
        }[]) {

        if (!(collectionName in this.arbol)) this.arbol[collectionName] = {}
        if (!(fieldFolio in this.arbol[collectionName])) this.arbol[collectionName][fieldFolio] = {}



        let ob = this.getFolioMemoryObject(collectionName, fieldFolio, ...fieldNamesFilters)

        //El objecto es nuevo, es la primera vez que se pide el folio se consulta la base por única vez
        if (ob.promiseValue == null) {
            let filter = fieldNamesFilters.reduce((acc, va) => {
                acc[va.fieldName] = va.fieldValue
                return acc
            }, <any>{})
            ob.promiseValue = this.getFolioFromDb(filter, collectionName, fieldFolio, ...fieldNamesFilters)
        }
        /**
         * La promesa ya está creada y tiene como valor el último folio entregado o 0 si es la primera vez
         * Si aun no está resuelta se retorna el valor del folio siguiente una vez que se resuelva
         * Si está resuelta se retorna el valor del folio siguiente inmediatamente
        **/

        return ob.promiseValue
    }

    resetFolio(collectionName: string, fieldFolio: string, ...fieldNamesFilters:
        {
            fieldName: string,
            fieldValue: string | number | boolean | ObjectId | Date
        }[]) {

        let ob = this.getFolioMemoryObject(collectionName, fieldFolio, ...fieldNamesFilters)
        delete ob.promiseValue

    }

    private getFolioMemoryObject(collectionName: string, fieldFolio: string, ...fieldNamesFilters:
        {
            fieldName: string,
            fieldValue: string | number | boolean  | Date
        }[]) {

        return <{ promiseValue: Promise<number> }>fieldNamesFilters.reduce((acc, sa, i) => {
            if (!(sa.fieldName in acc)) acc[sa.fieldName] = {}
            let fv = sa.fieldValue
            if (typeof fv == 'object' && 'getMonth' in fv) fv = fv.toJSON()
            else if (typeof fv == 'object') fv = fv.toHexString()
            fv = fv.toString()
            if (!(fv in acc[sa.fieldName])) acc[sa.fieldName][fv] = {}
            return acc[sa.fieldName][fv]
        }, <any>this.arbol[collectionName][fieldFolio])
    }

    private getFolioFromDb(filter: any, collectionName: string, fieldFolio: string, ...fieldNamesFilters:
        {
            fieldName: string,
            fieldValue: string | number | boolean  | Date
        }[]): Promise<number> {
        return new Promise(async (res, rej) => {
            let base = await this.db
            res(base.find(filter, { [fieldFolio]: 1 })
                .sort(fieldFolio, -1)
                .limit(1)
                .toArray()
                .then(x => x[0])
                .then(x => {
                    if (x != null) return (x[fieldFolio] || 0)
                    return 0
                }))
        })
    }
}

interface SubArbolType {
    [field: string]: { promiseValue: Promise<number> } | SubArbolType
}
