<h1 align="left">Sistema de cadastro</h1>

###

<p align="left">Esta é uma aplicação front-end de um sistema de cadastro desenvolvido com o framework Vue.js 3 permitindo o cadastro, listagem, edição e exclusão de clientes.</p>

###

<div align="center"> 

![Screenshot from 2023-09-11 03-02-22](https://github.com/brunnaserafina/data-hub/assets/106851605/53cc7823-1df5-4f25-a6a1-ed8192c66261)

</div> 

###


###

<br clear="both">

### Funcionalidades

- Cadastrar novos clientes
- Listar cadastros feitos
- Filtrar/pesquisar cadastros
- Editar cadastro existente
- Deletar cadastro
- Sidebar e navbar facilitando futuras implementações
- Validação de nome como campo obrigatório
- Validação de CPF
- Feedback de erro nos campos de input
- Alerts amigáveis e personalizados
- Gerenciamento de rotas com Vue Router
- Consumo de API RESTful com o Axios
- Gerenciamento dos estados da aplicação com Vuex
- Processador SCSS
- Layout responsivo/adaptável para dispositivos mobile
###

<br />

### Tecnologias utilizadas

###
  <img align="left" alt="vue" height="30px" src="https://img.shields.io/badge/-Vue-4fc08d?style=flat&logo=vuedotjs&logoColor=fff" />
  <img align="left" alt="typescript" height="30px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img align="left" alt="axios" height="30px" src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white" />
  <img align="left" alt="sass" height="30px" src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />

###

<br />
<br />
<br />

### Pré-requisitos de instalação

Certifique-se de ter os seguintes pré-requisitos instalados antes de executar o projeto:

- Node.js
- npm (Node Package Manager)

<br />
<br />

### Rodando a aplicação

1. Clone este repositório para o seu computador:

```bash
 $ git clone https://github.com/brunnaserafina/data-hub.git
```

2. Navegue até o diretório do projeto:
```bash
 $ cd data-hub
```

4. Instale as dependências utilizando o npm:
```bash
 $ npm i
```
5. Execute o comando abaixo para iniciar o servidor de desenvolvimento do VueJS:

```bash
 $ npm run serve
```

7. Por fim, a aplicação estará rodando na porta http://localhost:8080 
###
<br />
<br />

### API Backend
O projeto consome uma API RESTful com json-server para fins de desenvolvimento. Para utilizar esse serviço siga os seguintes passos:

1. Instale o json-server globalmente, se ainda não estiver instalado:

```bash
 $ npm install -g json-server
```
2. Execute o comando para iniciar o json-server com a base de dados data.json já inclusa no projeto:

```bash
 $ json-server --watch data.json
```
3. O servidor estará rodando na porta indicada, possivelmente http://localhost:3000 e indicará as rotas existentes
<br />
<br />

### Testes
A aplicação possui alguns testes unitários utilizando Jest e Vue Test Utils. Estão localizados na pasta "tests/unit" e para rodar basta executar o comando abaixo na raíz do projeto.

```bash
 $ npm run test:unit
```
ou 

```bash
 $ npx jest
```
<br />
<br />

### Utilização da aplicação
Após iniciar a aplicação, você terá acesso às seguintes funcionalidades:

- Cadastro de clientes: a aplicação será iniciada nessa página. Para cadastrar uma nova pessoa basta preencher os campos de input solicitados (sendo o nome completo e o CPF requisitos obrigatórios) e clicar no botão salvar;
- Listar cadastros: para acessar essa funcionalidade basta clicar na opção "Gerenciar cadastros" localizada na sidebar. Uma tabela com os cadastros existentes será exibida na tela e ao lado de cada cadastro há um botão com um icon de lápis, que ao ser clicado encaminhará para a página de edição de cadastro. Nessa página, além dos campos de input e do botão de salvar edição, há também um botão de excluir. Este, ao ser clicado, confere com o usuário se realmente deseja excluir o cadastro em questão, caso sim, os dados são excluídos e o usuário é encaminhado para a página de gerenciar cadastros novamente;
- Alerts personalizados e feedbacks de input: erros do servidor e de validações são apresentados de forma amigável ao usuário.


### Autora

- [@brunnaserafina](https://www.github.com/brunnaserafina)


