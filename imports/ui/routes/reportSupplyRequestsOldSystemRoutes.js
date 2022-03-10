
import ListSupplyRequestOldSystem from '../views/Reports/ListSupplyRequestOldSystem';
import SaveSupplyRequestOldSystem from '../views/Reports/SaveSupplyRequestOldSystem'
import SupplyRequestOldSystem from '../views/Reports/SupplyRequestOldSystem'
export default {
        path: 'reportesolicitudesOld',
        components: {
            sectionView: {
                render: c => c("router-view")
            }
        },
        children:[
            {
                name: 'home.report.supplyrequest',
                path: '',
                meta:{permission: 'supplyrequestsoldsystem-view'},
                component: ListSupplyRequestOldSystem
                //component: SupplyRequestOldSystem
            },
            
            {
                name: 'home.report.supplyrequest.create',
                path: 'crear',
                meta:{permission: 'supplyrequestsoldsystem-create'},
                component: SaveSupplyRequestOldSystem
            },
            {
                name: 'home.report.supplyrequest.edit',
                path: 'editar',
                meta:{permission: 'supplyrequestsoldsystem-edit'},
                component: SaveSupplyRequestOldSystem
            }
            
        ]
    }
   