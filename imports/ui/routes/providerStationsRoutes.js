import ListProviderStations from "../views/ProviderStations/ListProviderStations";


export default {
    path: 'suministros',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.providerstation',
            path: '',
            meta:{permission: 'providerstations-view'},
            component: ListProviderStations
        }
    ]
}