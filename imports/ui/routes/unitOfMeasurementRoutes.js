import ListUnitOfMeasurement from "../views/UnitOfMeasurement/ListUnitOfMesurement";
import SaveUnitOfMeasurement from "../views/UnitOfMeasurement/SaveUnitOfMeasurement";

export default {
    path: 'UnidadesDeMedida',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.unitsofmeasurement',
            path: '',
            meta:{permission: 'unitofmeasurement-view'},
            component: ListUnitOfMeasurement
        },
        { 
            name: 'home.unitsofmeasurement.create',
            path: 'crear',
            meta:{permission: 'unitofmeasurement-create'},
            component: SaveUnitOfMeasurement
        },
        {
            name: 'home.unitsofmeasurement.edit',
            path: 'editar',
            meta:{permission: 'unitofmeasurement-edit'},
            component: SaveUnitOfMeasurement
        }
    ]
}
