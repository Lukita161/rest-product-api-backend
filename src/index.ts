import server from "./server";

const PORT = process.env.PORT || 4000
server.listen(PORT, ()=> {
    console.log("RestApi en el puerto 4000")
})