# Projeto
<br/>
<p>
  Esse projeto consiste em uma api rest feita em node com typescript, com duas rota uma de criação de usuario e outra para procurar um usuario por cpf. Nessa api coloquei em prática: os  conceito do clean architecture(SOLID), os conceitos de clean code, Design patterns e typescript no backend com testes unitários.
</p>
<br/>

# Tecnologias:

- Node
- Typescript
- Express
- Jest
- Postgres
- TypeOrm
- Eslint
- Prettier
- Uuid
- Dotenv

<br/>

# Como executar a api

- Primeiro temos que rodar (na pasta do projeto) o comando yarn ou npm;
- Criar um arquivo .env na raiz do projeto, logo após:
  - Copiar todo que tem no arquivo .env.exeample e colar no arquivo .env;
  - Completar as credencias do postgres no .env;
- executar as migrations com o comando yarn typeorm migration:run ou npx typeorm migration:run
- por fim executar yarn start ou npm run start

<br/>

# Rotas da Api

Formato de um usuário na aplicação:

```Json
{
  "id": "uuid",
  "firstName": "string",
  "lastName": "string",
  "cpf": "string",
  "phone": "string"
}
```
<br/>

## Rotas:

rota | método
------------ | -------------
/users | POST
/cpf/:cpf | GET
<br/>

## Rota /users

<br/>

### Status Code: 200
```Json
{
	"firstName": "User_First_Name",
	"lastName": "User_Last_Name",
	"cpf": "User_Cpf",
	"phone": "User_Phone"
}
```

### Status Code: 400

```Json
{
  "success": false,
  "message": "Error Message"
}
```

Obs.: esse Error Message pode ser: "Cpf Invalido", "Numero de telefone Invalido" ou "Usuario ja Cadastrado"

<br />

## Rota /cpf/:cpf

<br/>

### Status Code: 200
```Json
{
  "success": true,
  "user": {
    "id": "Uuid_User",
    "firstName": "User_First_Name",
	"lastName": "User_Last_Name",
	"cpf": "User_Cpf",
	"phone": "User_Phone"
  }
}
```

### Status Code: 404

```Json
{
  "success": false,
  "message": "Informações de CPF não armazenadas."
}
```

<br/>

# Como rodar os testes:

- Executamos os testes com o comando yarn test ou npm run test

