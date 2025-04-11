const mysql = require("mysql");
const con = mysql.createConnection({
    host:"localhost:3306",
    user:"root",
    password:"admin",
    database:"sakita"

})

con.connect((err)=>{
    if(err){
        console.log("Erro ao se conectar ao database",err)
        return;
    }
    console.log("Conexão Realizada")

})

con.end((err)=>{
    if(err){
        console.log("Erro ao finalizar",err)
        return;
    }

    console.log("Conexão Realizada")
})