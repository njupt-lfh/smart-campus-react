import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:"auth",
    //定义初始状态，包含token属性，默认值为本地存储中的token或空字符串
    initialState:{
        token:localStorage.getItem("token") || ""
    },
    //定义reducers，包含setToken动作，用于更新token状态
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload//更新token状态为动作负载
            sessionStorage.setItem("token",action.payload)//将token存储到会话存储中
        },
        //定义clearToken动作，用于清空token状态
        clearToken:(state)=>{
            state.token=""//清空token状态
            sessionStorage.removeItem("token")//从会话存储中移除token
        }
    }
})

export const {setToken,clearToken}=authSlice.actions
export default authSlice.reducer
