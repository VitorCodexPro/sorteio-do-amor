import { carregarSenhas, salvarSenhasFirebase } from './firebase.js';

// carrega senhas do Firebase na inicialização
carregarSenhas().then(senhas => {
  if (senhas) {
    PASSWORDS.vitor = senhas.vitor;
    PASSWORDS.maria = senhas.maria;
  }
});

// expõe a função de salvar pro app.js
window.salvarSenhasFirebase = salvarSenhasFirebase;
window.PASSWORDS_REF = PASSWORDS;
