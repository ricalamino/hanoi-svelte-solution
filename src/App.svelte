<script>
  
  const classInactve =
    "bg-gray-900 p-4 block text-center no-underline text-white";

  
  $: pilha_origem  = [3,2,1];
  $: pilha_meio    = [];
  $: pilha_destino = [];

  //solve(pilha_origem, pilha_meio, pilha_destino);


  function move(pilha_from, pilha_to) {
    if (typeof pilha_from !== 'undefined' && pilha_from.length > 0) {
      var last_element_from = pilha_from[pilha_from.length - 1];
      if (typeof pilha_to !== 'undefined' && pilha_to.length > 0) {
        var last_element_to = pilha_to[pilha_to.length - 1];
      } else {
        var last_element_to = 10000000;
      }

      if (last_element_from < last_element_to) {
        pilha_to.push(pilha_from.pop());
        return true;
      }
      return false;
    }
    return false;
  }

  function is_array_empty(myarray) {
    if (typeof myarray !== 'undefined' && myarray.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  function solve(pilha_from, pilha_to, pilha_via) {
    if (is_array_empty(pilha_from) && is_array_empty(pilha_via)) {
      return true;
    }
    //console.log("Pilha from: " + pilha_from);
   // console.log("Pilha med: " + pilha_med);
    //console.log("Pilha to: " + pilha_to);
    //SE PILHA FROM E MED VAZIAS, RESOLVIDO

    if(!is_array_empty(pilha_from.slice(1))) {
      solve(pilha_from.slice(1),pilha_via,pilha_to); //RESOLVER 
      console.log("Pilha from: " + pilha_origem);
      console.log("Pilha med: " + pilha_meio);
      console.log("Pilha to: " + pilha_destino);
      
      pilha_to.push(pilha_from.pop()); //ULTIMO ELEMENTO
      solve(pilha_via,pilha_to,pilha_from.slice(1)); //RESOLVER 
      
    } 
  }

  function hanoi() {
    solve(pilha_origem, pilha_meio, pilha_destino);
    console.log("Pilha from: " + pilha_origem);
    console.log("Pilha med: " + pilha_meio);
    console.log("Pilha to: " + pilha_destino);
  }

  function Hanoi(n, from, to , via)
  {
    if (n==0) return;

    Hanoi(n-1, from, via , to);

    moveDisk(from,to);

    // callStack.push([from,to]); // save parameters to callStack array
    
    Hanoi(n-1, via, to , from);
  }




</script>


<button on:click|preventDefault={hanoi}>Clique</button> <br /><br />
 
Origem: {{pilha_origem}} <br />
-- <br />
Meio: {{pilha_meio}}<br />
-- <br />
 Destino: {{pilha_destino}}