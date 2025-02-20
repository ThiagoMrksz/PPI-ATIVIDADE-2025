import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";

const porta = 3000;
const localhost = '0.0.0.0'; // define nosso aplicativo estará disponível em todas as interfaces de rede desse computador

const app = express ();

// configurar como o express ira processar os parâmetros do formulario
app.use(express.urlencoded({extendo: true})); //biblioteca QS (pesquisar depois diferença entre QS e Query String)

app.use(session({
    secret: "s3gr3d0",  //estudar variaveis de ambiente para entender mais 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 // 15 minutos maximo de sessão, caso ficar mais que 15 minutos afk a sessão sera encerrada
    }

}));

//o HTTP é um protocolo stateless (sem estabelecimento de sessão)
//o servidor recebe uma requisição, processa a requisição e envia uma resposta
//sem se preocupar em identificar os atores envolvidos

//com o auxilio da biblioteca express-session
//vamos implementar a habilidade de estabelecer uma sessão
//para um determinado usuario

//oferecer o recurso login
app.get("/login", (requisicao, resposta) => {
    resposta.redirect("./login.html");
})

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "admin") {
        requisicao.session.autenticado = true;
        resposta.redirect("/index.html");
    } else {
        resposta.redirect("/login.html");
    }
});


app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html')
})
//prepara o servidor para disponibilizar recursos estáticos
// erro : http://localhost:3000/publico/index.html
//certo http://localhost:3000/index.html
app.use(express.static("./publico"));
 
//disponibilizando os arquivos da pasta privada
//a funçao autenticar se comporta com um middleware (atua na camada do meio)
app.use(autenticar, express.static("./privado"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
    // string literals `${}`, string literal so funciona com crase, nao funciona com aspas simples.
})


