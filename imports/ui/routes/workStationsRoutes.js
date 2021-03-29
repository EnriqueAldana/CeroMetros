import ListWorkStations from "../views/WorkStations/ListWorkStations";

export default {
    path: 'estacionestrabajo',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.workstations',
            path: '',
            meta:{permission: 'workstations-view'},
            component: ListWorkStations
        }
    ]
}
