import OperatingStation from "../views/OperatingStation/OperatingStation";


export default {
    path: 'estacionoperacion',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.estacionoperacion',
            path: '',
            meta:{permission: 'operatingstation-view'},
            component: OperatingStation
        },
        





    ]
}
