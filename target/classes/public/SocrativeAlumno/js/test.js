Vue.component('q-option1', {
  props: ['opcion', 'groupid'],
  template: `
        <div>
          <input type="radio" :name="groupid" :value="opcion.id"> {{opcion.opc}}
        </div>

    `
});
Vue.component('q-option2', {
  props: ['option', 'groupid'],
  template: `
        <div>
            hola2
        </div>

    `
});
Vue.component('q-option3', {
  props: ['option', 'groupid'],
  template: `
        <div>
            hola3
        </div>

    `
});

new Vue({
  el: "#test",
  data: {
    status: "",
    metaData: [],
    inombre: 'personal',
    JSONObj:{}
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
      this.JSONObj = JSON.parse(jvs);
      console.log(this.JSONObj);
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    }
  }
});
