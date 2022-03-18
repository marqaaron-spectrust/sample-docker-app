export default {
    post: function(_url,_body){
        return new Promise(
            (resolve,reject) => {
                let init = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(_body)
                }
                fetch(_url,init).then(
                    response => response.json()
                ).then(
                    data => {
                        if(data.error){
                            reject(data.error)
                        } else {
                            resolve(data)
                        }
                    }
                )
            }
        )
    },
    get: function(_url){
        return new Promise(
            (resolve,reject) => {
                let init = {
                    method: 'GET',
                    headers: {},
                    credentials: 'include'
                }
                fetch(_url,init).then(
                    response => response.json()
                ).then(
                    data => {
                        if(data.error){
                            reject(data.error)
                        } else {
                            resolve(data)
                        }
                    }
                )
            }
        )
    },
}