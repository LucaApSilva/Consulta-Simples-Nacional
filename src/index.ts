import app from "./app"
import router from "./routers"

const porta = 3000

app.use(router)
app.listen(porta, () => console.log(`API rodando! na porta 3000`))
