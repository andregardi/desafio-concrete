# Desafio

Desafio proposto no processo seletivo da Concrete Solutions.

## Proposta

Implementar uma aplicação client-side, que consulte a API do GitHub e mostre os repositórios de um determinado usuário. Esta aplicação deve funcionar nos navegadores mais recentes do mercado.

## Navegação

* Ao buscar um usuário pelo login do github, direcionar para pagina de resultado de busca.

* Se o usuário for encontrado apresentar pagina de detalhes do usuário (Layout result), caso contrario exibir mensagem amigável (Layout NotFound).

## Requisitos

* Eu, como usuário, desejo buscar por um usuário do GitHub;

* Eu, como usuário, desejo ver os detalhes desse usuário que foi buscado (número de seguidores, número de seguidos, imagem do avatar, e-mail e bio);

* Eu, como usuário, desejo ver a listagem dos repositórios desse usuário que foi buscado, ordenados pelo número decrescente de estrelas;

## Endpoints
 
* Detalhes de um usuário: [(https://api.github.com/users/{username}](https://api.github.com/users/{username})

* Repositórios de um usuário: [https://api.github.com/users/{username}/repos](https://api.github.com/users/{username}/repos)

## Tecnologias
* Foi utilizado o framework Angular 6 para o desenvolvimento.
* Para o servidor em produção foi utilizado o Express.js, embora o Angular gere arquivos estáticos e possa ser hospedado em quase todos os tipos de servidores.
* Para rodar o Angular e o Express.js é necessário instalar o Node.js e os pacotes de dependência.

## Instalando dependências
<pre>npm install</pre>

## Rodando o Angular em ambiente de desenvolvimento
<pre>ng serve</pre>

## Rodando os teste unitários com Karma
<pre>ng test</pre>

## Compilando arquivos estáticos finais para produção
<pre>ng build --prod</pre>

## Iniciando servidor Express.js
<pre>node server.js</pre>

## Obeservações sobre o projeto
O layout do Zeplin.io tem algumas pequenas divergências com os requisitos escritos:

“Eu, como usuário, desejo ver os detalhes desse usuário que foi buscado (número de seguidores, número de seguidos, imagem do avatar, e-mail e bio);”

1 - No layout não existe elementos elementos referentes ao número de seguidos, e-mail nem bio. Para resolver, tomei a liberdade de criar novos elementos com o mesmo formato do userlogin. Para o número de seguidos, eu coloquei no mesmo elemento do número de seguidores, separando os dois valores por uma barra (seguidores / seguidos).

2 - O layout sugere que devam ser exibidos userlogin, nome da empresa, localização, quantidade de estrelas, e quantidade de repositórios. Apesar disso, esses elementos não estão explicitamente escritos nos requisitos. Eu optei por permanecer exibindo esses elementos no projeto, mas deixando claro que num projeto real isso deveria ser conversado melhor.

3 - O número de estrelas do usuário não está disponível no endpoint fornecido:
https://api.github.com/users/{username}
Para contornar o problema criei uma função que soma todas as estrelas de todos os repertórios do usuário, tendo assim algum valor para exibir no elemento.

