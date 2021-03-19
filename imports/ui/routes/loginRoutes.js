import LytAuth from "../layouts/LytAuth";
import Login from "../views/Auth/Login";
import ForgotPassword from "../views/Auth/ForgotPassword";
import ResetPassword from "../views/Auth/ResetPassword";
import VerifyEmail from "../views/Auth/VerifyEmail";
import SetInitialPassword from "../views/Auth/SetInitialPassword";

export default{
    path:'/login',
    components:{
        allPageView: LytAuth
    },
    children:[
        {
            path:'',
            name:'login',
            components: {
                sectionView: Login
            }
        },{
            name: 'enrollAccount',
            path:'/enroll-account/:token',
            components: {
                sectionView: SetInitialPassword
            }
        },{
            path:'forgot-password',
            name: 'forgotPassword',
            components: {
                sectionView: ForgotPassword
            }
        },{
            name:'resetPassword',
            path:'/reset-password/:token',
            components:{
                sectionView: ResetPassword
            }
        },{
            name:'verifyEmail',
            path:'/verify-email/:token',
            components:{
                sectionView: VerifyEmail
            }
        }
    ]
}