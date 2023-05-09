# Socket_io Homework

Estudo do framework Socket.io por meio de sua introdução (https://socket.io/get-started/chat) com a maioria dos trabalhos de casa sugeridos no site completos (exceto "Adicionar mensagens privadas").  

Feito com Node.js para rodar no servidor + Express.js para tratamento de rotas

# Como utilizar
1. Instale as dependências na pasta de seu projeto
```cmd
npm install
```    

2. Tendo Node.JS instalado, execute o script e abra o link que aparecer no terminal (padrão: http://localhost:3000)
```cmd
node index.js
```

3. Abra ao menos duas abas do servidor (http://localhost:3000), insira nomes diferentes para cada usuário, e experimente mandar uma mensagem em tempo real com as duas abas sendo exibidas lado a lado.

## Dependências

[express@4.18.2](https://www.npmjs.com/package/express/v/4.18.2)  
[socket.io@4.6.1](https://www.npmjs.com/package/socket.io/v/4.6.1)  

## Bugs Conhecidos

- O input de escrever mensagem não inicia no fim da janela (CSS)
- Quando mais de uma pessoa está digitando, apenas a última que digitou algo é exibida para os outros

## Licença

[MIT](https://choosealicense.com/licenses/mit/)

