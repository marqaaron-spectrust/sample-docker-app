import store from "../store";
import localStorage from "./localStorage";

export const enforceAuthentication = function(_next){
    if(!store.getters.isLoggedIn){
        return _next('/');
    }
}

export const enforceAlreadyAuthenticated = function(_next){
    if(store.getters.isLoggedIn){
        return _next('/');
    }
}

export const redirectToLoginLocation = function(_next){
    return _next('/');
}

export const pullSaveUserDataFromLocalStorage = function(){
    let user = localStorage.get('user');
    if(user && user.isLoggedIn){
        store.dispatch('setIsLoggedIn',user.isLoggedIn);
        store.dispatch('setLoggedInUser',user.user);
        localStorage.write('user',store.state.authentication.user);
    } else if(store.state.authentication.isLoggedIn) {
        localStorage.write('user',store.state.authentication.user);
    }

}

export const removeUserDataFromLocalStorage = function(){
    localStorage.delete('user');
}