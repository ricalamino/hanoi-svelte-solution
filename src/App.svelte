<script>
  import { onMount } from 'svelte';

  let pilha_origem = [4, 3, 2, 1];
  let pilha_meio = [];
  let pilha_destino = [];

  let instrucoes = '';
  let tamanho = 4;
  let moveCount = 0;
  let isAnimating = false;
  let showHistory = false;

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
    selected = tamanhos[0];
    tamanho = 1;
    montar_origem();
    hanoi();
  });

  function select_change() {
    if (isAnimating) return;
    tamanho = selected.size;
    moveCount = 0;
    montar_origem();
    hanoi();
  }

  function reset() {
    montar_origem();
    pilha_meio = [];
    pilha_destino = [];
    instrucoes = "";
    moveCount = 0;
    isAnimating = false;
  }

  function montar_origem() {
    pilha_origem = [];
    for (let i = 1; i <= tamanho; i++) {
      pilha_origem.unshift(i);
    }
  }

  function hanoi() {
    if (tamanho > 10) {
      alert(
        "Stack must be less than 10, otherwise your computer will complain..."
      );
    } else {
      reset();
      draw();
      dHanoi(pilha_origem.length, 1, 3, 2);
    }
  }

  function dHanoi(n, from, to, via) {
    if (n == 0) return;

    dHanoi(n - 1, from, via, to);

    moveCount++;

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

    draw();

    dHanoi(n - 1, via, to, from);
  }

  function draw() {
    instrucoes += '<section class="game-step fade-in">';
    instrucoes += `<div class="move-counter">Move ${moveCount}</div>`;
    instrucoes += '<div class="towers-container">';

    let stacksize =
      Math.max(pilha_origem.length, pilha_destino.length, pilha_meio.length) +
      1;

    // Tower A (Origin)
    instrucoes += "<div class='tower'>";
    instrucoes += "<div class='tower-label'>A</div>";
    instrucoes += "<div class='tower-content'>";
    instrucoes += "<div class='tower-stick'></div>";
    
    // Empty slots first (top of tower)
    for (let i = 0; i < stacksize - pilha_origem.length; i++) {
      instrucoes += "<div class='empty-slot'></div>";
    }
    
    // Disks from top to bottom (reverse order to stack properly)
    let temp_origem = [...pilha_origem].reverse();
    temp_origem.forEach(value => {
      instrucoes += `<div class='disk disk-${value}'>${value}</div>`;
    });
    
    instrucoes += "<div class='tower-base'></div>";
    instrucoes += "</div>";
    instrucoes += "</div>";

    // Tower B (Middle)
    instrucoes += "<div class='tower'>";
    instrucoes += "<div class='tower-label'>B</div>";
    instrucoes += "<div class='tower-content'>";
    instrucoes += "<div class='tower-stick'></div>";
    
    // Empty slots first (top of tower)
    for (let i = 0; i < stacksize - pilha_meio.length; i++) {
      instrucoes += "<div class='empty-slot'></div>";
    }
    
    // Disks from top to bottom (reverse order to stack properly)
    let temp_meio = [...pilha_meio].reverse();
    temp_meio.forEach(value => {
      instrucoes += `<div class='disk disk-${value}'>${value}</div>`;
    });
    
    instrucoes += "<div class='tower-base'></div>";
    instrucoes += "</div>";
    instrucoes += "</div>";

    // Tower C (Destination)
    instrucoes += "<div class='tower'>";
    instrucoes += "<div class='tower-label'>C</div>";
    instrucoes += "<div class='tower-content'>";
    instrucoes += "<div class='tower-stick'></div>";
    
    // Empty slots first (top of tower)
    for (let i = 0; i < stacksize - pilha_destino.length; i++) {
      instrucoes += "<div class='empty-slot'></div>";
    }
    
    // Disks from top to bottom (reverse order to stack properly)
    let temp_destino = [...pilha_destino].reverse();
    temp_destino.forEach(value => {
      instrucoes += `<div class='disk disk-${value}'>${value}</div>`;
    });
    
    instrucoes += "<div class='tower-base'></div>";
    instrucoes += "</div>";
    instrucoes += "</div>";

    instrucoes += "</div></section>";
  }

  function toggleHistory() {
    showHistory = !showHistory;
  }
</script>

<div class="app-container">
  <!-- Header Section -->
  <header class="header">
    <div class="header-content">
      <h1 class="main-title">
        <span class="title-icon">🏗️</span>
        Tower of Hanoi
      </h1>
      <p class="subtitle">Classic Mathematical Puzzle Visualization</p>
      <div class="controls">
        <div class="control-group">
          <label for="tamanho" class="control-label">Number of Disks:</label>
          <select bind:value={selected} on:change={select_change} class="disk-selector">
            {#each tamanhos as opcao}
              <option value={opcao}>{opcao.size}</option>
            {/each}
          </select>
        </div>
        <button on:click={toggleHistory} class="history-btn">
          {showHistory ? 'Hide' : 'Show'} History
        </button>
      </div>
    </div>
  </header>

  <!-- History Section -->
  {#if showHistory}
    <section class="history-section">
      <h2>The Legend of Tower of Hanoi</h2>
      <div class="history-content">
        <p>
          The Tower of Hanoi is a mathematical puzzle that was invented by the French mathematician 
          <strong>Édouard Lucas</strong> in 1883. The puzzle consists of three rods and a number of disks 
          of different sizes which can slide onto any rod.
        </p>
        <p>
          According to legend, there is a temple in Kashi Vishwanath (Varanasi) where priests are moving 
          64 golden disks from one diamond rod to another. The legend says that when the last move is 
          completed, the world will end. With the optimal solution requiring 2^64 - 1 moves, this would 
          take approximately 585 billion years to complete!
        </p>
        <h3>Rules:</h3>
        <ul>
          <li>Only one disk can be moved at a time</li>
          <li>Each move consists of taking the upper disk from one stack and placing it on top of another stack</li>
          <li>No disk may be placed on top of a smaller disk</li>
        </ul>
      </div>
    </section>
  {/if}

  <!-- Game Explanation -->
  <section class="explanation">
    <h2>How it Works</h2>
    <p>
      This visualization shows the optimal solution to the Tower of Hanoi puzzle. 
      The goal is to move all disks from tower A to tower C, using tower B as auxiliary. 
      Watch as each move is executed step by step, following the recursive algorithm 
      that guarantees the minimum number of moves: <strong>2^n - 1</strong> where n is the number of disks.
    </p>
  </section>

  <!-- Game Visualization -->
  <section class="game-section">
    <div class="game-info">
      <div class="info-card">
        <h3>Current Configuration</h3>
        <p>Disks: <strong>{tamanho}</strong></p>
        <p>Total Moves: <strong>{moveCount}</strong></p>
        <p>Minimum Moves: <strong>{Math.pow(2, tamanho) - 1}</strong></p>
      </div>
    </div>
    <div class="game-visualization">
      {@html instrucoes}
    </div>
  </section>
</div>

