import ListCompanies from "../views/Companies/ListCompanies";
import SaveCompany from "../views/Companies/SaveCompany"
export default {
    path: 'empresas',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.companies',
            path: '',
            meta:{permission: 'companies-view'},
            component: ListCompanies
        },
        {
            name: 'home.company.edit',
            path: 'editar',
            meta:{permission:'companies-edit'},
            component: SaveCompany
        },
        {
            name: 'home.company.create',
            path: 'crear',
            meta:{permission:'companies-create'},
            component: SaveCompany
        }
    ]
}