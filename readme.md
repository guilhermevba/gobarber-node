# Recuperar senha

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail
- O usuário deve receber um email com instruções para recuperação de senha
- O usuário deve poder resetar sua senha

**RNF**
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento
- Utilizar Amazon SES para envio de emails em produção
- O envio de emails deve acontecer em segundo plano (background job)

**RN**
- O link enviado por email deve  ser válido somente por 2 horas
- O usuário deve confirmar (digitar 2 vezes) sua senha ao recuperar

# Atualização do perfil

**RF**
- Usuário deve poder atualizar seu perfil (email, nome, senha)
-
**RNF**

**RN**
- Usuário não pode alterar seu email para um email já utilizado
- Para atualizar sua senha o usuário deve confirmar com a senha antiga
- Para atualizar sua senha o usuário deve confirmar a senha (digitar 2 vezes)
-

# Painel do prestador

**RF**
- O prestador deve poder listar seus agendamentos de um dia especifico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas
**RNF**
- Os agendamentos do prestador do dia devem se armazenados em cache
- As notificações do prestador devem ser armazenados no MongoDB
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços

**RF**
- O usuário deve poder listar todos prestadores cadastrados
- O usuário deve poder ver a agenda de disponibilidade do prestador selecionado
- O usuário deve poder realizar um agendamento com o prestador
-
**RNF**
- A listagem de prestadores deve ser armazenado em cache

**RN**
- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h-18h (ultimo horario as 17h)
- O usuário não pode agendar em um horario já ocupado
- O usuário não pode fazer um agendamento no passado
- O usuário não pode agendar um horario consigo


-----
RF - Requisitos funcionais
RNF - Requisitos não funcionais
RN - Regra de negócio
