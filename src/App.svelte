<script>
  let pilha_origem = [4, 3, 2, 1];
  let pilha_meio = [];
  let pilha_destino = [];

  let instrucoes = '';
  let tamanho = 4;

  function reset() {
    montar_origem();
    pilha_meio = [];
    pilha_destino = [];
    instrucoes = "";
  }

  function montar_origem() {
    pilha_origem = [];
    for (let i = 1; i <= tamanho; i++) {
      pilha_origem.unshift(i);
    }
  }

  function hanoi() {
    if (tamanho > 10) {
      alert("Stack must be less than 10, otherwise your computer will complain...");
    } else {
      reset();
      draw();
      dHanoi(pilha_origem.length, 1, 3, 2);
    }
  }

  function dHanoi(n, from, to, via) {
    if (n == 0) return;

    dHanoi(n - 1, from, via, to);

    switch (from) {
      case 1:
        switch (to) {
          case 2:
            pilha_meio.push(pilha_origem.pop());
            break;
          case 3:
            pilha_destino.push(pilha_origem.pop());
            break;
        }
        break;
      case 2:
        switch (to) {
          case 1:
            pilha_origem.push(pilha_meio.pop());
            break;
          case 3:
            pilha_destino.push(pilha_meio.pop());
            break;
        }
        break;
      case 3:
        switch (to) {
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

    draw();

    
    dHanoi(n - 1, via, to, from);
  }

  function draw() {

    instrucoes += "<section class=\"grid grid-template-columns-3\">";
    //instrucoes += "Pilha origem: " + pilha_origem + "<br />";

    let stacksize = Math.max(pilha_origem.length, pilha_destino.length,pilha_meio.length) + 1;

    instrucoes += "<div>";
    for (let i = 0; i < (stacksize - pilha_origem.length); i++) {
      instrucoes += "<div class='stick'>&nbsp</div>";
    }
    pilha_origem.reverse().forEach(value => {instrucoes += "<div class='item size"+value+"'>" + value + "</div>"; });
    pilha_origem.reverse();
    instrucoes += "</div>";

    //instrucoes += "Pilha meio: " + pilha_meio + "<br />";
    instrucoes += "<div>";
    for (let i = 0; i < (stacksize - pilha_meio.length); i++) {
      instrucoes += "<div class='stick'>&nbsp</div>";
    }
    pilha_meio.reverse().forEach(value => {instrucoes += "<div class='item size"+value+"'>" + value + "</div>"; });
    pilha_meio.reverse();
    instrucoes += "</div>";

    //instrucoes += "Pilha destino: " + pilha_destino + "<br />";
    instrucoes += "<div>";
    for (let i = 0; i < (stacksize - pilha_destino.length); i++) {
      instrucoes += "<div class='stick'>&nbsp</div>";
    }
    pilha_destino.reverse().forEach(value => {instrucoes += "<div class='item size"+value+"'>" + value + "</div>"; });
    pilha_destino.reverse();
    instrucoes += "</div>";

    
    instrucoes += "</section>";
    instrucoes += "---" + "<br /><br />";

  }
</script>

<div class="mx-auto">
  <h1 class="p-8 text-5xl text-center bg-gray-300">Hanoi solution</h1>
  <br />
  <div class="mx-auto w-6/12">  
    <label for="tamanho">Size of stack</label>
    <input name="tamanho"  bind:value={tamanho} on:change={montar_origem} placeholder="Size of stack" />
    <br />
    <br />

    <button class="text-center "  on:click|preventDefault={hanoi}>Solve</button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <button  class="text-center " on:click|preventDefault={reset}>Reset</button>
  </div>
  <br />
  <br />
  {@html instrucoes}
</div>



