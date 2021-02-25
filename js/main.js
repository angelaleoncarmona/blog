

const URL_API = 'https://api.airtable.com/v0/appPrEuIwDOgengPk/Table%201?maxRecords=3&view=Grid%20view';
const URL_API_ADD = 'https://api.airtable.com/v0/appPrEuIwDOgengPk/Table%201';
const URL_API_DELETE = 'https://api.airtable.com/v0/appPrEuIwDOgengPk/Table%201?records[]=';
const URL_API_UPDATE = 'https://api.airtable.com/v0/appPrEuIwDOgengPk/Table%201';
const AUTHORIZATION = 'Bearer keyOzTSqIJ6LUp99l';

new Vue({
    el: '#app',
    data: {
        textos: [],
        nuevoTitulo: '',
        nuevoTexto: '',
        nuevaImagen: ''
    },
    mounted: function () {
        this.obtenerEntradas();
    },
    methods: {
        obtenerEntradas: function () {
            fetch(URL_API, {
                headers: {
                    'Authorization': AUTHORIZATION
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then((json) => {
                    this.textos = json.records;
                });
        },
        anyadirEntradas: function () {
            fetch(URL_API_ADD, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': AUTHORIZATION
                },
                method: 'POST',
                body: JSON.stringify({
                    "records": [
                        {
                            "fields": {
                                "Titulo": this.nuevoTitulo,
                                "Foto": [
                                    {
                                        "url": "https://dl.airtable.com/.attachments".concat(this.nuevaImagen)
                                    }
                                ],
                                "Texto": this.nuevoTexto
                            }
                        }
                    ]
                })
            })
                .then(() => this.nuevoTitulo = '')
                .then(() => this.nuevoTexto = '')
                .then(() => this.nuevaImagen = '')
                .then(() => this.obtenerEntradas())
        },
        borrarEntradas: function (id) {
            // Borramos del API
            fetch(URL_API_DELETE.concat(id), {
                headers: {
                    'Authorization' : AUTHORIZATION
                },
                method: 'DELETE'
            });
            // Borramos del LOCAL
            this.textos = this.textos.filter(texto => texto.id !== id)
        },
        actualizarEntradas: function (id, nuevoTexto) {
            //actualizar producto
            fetch(URL_API_UPDATE, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : AUTHORIZATION
                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Nombre": nuevoTexto,
                            }
                        }
                    ]
                })
            })
                .then(() => this.obtenerEntradas())
        }
    }
})