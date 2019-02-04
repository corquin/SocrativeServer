Vue.component('q-option1', {
  props: ['opcion', 'groupid'],
  template: `
        <label>
            <input type="radio" :name="groupid" :value="opcion.id"> {{opcion.opc}}
        </label>
    `
});
Vue.component('q-option2', {
  /*data: function(){
    return{
      verdadero:"verdadero",
      falso:"falso"
    }
  },*/
  props: ['groupid'],
  template: `
        <label>
          <input type="radio" :name="groupid" value="1">Verdadero
          <input type="radio" :name="groupid" value="2">Falso
        </label>
    `
});
Vue.component('q-option3', {
  props: ['option', 'groupid'],
  template: `
        <label>
          <input type="text" :name="groupid">
        </label>
    `
});

new Vue({
  el: "#test",
  data: {
    status: "",
    key: "",
    metaData: [],
    inombre: '',
    JSONObj: {},
    respuestas: []
  },
  methods: {
    guarda: function() {
      for (var sjson in this.JSONObj.question) {
        this.key = this.JSONObj.question[sjson].id;
        var result = "0";
        if (this.JSONObj.question[sjson].tipo == 3) {
          result = document.getElementsByName(this.key)[0].value;
        } else {
          var radios = document.getElementsByName(this.key);
          for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              result = radios[i].value;
            }
          }
        }
        this.respuestas.push({
          id: this.key,
          pregunta: this.JSONObj.question[sjson].pregunta,
          respuesta: result
        });
      }
      this.respuestas.push({
        titulo: this.inombre
      });
      this.respuestas.push({
        key: '2'
      });
      console.log(this.respuestas);
      this.sendMessage(this.respuestas);
    },
    //solicitamos cuestonario
    solCuesto(){
      this.metaData.push({
        titulo: this.inombre
      });
      this.metaData.push({
        key: '1'
      });
      this.sendMessage(this.metaData);
    },
    //metodos WebSocket
    connect() {
      socket = new WebSocket("ws://localhost:4567/alumno");
      socket.onopen = this.openWs;
      socket.onerror = this.errorWs;
      socket.onmessage = this.messageWs;
    },
    openWs() {
      this.status = 'connected';
      alert("Usuario conectado");
      this.solCuesto();
    },
    errorWs(evt) {
      alert("Usuario fallido");
    },
    messageWs(evt) {
      var jvs = JSON.stringify(eval("(" + evt.data + ")"));
      this.JSONObj = JSON.parse(jvs);
      console.log(this.JSONObj);
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    }
  }
});
