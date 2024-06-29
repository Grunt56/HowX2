document.addEventListener("DOMContentLoaded", function () {
  const cadastroForm = document.getElementById("cadastro-form");
  const loginForm = document.getElementById("login-form");
  const fichaForm = document.getElementById("ficha-form");
  const logoutButton = document.querySelector(".btn-logout");

  const url = window.location.pathname;
  const clientId = localStorage.getItem("idClient");

  if (clientId) {
    if (url.includes("index") || url.includes("cadastro")) {
      window.location.href = "5e.html";
    }
  } else {
    if (url.includes("5e")) {
      window.location.href = "index.html";
    }
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("idClient");
      window.location.href = "index.html";
    });
  }

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (event) {
      // Salvando os valores das variáveis
      event.preventDefault();
      const usuario = event.target.elements.usuario.value;
      const senha = event.target.elements.senha.value;

      // Chamando API de cadastro de usuários
      fetch("http://localhost:3000/usuarios/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          senha,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // Mostrando mensagem de sucesso
          if (data.error) {
            alert(data.error);
          } else {
            localStorage.setItem("idClient", data.insertedId);
            alert("Cadastro Concluido");
            // Resetando o formulário
            event.target.elements.usuario.value = "";
            event.target.elements.senha.value = "";

            window.location.href = "5e.html";
          }
        });
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      // Salvando os valores das variáveis
      event.preventDefault();
      const usuario = event.target.elements.usuario.value;
      const senha = event.target.elements.senha.value;

      // Chamando API de cadastro de usuários
      fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario,
          senha,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // Mostrando mensagem de sucesso
          if (data.error) {
            alert(data.error);
          } else {
            localStorage.setItem("idClient", data._id);
            alert("Login Concluido");
            // Resetando o formulário
            event.target.elements.usuario.value = "";
            event.target.elements.senha.value = "";

            window.location.href = "5e.html";
          }
        });
    });
  }

  if (fichaForm) {
    fichaForm.addEventListener("submit", function (event) {
      // Salvando os valores das variáveis
      event.preventDefault();
      const {
        nome,
        classe,
        raca,
        alinhamento,
        origem,
        exp,
        pontos_vida,
        armadura,
        iniciativa,
        proficiencia,
        forca,
        destreza,
        constituicao,
        inteligencia,
        sabedoria,
        carisma,
        atletismo,
        acrobacia,
        arcanismo,
        atuacao,
        blefar,
        religiao,
        sobrevivencia,
        furtividade,
        historia,
        intimidacao,
        intuicao,
        investigacao,
        medicina,
        natureza,
        percepcao,
        persuacao,
        prestidigitacao,
        caracteristicas,
      } = event.target.elements;

      // Chamando API de cadastro de usuários
      fetch(`http://localhost:3000/usuarios/${clientId}/ficha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.value,
          classe: classe.value,
          raca: raca.value,
          alinhamento: alinhamento.value,
          origem: origem.value,
          exp: exp.value,
          pontos_vida: pontos_vida.value,
          armadura: armadura.value,
          iniciativa: iniciativa.value,
          proficiencia: proficiencia.value,
          forca: forca.value,
          destreza: destreza.value,
          constituicao: constituicao.value,
          inteligencia: inteligencia.value,
          sabedoria: sabedoria.value,
          carisma: carisma.value,
          atletismo: atletismo.value,
          acrobacia: acrobacia.value,
          arcanismo: arcanismo.value,
          atuacao: atuacao.value,
          blefar: blefar.value,
          religiao: religiao.value,
          sobrevivencia: sobrevivencia.value,
          furtividade: furtividade.value,
          historia: historia.value,
          intimidacao: intimidacao.value,
          intuicao: intuicao.value,
          investigacao: investigacao.value,
          medicina: medicina.value,
          natureza: natureza.value,
          percepcao: percepcao.value,
          persuacao: persuacao.value,
          prestidigitacao: prestidigitacao.value,
          caracteristicas: caracteristicas.value,
        }),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // Mostrando mensagem de sucesso
          console.log(data);
        });
    });
  }
});
