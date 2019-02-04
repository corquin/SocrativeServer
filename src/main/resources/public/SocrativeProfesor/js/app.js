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
    ag: false,
    ac: false,

    //variables clave
    opSolicita: 0,

    //variables de solicitud
    solicita: [],
    jsonObj: {},
    jsonObj2: {},
    jvsT: "",

    //variables exportCSVFile
    taC: `[{"Id":1,"UserName":"Sam Smith"},
            {"Id":2,"UserName":"Fred Frankly"},
            {"Id":1,"UserName":"Zachary Zupers"}]`,
    taRes: "",

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
    //presentamos preguntas
    presenCuesto() {
      var est = 0;
      for (var i = 0; i < this.jvsT.length; i++) {
        var char = this.jvsT.charAt(i);
        if (char == '[' && est == 0) {
          est = i;
        }
      }
      this.taC = this.jvsT.substring(est, this.jvsT.length - 1);
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
        this.jvsT = jvs;
        console.log(this.jvsT);
        this.jsonObj2 = JSON.parse(jvs);
        this.opSolicita = 0;
        console.log(this.jsonObj2);
        this.presenCuesto();
      }
    },
    sendMessage(msgData) {
      json = JSON.stringify(msgData);
      socket.send(json);
    },
    //metodo para imprimir
    exportCSVFile: function() {
      //libreria JSON2CSV
      var json = this.taRes;
      if (json == "") {
        alert("no hay nada");
      } else {
        var exportedFilenmae = this.jsonObj2.name + '.csv' || 'export.csv';
        var blob = new Blob([json], {
          type: 'text/csv;charset=utf-8;'
        });
        if (navigator.msSaveBlob) { // IE 10+
          navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
          var link = document.createElement("a");
          if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      }
    },
    convertToCSV: function() {
      //libreria JSON2CSV
      var json = $.parseJSON($("#json").val());
      var array = typeof json != 'object' ? JSON.parse(json) : json;
      var str = '';
      var line = '';
      if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
          for (var index in array[0]) {
            var value = index + "";
            line += '"' + value.replace(/"/g, '""') + '",';
          }
        } else {
          for (var index in array[0]) {
            line += index + ',';
          }
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
      }
      for (var i = 0; i < array.length; i++) {
        var line = '';
        if ($("#quote").is(':checked')) {
          for (var index in array[i]) {
            var value = array[i][index] + "";
            line += '"' + value.replace(/"/g, '""') + '",';
          }
        } else {
          for (var index in array[i]) {
            line += array[i][index] + ',';
          }
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
      }
      this.taRes = str;
      $("#csv").val(str);
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
