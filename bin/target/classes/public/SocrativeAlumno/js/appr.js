
new Vue({
    el: "#app",
    data: {
        status: "",
        llave: "",
        cuestionario:{}
    },
    methods: {
        conectarse() {
            socket = new WebSocket("ws://localhost:4567/responder");
            socket.onopen = this.openWs;
            socket.onerror = this.errorWs;
            socket.onmessage = this.messageWs;
        },
        openWs() {
            this.status = 'coneccion establecida';            
            this.sendMessage(this.status);
        },
        errorWs(evt) {
            this.status = 'error';            
        },
        messageWs(evt) {
            this.survey = JSON.parse(evt.data);            
        },
        sendMessage(msgData) {
            socket.send(msgData);
        }
    }
});

