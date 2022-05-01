function carregar(){
  // Buscando o getElement
  let getById = (element) => window.document.getElementById(element);
  let inputCep = getById("inputCep");
  let btnCep = getById("btnCep");
  let cepMessage = getById("container-top-cep-message");
  let styled1 = getById("styled1");
  let styled2 = getById("styled2");
  let styled3 = getById("styled3");
  
  // Limpar todos os dados inserido nos campos do formulário
  function clearDados() {
    getById("campo1-1").innerHTML = ""; getById("campo1-2").innerHTML = "";
    getById("campo2-1").innerHTML = ""; getById("campo2-2").innerHTML = "";
    getById("campo3-1").innerHTML = ""; getById("campo3-2").innerHTML = "";
    cepMessage.setAttribute("class", " "); cepMessage.innerHTML = "";
    styled1.setAttribute("class", "container-campo1");
    styled2.setAttribute("class", "container-campo2");
    styled3.setAttribute("class", "container-campo3");
    inputCep.removeEventListener("click", clearDados);
  }

  // Realizar a requisição com função Async para procurar o cep e seus valores.
  async function getCep(){
    if(inputCep.value.length == 0) {
      window.alert("[Aviso] Para consultar o CEP, insira a sequência do código postal.");
    } else if(inputCep.value.length < 8) {
      window.alert("[Aviso] O CEP é inválido, insira a sequência correta do código postal.");
    } else {
      let resposta = await cep(inputCep.value).catch((err) => {
        window.alert(`[Aviso] ${err.cepMessage}, insira a sequência correta do código postal.`);
        inputCep.value = "";
      });
      if(!(resposta == undefined)){
        getById("campo1-1").innerHTML = resposta["state"];
        getById("campo1-2").innerHTML = resposta["street"];
        getById("campo2-1").innerHTML = resposta["city"];
        getById("campo2-2").innerHTML = resposta["neighborhood"];
        getById("campo3-1").innerHTML = resposta["cep"];
        getById("campo3-2").innerHTML = resposta["service"].toUpperCase();

        cepMessage.setAttribute("class", "cep-message");
        cepMessage.innerHTML = `Descubra outro endereço com o cep, digite novamente.`;

        inputCep.value = "";
        inputCep.addEventListener("click", clearDados);

        styled1.setAttribute("class", "container-campo1 useStyled");
        styled2.setAttribute("class", "container-campo2 useStyled");
        styled3.setAttribute("class", "container-campo3 useStyled");
      }
    }
  }
  btnCep.addEventListener("click", getCep);
}
window.addEventListener('load', carregar);