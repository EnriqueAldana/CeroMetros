import ListCustomers from "../views/Customers/ListCustomers";
import SaveCustomer from "../views/Customers/SaveCustomer"
export default {
    path: 'clientes',
    components: {
        sectionView: {
            render: c => c("router-view")
        }
    },
    children:[
        {
            name: 'home.customers',
            path: '',
            meta:{permission: 'customers-view'},
            component: ListCustomers
        },
        {
            name: 'home.customer.edit',
            path: 'editar',
            meta:{permission:'customers-edit'},
            component: SaveCustomer
        },
        {
            name: 'home.customer.create',
            path: 'crear',
            meta:{permission:'customers-create'},
            component: SaveCustomer
        }
    ]
}