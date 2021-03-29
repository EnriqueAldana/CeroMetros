
import ListWarehouses from "../views/Warehouses/ListWarehouses";


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
        }
    ]
}
