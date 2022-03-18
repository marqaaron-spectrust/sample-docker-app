export default {
    serverConfig: function(){
        return {
            "app_data": {
                VERSION: 'local'
            }
        }
    },
    successfulLoginResponse: function(){
        return {
            "app_data": {
                user: {
                    firstName: 'Jenny',
                    lastName: 'Public',
                    email: 'jennypublic@gmail.com',
                    phoneNumber: '555-867-5309'
                }
            }
        }
    }
}