import ListProductionLines from "../views/ProductionLines/ListProductionLines";
import SaveProductionLine from "../views/ProductionLines/SaveProductionLine";

export default {
    path: 'lineasproduccion',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.productionlines',
            path: '',
            meta:{permission: 'productionlines-view'},
            component: ListProductionLines
        },
        {
            name: 'home.productionlines.create',
            path: 'crear',
            meta:{permission: 'productionlines-create'},
            component: SaveProductionLine
        },
        {
            name: 'home.productionlines.edit',
            path: 'editar',
            meta:{permission: 'productionlines-edit'},
            component: SaveProductionLine
        }
    ]
}