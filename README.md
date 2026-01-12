
📱 App de Gestão Educacional
Um aplicativo desenvolvido em React Native (Expo) para gerenciar aulas, usuários (professores e alunos) e interações em um ambiente educacional.

🚀 Funcionalidades

👤 Autenticação
Login/Cadastro: Tela única para login e registro de novos usuários.

🧑‍🏫 Área do Professor (Exclusiva)
FormPost: Formulário para criação de novas aulas.

Dashboard: Listagem de todas as aulas criadas pelo professor.

ProfileScreen: Lista de usuários (alunos e professores).

EditProfile: Edição de perfis (professores podem editar qualquer usuário; alunos só o próprio).

👨‍🎓 Área do Aluno
Home (PostList): Listagem de todas as aulas disponíveis.

SinglePost: Página detalhada de uma aula selecionada.

EditProfile: Edição apenas do próprio perfil.

🗂 Navegação
Tabs: Sistema de abas para organização das telas principais.

🏗 Arquitetura e Contextos
🔐 AuthContext
Gerencia o estado de autenticação do usuário (login, logout, token, etc.).

🔄 GenericContext
Compartilha estados e funções dos hooks customizados:

usePosts: Gerencia operações relacionadas às aulas (criação, listagem, etc.).

useProfile: Gerencia operações relacionadas aos perfis de usuários.

⚙️ Configuração e Instalação
Pré-requisitos
Node.js (versão 18 ou superior)

Expo CLI instalada globalmente

Passos
Clone o repositório:

bash
git clone <URL_DO_REPOSITORIO> 

Acesse a pasta do projeto:

bash
npm install  

Inicie o projeto:
bash
npm start  
Use o app pelo Expo Go no celular ou emulador.

📂 Estrutura de Pastas

📦src
 ┣ 📂app
 ┃ ┗ 📜_layout.tsx
 ┣ 📂components
 ┃ ┣ 📂screens
 ┃ ┃ ┣ 📂Dashboard
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂ProfileManager
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📂EditProfile
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂FormtPost
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂PostsList
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂SinglePost
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┣ 📂context
 ┃ ┣ 📜AuthContext.tsx
 ┃ ┗ 📜GenericContext.tsx
 ┣ 📂hooks
 ┃ ┣ 📜usePosts.tsx
 ┃ ┗ 📜useProfile.tsx
 ┣ 📂interfaces
 ┃ ┗ 📜index.ts
 ┣ 📂routes
 ┃ ┣ 📂AppNavigator
 ┃ ┃ ┣ 📜Tabs.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂services
 ┃ ┣ 📜posts.ts
 ┃ ┗ 📜profiles.ts
 ┗ 📂utils
 ┃ ┗ 📜index.ts


🛠 Tecnologias Utilizadas

React Native (Expo)

React Navigation (para navegação)

Context API (gerenciamento de estado)

Hooks Customizados (usePosts, useProfile)

📌 Observações

O app diferencia acesso de professor e aluno com base nas permissões.

Professores têm controle total sobre aulas e usuários.

Alunos só visualizam aulas e editam o próprio perfil.
