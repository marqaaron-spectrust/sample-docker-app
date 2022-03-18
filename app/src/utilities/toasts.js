import Toastify from "toastify-js"

export default {

    standardToast: function(_message){
        return Toastify({
            text: _message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "left",
            style: {
                background: "#4086e4"
            }
        }).showToast()
    }

}