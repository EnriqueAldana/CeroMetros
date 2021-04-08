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
                title:'Chat',
                permission: Permissions.CHAT.LIST.VALUE,
                routeName:'home.chat'
            },
            {
                title:'Lineas Produccion',
                permission: Permissions.PRODUCTIONLINES.LIST.VALUE,
                routeName:'home.productionlines'
            },
            {
                title:'Ordenes Produccion',
                permission: Permissions.PRODUCTIONORDERS.LIST.VALUE,
                routeName:'home.productionorders'
            },
            {
                title:'Productos',
                permission: Permissions.PRODUCTS.LIST.VALUE,
                routeName:'home.products'
            },
            {
                title:'Est Suministro',
                permission: Permissions.PROVIDERSTATIONS.LIST.VALUE,
                routeName:'home.providerstation'
            },
            {
                title:'Almacenes',
                permission: Permissions.WAREHOUSES.LIST.VALUE,
                routeName:'home.warehouses'
            },
            {
                title:'Proveedores',
                permission: Permissions.PROVIDERS.LIST.VALUE,
                routeName:'home.providers'
            },
            {
                title:'Estaciones Trabajo',
                permission: Permissions.WORKSTATIONS.LIST.VALUE,
                routeName:'home.workstations'
            }    
    ]