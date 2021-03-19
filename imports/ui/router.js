import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "./routes/routes";
import store from "./store";


Vue.use(VueRouter);

const router= new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    const requirestAuth= to.matched.some(record=>record.meta.requirestAuth);
    const isLogged=store.state.auth.isLogged;
    if(!requirestAuth && isLogged && to.name === 'login'){
        next('/');
    }else if(requirestAuth && !isLogged){
        next('/login');
    }else{
        const permission= to.meta.permission;
        if(permission){
            Meteor.call('permissions.check',permission,(error,response)=>{
                if(error){
                    this.$alert.showAlertSimple('error',error.reason);
                }else if(response.data.hasPermission){
                    next();
                }else{
                    next(from.path);
                    console.warn('El usuario no tiene acceso a esta seccion')
                }
            });
        }else{
            next();
        }
    }
});



export default router;
