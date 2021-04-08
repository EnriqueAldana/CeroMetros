import ListProviders from "../views/Providers/ListProviders";
import SaveProvider from "../views/Providers/SaveProvider"
export default {
    path: 'proveedores',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.providers',
            path: '',
            meta:{permission: 'providers-view'},
            component: ListProviders
        },
        {
            name: 'home.provider.edit',
            path: 'editar',
            meta:{permission:'providers-edit'},
            component: SaveProvider
        },
        {
            name: 'home.provider.create',
            path: 'crear',
            meta:{permission:'providers-create'},
            component: SaveProvider
        }
    ]
}