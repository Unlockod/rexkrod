const sectionSeleccionarAtaque = document.getElementById('select-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('select-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')


const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let rexkrodes = []
let rexkrodesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeRexkrodes
let inputDraxor
let inputTemso 
let inputLux 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesRexkrod
let ataquesRexkrodEnemigo
let botonFuego 
let botonAgua
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './asset/mapa.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Rexkrod {
    constructor (nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 50
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMascota() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let draxor = new Rexkrod('Draxor', './asset/Draxor.png', 5, './asset/PerfilDraxor.png')
let temso = new Rexkrod('Temso', './asset/Temso.png', 5, './asset/PerfilTemso.png')
let lux = new Rexkrod('Lux', './asset/Lux.png', 5, './asset/PerfilLux.png')

const DRAXOR_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '⛰', id: 'boton-tierra' },
]
draxor.ataques.push(...DRAXOR_ATAQUES)

const TEMSO_ATAQUES = [
    { nombre: '⛰', id: 'boton-tierra' },
    { nombre: '⛰', id: 'boton-tierra' },
    { nombre: '⛰', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]
temso.ataques.push(...TEMSO_ATAQUES)

const LUX_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '⛰', id: 'boton-tierra' },
]
lux.ataques.push(...LUX_ATAQUES)

rexkrodes.push(draxor, temso, lux)

function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    
    rexkrodes.forEach((rexkrod) => {
        opcionDeRexkrodes = `
        <input type="radio" name="mascota" id=${rexkrod.nombre} />
        <label class="tarjeta-de-rexkrod" for=${rexkrod.nombre} ><p>${rexkrod.nombre}</p><img src= ${rexkrod.foto} alt=${rexkrod.nombre}></label>
        `
    
    contenedorTarjetas.innerHTML += opcionDeRexkrodes
    inputDraxor = document.getElementById('Draxor')
    inputTemso = document.getElementById('Temso')
    inputLux = document.getElementById('Lux')
} )
    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotajugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.100.58:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                })
            }
        })
}

function seleccionarMascotajugador() {
    if (inputDraxor.checked) {
        spanMascotaJugador.innerHTML = inputDraxor.id
        mascotaJugador = inputDraxor.id
    } else if (inputTemso.checked) {
        spanMascotaJugador.innerHTML = inputTemso.id
        mascotaJugador = inputTemso.id
    } else if (inputLux.checked) {
        spanMascotaJugador.innerHTML = inputLux.id
        mascotaJugador = inputLux.id
    } else {
        alert('Primero selecciona una Mascota')
        return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMascota(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMascota(mascotaJugador){
    fetch(`http://192.168.100.58:8080/rexkrod/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rexkrod: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < rexkrodes.length; i++) {
        if (mascotaJugador === rexkrodes[i].nombre) {
            ataques = rexkrodes[i].ataques 
        }   
    }
        mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesRexkrod = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesRexkrod
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '⛰') {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }   else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.100.58:8080/rexkrod/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.100.58:8080/rexkrod/${enemigoId}/ataques`)
        .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }

                    })
            }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesRexkrodEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesRexkrodEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE");
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] ==='AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate")
    }   else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES GANASTE")
    }   else {
        crearMensajeFinal('💀💀PERDISTE SIGUE INTENTANDO💀💀')
    }
}

function crearMensaje(resultado) {
    
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)+ min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMascota()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    rexkrodesEnemigos.forEach(function (rexkrod) {
        rexkrod.pintarMascota()
        revisarColision(rexkrod)
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.100.58:8080/rexkrod/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)  
                    rexkrodesEnemigos = enemigos.map(function (enemigo) {
                        let rexkrodEnemigo = null
                        const rexkrodNombre = enemigo.rexkrod.nombre || ""
                        if (rexkrodNombre === "Draxor") {
                            rexkrodEnemigo = new Rexkrod('Draxor', './asset/Draxor.png', 5, './asset/PerfilDraxor.png', enemigo.id)
                        } else if (rexkrodNombre === "Temso") {
                            rexkrodEnemigo = new Rexkrod('Temso', './asset/Temso.png', 5, './asset/PerfilTemso.png', enemigo.id)
                        } else if (rexkrodNombre === "Lux") {
                            rexkrodEnemigo = new Rexkrod('Lux', './asset/Lux.png', 5, './asset/PerfilLux.png', enemigo.id)
                        }

                        rexkrodEnemigo.x = enemigo.x
                        rexkrodEnemigo.y = enemigo.y

                        return rexkrodEnemigo
                    }) 
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}
function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < rexkrodes.length; i++) {
        if (mascotaJugador === rexkrodes[i].nombre) {
            return rexkrodes[i]
        }   
    }  
}
function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener ('load', iniciarJuego)