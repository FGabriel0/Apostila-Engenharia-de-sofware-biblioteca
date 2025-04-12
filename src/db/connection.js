
//Importar o Mysql
const mysql = require("mysql2")

//Configuração de conexão
const conexao = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user:"root",
  password:"admin",
  database:"sakita"
})

conexao.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado ao MySQL!');
});

conexao.end((err)=>{
  if(err){
      console.log("Erro ao finalizar",err)
      return;
  }

})

module.exports = conexao;

