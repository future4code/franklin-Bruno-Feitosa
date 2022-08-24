// Js Code

// function checaTriangulo(a, b, c) {
//   if (a !== b && b !== c) {
//     return "Escaleno";
//   } else if (a === b && b === c) {
//     return "Equilátero";
//   } else {
//     return "Isósceles";
//   }
// }

// Ts Code

function checaTriangulo(a: number, b: number, c: number): string {
  if (a !== b && b !== c) {
    return "Escaleno";
  } else if (a === b && b === c) {
    return "Equilátero";
  } else {
    return "Isósceles";
  }
}

console.log(checaTriangulo(2, 3, 4));
