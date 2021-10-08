import Permissions from "../../startup/server/Permissions"
export default [
            {
            title:'Inicio',
            permission:null,
            routeName:'home'
            },
            {
                title:'Usuarios',
                permission:Permissions.USERS.LIST.VALUE,
                routeName:'home.users'
            },
            {
                title:'Perfiles',
                permission:Permissions.PROFILES.LIST.VALUE,
                routeName:'home.profiles'
            },
            {
                title:'Empresas',
                permission: Permissions.COMPANIES.LIST.VALUE,
                routeName:'home.companies'
            },
            {
                title:'Clientes',
                permission: Permissions.CUSTOMERS.LIST.VALUE,
                routeName:'home.customers'
            },
            {
                title:'Proveedores',
                permission: Permissions.PROVIDERS.LIST.VALUE,
                routeName:'home.providers'
            },
            {
                title:'Chat',
                permission: Permissions.CHAT.LIST.VALUE,
                routeName:'home.chat'
            },
            {
                title:'Lineas Producción',
                permission: Permissions.PRODUCTIONLINES.LIST.VALUE,
                routeName:'home.productionlines'
            },
            {
                title:'Ordenes Producción',
                permission: Permissions.PRODUCTIONORDERS.LIST.VALUE,
                routeName:'home.productionorders'
            },
            {
                title:'Productos',
                permission: Permissions.PRODUCTS.LIST.VALUE,
                routeName:'home.products'
            },
            {
                title:'Suministros',
                permission: Permissions.SUPPLIES.LIST.VALUE,
                routeName:'home.supplies'
            },
            {
                title:'Almacenes',
                permission: Permissions.WAREHOUSES.LIST.VALUE,
                routeName:'home.warehouses'
            },
            {
                title:'Estaciones de Trabajo',
                permission: Permissions.WORKSTATIONS.LIST.VALUE,
                routeName:'home.workstations'
            },
            {
                title:'Estación de Operación',
                permission: Permissions.OPERATINGSTATION.LIST.VALUE,
                routeName:'home.estacionoperacion'
            },
            {
                title:'Configuración Estación de Trabajo',
                permission: Permissions.WORKSTATIONSETUP.LIST.VALUE,
                routeName:'home.workstationconfiguration'
            },
            {
                title:'Unidades de medida',
                permission: Permissions.UNITOFMEASUREMENT.LIST.VALUE,
                routeName:'home.unitsofmeasurement'
            }    
    ]