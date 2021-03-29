import ListProductionOrders from "../views/ProductionOrders/ListProductionOrders";


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
        }
    ]
}