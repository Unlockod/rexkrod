const express = require("express")
const cors = require("cors")

const app = express() 

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) { 
    this.id = id
    }

    asignarRexkrod(rexkrod) {
        this.rexkrod = rexkrod
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Rexkrod {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push (jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/rexkrod/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.rexkrod || ""
    const rexkrod = new Rexkrod(nombre)

    const jugadoresIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadoresIndex >= 0) {
        jugadores[jugadoresIndex] .asignarRexkrod(rexkrod)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/rexkrod/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadoresIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadoresIndex >= 0) {
        jugadores[jugadoresIndex] .actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/rexkrod/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques ||[]

    const jugadoresIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadoresIndex >= 0) {
        jugadores[jugadoresIndex].asignarAtaques(ataques)
    }

    res.end()
})
app.get("/rexkrod/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})
