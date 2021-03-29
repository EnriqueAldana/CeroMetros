import ListWorkStations from "../views/WorkStations/ListWorkStations";
import SaveWorkStation from "../views/WorkStations/SaveWorkStation";

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
        },
        ,
        {
            name: 'home.workstation.edit',
            path: 'editar',
            meta:{permission:'workstations-edit'},
            component: SaveWorkStation
        },
        {
            name: 'home.workstation.create',
            path: 'crear',
            meta:{permission:'workstations-create'},
            component: SaveWorkStation
        }





    ]
}
