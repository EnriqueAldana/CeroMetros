import ListWorkstationSetup from "../views/WorkStationsSetup/ListWorkStationsSetup";
import SaveWorkstationSetup from "../views/WorkStationsSetup/SaveWorkStationsSetup";

export default {
    path: 'EstacionTrabajoConfiguracion',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.workstationconfiguration',
            path: '',
            meta:{permission: 'workstationsetup-view'},
            component: ListWorkstationSetup
        },
        { 
            name: 'home.workstationconfiguration.create',
            path: 'crear',
            meta:{permission: 'workstationsetup-create'},
            component: SaveWorkstationSetup
        },
        {
            name: 'home.workstationconfiguration.edit',
            path: 'editar',
            meta:{permission: 'workstationsetup-edit'},
            component: SaveWorkstationSetup
        }
    ]
}
