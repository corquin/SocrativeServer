new Vue({
  el: "#test",
  data: {
    status: "",
    metaData: [],
    inombre: 'primerCuestonario',
    cuestionario: {}
  },
  methods: {
    connect() {
      socket = new WebSocket("ws://localhost:4567/alumno");
      socket.onopen = this.openWs;
      socket.onerror = this.errorWs;
      socket.onmessage = this.messageWs;
    },
    openWs() {
      this.metaData.push({
        nombre: this.inombre
      });
      this.status = 'connected';
      alert("Usuario conectado");
      //console.log(this.inombre);
      this.sendMessage(this.metaData);
    },
    errorWs(evt) {
      alert("Usuario fallido");
    },
    messageWs(evt) {
      var str = evt.data;
      str = str
      .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":'})
      .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"'});
      console.log(str);
      this.cuestionario = JSON.parse(str);
      console.log(evt.data);
      console.log(this.cuestonario);
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    }
  }
});
