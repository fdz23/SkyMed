# Diretrizes de código

## Nomenclatura:
### Métodos:
Inicia-se com letra minúscula e é conjugado na terceira pessoa do subjuntivo no presente. Exemplo:
- execute();
- comunique();
- obtenha();
### Variáveis:
Inicia-se com letra minúscula, tem uma descrição precisa do dado que essa variável recebe, mas sem dizer o tipo diretamente e não é um verbo e sim um substantivo. Exemplo:
- listaDePacocas - errado
- pacocas - correto
- vetorDeUsuarios - errado
- usuarios - correto
- aux - errado
- usuarioClonado - correto
- antUsu - errado
- nUsu - correto
## Git:
### Commits:
Nome do commit deve ter a descrição suscinta do objetivo, não deve conter muito código, faça commits de acordo com a finalidade da sua alteração, se for adicionar código, faça um commit de adição, se for alterar código, faça um commit de alteração.

Comece o nome do commit sempre pelo tipo da alteração feita.

Sempre crie um novo branch(tirado da master mais recente), o nome não importa muito, mas tente fazer algo relacionado à alteração.

Se precisar de uma explicação mais longa, o faça no campo do pull request.

Exemplo:
- update - errado
- Criado método de busca por nome - correto
- Criado método de busca por nome que busca com o método busca binária e recebe um arraylist que contém apenas strings e tem 15 indices compostos por nomes completos - errado
- Correção - errado
- Corrigida função de mudança de página
