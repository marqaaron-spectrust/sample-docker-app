export default {
    generateAlert: function(_errors){
        let error = _errors[0]
        let alert = {
            title: 'Endpoint Error',
            message: 'There was an issue with the Hub Server Endpoint.'
        }
        if(error.extensions.code === 'UNAUTHENTICATED'){
            alert.title = 'Login Failed'
            alert.message = 'Please try again with a valid email and password'
        }
        return alert
    }
}