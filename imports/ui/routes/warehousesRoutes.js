
import ListWarehouses from "../views/Warehouses/ListWarehouses";
import SaveWarehouse from "../views/Warehouses/SaveWarehouse";


export default {
    path: 'suministro',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.warehouses',
            path: '',
            meta:{permission: 'warehouses-view'},
            component: ListWarehouses
        },
        {
            name: 'home.warehouse.edit',
            path: 'editar',
            meta:{permission:'warehouses-edit'},
            component: SaveWarehouse
        },
        {
            name: 'home.warehouse.create',
            path: 'crear',
            meta:{permission:'warehouses-create'},
            component: SaveWarehouse
        }


    ]
}
