import ListProductionOrders from "../views/ProductionOrders/ListProductionOrder";
import SaveProductionOrder from "../views/ProductionOrders/SaveProductionOrder";

export default {
    path: 'ordenesproduccion',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.productionorders',
            path: '',
            meta:{permission: 'productionorders-view'},
            component: ListProductionOrders
        },
        { 
            name: 'home.productionorders.create',
            path: 'crear',
            meta:{permission: 'productionorders-create'},
            component: SaveProductionOrder
        },
        {
            name: 'home.productionorders.edit',
            path: 'editar',
            meta:{permission: 'productionorders-edit'},
            component: SaveProductionOrder
        }
    ]
}