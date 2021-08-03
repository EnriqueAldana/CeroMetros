import ListSupplies from "../views/Supplies/ListSupplies";
import SaveSupply from "../views/Supplies/SaveSupply";

export default {
    path: 'suministros',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.supplies',
            path: '',
            meta:{permission: 'supplies-view'},
            component: ListSupplies
        },
        { 
            name: 'home.supplies.create',
            path: 'crear',
            meta:{permission: 'supplies-create'},
            component: SaveSupply
        },
        {
            name: 'home.supplies.edit',
            path: 'editar',
            meta:{permission: 'supplies-edit'},
            component: SaveSupply
        }
    ]
}

