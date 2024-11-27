import { configureStore } from "@reduxjs/toolkit";
import  adminAuth  from "./adminAuth";
 


const store = configureStore({
    reducer:{
        admin:adminAuth
    }
})

export default store