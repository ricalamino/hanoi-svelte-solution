<script>

  import { onMount } from 'svelte';

  let pilha_origem = [4, 3, 2, 1];
  let pilha_meio = [];
  let pilha_destino = [];

  let instrucoes = '';
  let tamanho = 4;

  let tamanhos = [
    { id: 1, size: 1 },
    { id: 2, size: 2 },
    { id: 3, size: 3 },
    { id: 4, size: 4 },
    { id: 5, size: 5 },
    { id: 6, size: 6 },
    { id: 7, size: 7 },
    { id: 8, size: 8 },
    { id: 9, size: 9 },
    { id: 10, size: 10 }
  ];

  let selected;

  onMount(async () => {
    selected.size = 1;
		tamanho = 1;
    montar_origem();
    hanoi();
	});
  
  function select_change () {
    tamanho = selected.size;
    montar_origem();
    hanoi();
  }
  

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
    <label for="tamanho">Select stack size</label>

    <select bind:value={selected} on:change="{select_change}">
      {#each tamanhos as opcao}
        <option value={opcao.id}>
          {opcao.size}
        </option>
      {/each}
    </select>

   </div>
  <br />
  <br />
  {@html instrucoes}
</div>



