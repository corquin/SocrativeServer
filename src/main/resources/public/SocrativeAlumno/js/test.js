Vue.component('q-option', {
  props: ['option', 'groupid'],
  template: `
        <div>
            <input type="radio" :name="groupid" :value="option.id"> {{ option.text }}
        </div>

    `
});

new Vue({
  el: "#test",
  data: {
    status: "",
    metaData: [],
    inombre: 'primerCuestonario'
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
      //var str = evt.data;
      var jvs = JSON.stringify(eval("(" + evt.data + ")"));
      //console.log(jvs);
      JSONObj = JSON.parse(jvs);
      console.log(JSONObj);
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    }
  }
});
