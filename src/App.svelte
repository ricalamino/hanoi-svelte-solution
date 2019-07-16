<script>
    
  let pilha_origem  = [4,3,2,1];
  let pilha_meio    = [];
  let pilha_destino = [];

  let instrucoes = '';
  let tamanho = 4;

  function reset() {
    tamanho = 4;
    montar_origem();
    pilha_meio    = [];
    pilha_destino = [];
    instrucoes = '';
  }

  function montar_origem() {
    pilha_origem = [];
    for (let i = 1; i <= tamanho; i++) {
      pilha_origem.unshift(i);
    }
  }

  function hanoi() {
    dHanoi(pilha_origem.length, 1, 3, 2);
  }

  function dHanoi(n, from, to , via)
  {
    if (n==0) return;

    dHanoi(n-1, from, via , to);

    switch (from) {
      case 1:
        switch(to) {
          case 2:
            pilha_meio.push(pilha_origem.pop());
            break;
          case 3:
            pilha_destino.push(pilha_origem.pop());
            break;
        }
        break;
      case 2:
        switch(to) {
          case 1:
            pilha_origem.push(pilha_meio.pop());
            break;
          case 3:
            pilha_destino.push(pilha_meio.pop());
            break;
        }
        break;
      case 3:
        switch(to) {
          case 1:
            pilha_origem.push(pilha_destino.pop());
            break;
          case 2:
            pilha_meio.push(pilha_destino.pop());
            break;
        }
        break;
        
    }

    console.log("Pilha origem: " + pilha_origem);
    console.log("Pilha meio: " + pilha_meio);
    console.log("Pilha destino: " + pilha_destino);
    console.log("---");

    instrucoes += "Pilha origem: " + pilha_origem + "<br />";
    instrucoes += "Pilha meio: " + pilha_meio + "<br />";
    instrucoes += "Pilha destino: " + pilha_destino + "<br />";
    instrucoes += "---" + "<br />";


    dHanoi(n-1, via, to , from);
  }

  

</script>

<input name="tamanho" bind:value={tamanho} on:change={montar_origem}  />

<button on:click|preventDefault={hanoi}>Clique</button>--<button on:click|preventDefault={reset}>Reset</button> <br /><br />
 
<h2>O quê fazer...</h2>

{@html instrucoes}