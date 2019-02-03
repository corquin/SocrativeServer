const app = new Vue({
  el: '#app',
  data: {
    //variables transicion interfas
    status: "",
    menu: false,
    imenu: true,
    accion: false,
    //variables transicion cuestonario
    newc: false,
    listC: false,
    genRC: false,

    //variables transicion tipPregunta
    seeMO: false,
    seeVF: false,
    seeRC: false,
    ag:false,
    ac:false,

    //variables clave
    opSolicita: 0,

    //variables de solicitud
    solicita: [],
    jsonObj: {},
    jsonObj2: {},

    //variables para el cuestonario
    inombre: '',
    cuestonario: [],
    idp: 0,
    ipregunta: '',
    resp1: '',
    resp2: '',
    resp3: '',
    rValida: '',
    index: '',
  },
  methods: {
    recarga: function() {
      let bd = JSON.parse(localStorage.getItem('data-vue'));
      if (bd === null) {
        this.cuestonario = [];
      } else {
        this.cuestonario = bd;
        this.idp = this.cuestonario.length;
      }
    },
    clear: function() {
      this.ipregunta = '';
      this.resp1 = '';
      this.resp2 = '';
      this.resp3 = '';
      this.rValida = '';
    },
    multiOpcion: function() {
      this.idp = this.idp + 1;
      this.cuestonario.push({
        id: this.idp,
        tipo: '1',
        pregunta: this.ipregunta,
        opciones: [{
            id: 1,
            opc: this.resp1
          },
          {
            id: 2,
            opc: this.resp2
          },
          {
            id: 3,
            opc: this.resp3
          }
        ],
        valida: this.rValida
      });
      app.clear();
      localStorage.setItem('data-vue', JSON.stringify(this.cuestonario));
    },
    VFOption: function() {
      this.idp = this.idp + 1;
      this.cuestonario.push({
        id: this.idp,
        tipo: '2',
        pregunta: this.ipregunta,
        valida: this.rValida
      });
      app.clear();
      localStorage.setItem('data-vue', JSON.stringify(this.cuestonario));
    },
    RCorta: function() {
      this.idp = this.idp + 1;
      console.log(this.idp);
      this.cuestonario.push({
        id: this.idp,
        tipo: '3',
        pregunta: this.ipregunta,
        valida: this.rValida
      });
      app.clear();
      localStorage.setItem('data-vue', JSON.stringify(this.cuestonario));
    },
    editarTarea: function(iindex) {
      this.index = iindex;
      switch (this.cuestonario[iindex].tipo) {
        case '1':
          this.seeMO = true;
          this.ipregunta = this.cuestonario[iindex].pregunta;
          this.resp1 = this.cuestonario[iindex].opciones[0].opc;
          this.resp2 = this.cuestonario[iindex].opciones[1].opc;
          this.resp3 = this.cuestonario[iindex].opciones[2].opc;
          this.rValida = this.cuestonario[iindex].valida;
          break;

        case '2':
          this.seeVF = true;
          this.ipregunta = this.cuestonario[iindex].pregunta;
          this.rValida = this.cuestonario[iindex].valida;
          break;

        case '3':
          this.seeRC = true;
          this.ipregunta = this.cuestonario[iindex].pregunta;
          this.rValida = this.cuestonario[iindex].valida;
          break;
      }
      //this.cuestonario[index].estado = true;
      //localStorage.setItem('data-vue', JSON.stringify(this.cuestonario));
    },
    actualizarTarea: function() {
      if (this.cuestonario[this.index].tipo == '1') {
        this.cuestonario[this.index].pregunta = this.ipregunta;
        this.cuestonario[this.index].opciones[0].opc = this.resp1;
        this.cuestonario[this.index].opciones[1].opc = this.resp2;
        this.cuestonario[this.index].opciones[2].opc = this.resp3;
        this.cuestonario[this.index].valida = this.rValida;
      }

      if (this.cuestonario[this.index].tipo == '2') {
        this.cuestonario[this.index].pregunta = this.ipregunta;
        this.cuestonario[this.index].valida = this.rValida;
      }

      if (this.cuestonario[this.index].tipo == '3') {
        this.cuestonario[this.index].pregunta = this.ipregunta;
        this.cuestonario[this.index].valida = this.rValida;
      }

      localStorage.setItem('data-vue', JSON.stringify(this.cuestonario));
    },
    eliminarTarea: function(index) {
      this.cuestonario.splice(index, 1);
      localStorage.setItem('data-vue', JSON.stringify(this.cuestonario));
    },
    enviarTest() {
      if (Object.keys(this.cuestonario).length === 0) {
        alert("no a creado preguntas");
      } else {
        this.cuestonario.push({
          titulo: this.inombre
        });
        this.cuestonario.push({
          key: '1'
        });
        this.sendMessage(this.cuestonario);
      }
    },
    nomCuestonarios() {
      this.solicita.push({
        titulo: "null"
      });
      this.solicita.push({
        key: '2'
      });
      this.sendMessage(this.solicita);
      this.solicita = [];
    },
    pedirCuestonario() {
      if (this.inombre == "") {
        alert("sin nombre");
      } else {
        alert("con nombre");
        this.solicita.push({
          titulo: this.inombre
        });
      }
      this.solicita.push({
        key: '3'
      });
      this.sendMessage(this.solicita);
      this.solicita = [];
    },

    //metodos de conexion a WebSocket
    connect() {
      socket = new WebSocket("ws://localhost:4567/profesor");
      socket.onopen = this.openWs;
      socket.onerror = this.errorWs;
      socket.onmessage = this.messageWs;
      app.recarga();
    },
    openWs() {
      this.status = "conectado";
      alert("Usuario conectado");
    },
    errorWs(evt) {
      this.status = "";
      alert("Usuario fallido");
    },
    messageWs(evt) {
      var jvs = JSON.stringify(eval("(" + evt.data + ")"));
      if (this.opSolicita == 1) {
        this.jsonObj = JSON.parse(jvs);
        this.opSolicita = 0;
        console.log(this.jsonObj);
      }
      if (this.opSolicita == 2) {
        this.jsonObj2 = JSON.parse(jvs);
        this.opSolicita = 0;
        console.log(this.jsonObj2);
      }
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    }
  },
  /*created: function() {
    this.connect();
    let bd = JSON.parse(localStorage.getItem('data-vue'));
    if (bd === null) {
      this.cuestonario = [];
    } else {
      this.cuestonario = bd;
      this.idp = this.cuestonario.length;
    }
  }*/
});
