const setMockData = function(_envConfig){
    let result = false;
    if(_envConfig.hasOwnProperty('VITE_ENABLE_MOCKDATA') && _envConfig.VITE_ENABLE_MOCKDATA === 'true'){
        result = true
    }
    return result;
}

export default {
    finalConfig: function(){
        let config = {
            mockData: setMockData(import.meta.env),
        }
        return config
    }
}