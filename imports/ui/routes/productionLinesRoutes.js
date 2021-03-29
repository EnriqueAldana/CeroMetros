import ListProductionLines from "../views/ProductionLines/ListProductionLines";


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
        }
    ]
}