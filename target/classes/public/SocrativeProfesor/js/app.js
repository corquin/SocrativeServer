const app = new Vue({
  el: '#app',
  data: {
    titulo: 'Mi Socrative',
    seeMO: false,
    seeVF: false,
    seeRC: false,

    ag: false,
    ac: false,

    metaData: [],
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
    enviarBackEnd() {
      this.metaData.push({
        nombre: this.inombre
      });
      this.sendMessage(this.metaData);
      this.sendMessage(this.cuestonario);
      this.metaData = [];
    },
    //metodos de conexion a WebSocket
    connect() {
      socket = new WebSocket("ws://localhost:4567/profesor");
      socket.onopen = this.openWs;
      socket.onerror = this.errorWs;
      //socket.onmessage = this.messageWs;
    },
    openWs() {
      //console.log(sw.estado + " " + ws.nombre);
      alert("Usuario conectado");
      //this.sendMessage(this.key);
    },
    errorWs(evt) {
      alert("Usuario fallido");
      //console.log(evt.cuestonario);
    },
    messageWs(evt) {
      json = JSON.parse(evt.cuestonario);
      console.log(evt.cuestonario);
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    }
    /*json = JSON.stringify(evt.cuestonario);
    console.log(evt.cuestonario);
    this.sendMessage(json);*/
  },
  created: function() {
    this.connect();
    let bd = JSON.parse(localStorage.getItem('data-vue'));
    if (bd === null) {
      this.cuestonario = [];
    } else {
      this.cuestonario = bd;
      this.idp = this.cuestonario.length;
    }
  }
});
