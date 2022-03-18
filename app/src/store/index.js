import {createStore} from "vuex";
import envConfig from "../utilities/envConfig";
import serverApi from "../utilities/serverApi";
import mockData from "../mockData";

export default createStore({
    state: {
        appConfig: {
            ui: envConfig.finalConfig(),
            server: null
        },
        authentication: {
            isLoggedIn: false,
            user: null
        }
    },
    getters: {
        isLoggedIn(state){
            return state.authentication.isLoggedIn
        },
        loggedInUser(state){
            return state.authentication.user
        },
        appConfig(state){
            return state.appConfig
        }
    },
    actions: {
        setIsLoggedIn(context,payload){
            context.commit('setIsLoggedIn',payload)
        },
        setLoggedInUser(context,payload){
            context.commit('setLoggedInUser',payload)
        },
        fetchServerConfig(context,payload){
            return new Promise((resolve,reject)=>{
                if(!context.state.appConfig.ui.mockData){
                    serverApi.get('/api/config').then(
                        (result)=>{
                            context.commit('setServerConfig',result.app_data)
                            resolve()
                        },
                        (result)=>{
                            reject(result)
                        }
                    )
                } else {
                    let result = mockData.serverConfig()
                    context.commit('setServerConfig',result.app_data)
                    resolve()
                }
            })
        },
        registerNavigation(context,payload){
            return new Promise((resolve,reject)=>{
                if(!context.state.appConfig.ui.mockData){
                    let path = '/api/nav/' + payload
                    serverApi.get(path).then(
                        ()=>{
                            resolve()
                        },
                        (result)=>{
                            reject(result)
                        }
                    )
                } else {
                    resolve()
                }
            })
        },
        requestLogin(context,payload){
            return new Promise((resolve,reject)=>{
                if(!context.state.appConfig.ui.mockData){
                    let path = '/api/login'
                    serverApi.post(path,payload).then(
                        ()=>{
                            context.commit('setIsLoggedIn',true)
                            context.dispatch('requestAccountDetails').then(
                                ()=>{
                                    resolve()
                                },
                                (accountDetailsResult)=>{
                                    reject(accountDetailsResult)
                                }
                            )
                        },
                        (loginResult)=>{
                            reject(loginResult)
                        }
                    )
                } else {
                    context.commit('setIsLoggedIn',true)
                    context.dispatch('requestAccountDetails').then(
                        ()=>{
                            resolve()
                        },
                        ()=>{
                            reject()
                        }
                    )
                }
            })
        },
        requestLogout(context){
            return new Promise((resolve,reject)=>{
                if(!context.state.appConfig.ui.mockData){
                    let path = '/api/logout'
                    serverApi.get(path).then(
                        ()=>{
                            context.commit('setIsLoggedIn',false)
                            context.commit('setLoggedInUser',null)
                            resolve()
                        },
                        (result)=>{
                            reject(result)
                        }
                    )
                } else {
                    context.commit('setIsLoggedIn',false)
                    context.commit('setLoggedInUser',null)
                    resolve()
                }
            })
        },
        requestAccountDetails(context){
            return new Promise((resolve,reject)=>{
                if(!context.state.appConfig.ui.mockData){
                    let path = '/api/accountDetails'
                    serverApi.get(path).then(
                        (result)=>{
                            context.commit('setLoggedInUser',result.app_data.user)
                            resolve()
                        },
                        (result)=>{
                            reject(result)
                        }
                    )
                } else {
                    let result = mockData.successfulLoginResponse()
                    context.commit('setLoggedInUser',result.app_data.user)
                    resolve()
                }
            })
        }
    },
    mutations: {
        setIsLoggedIn(state,payload){
            state.authentication.isLoggedIn = payload
        },
        setLoggedInUser(state,payload){
            state.authentication.user = payload
        },
        setServerConfig(state,payload){
            state.appConfig.server = payload
        }
    }
})