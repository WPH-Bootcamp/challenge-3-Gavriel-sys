"use strict";

const prompt = require("prompt-sync")({ sigint: true });

/**
 * Meminta input angka yang valid dari user.
 * - Menolak input kosong
 * - Menolak input non-angka
 * Mengembalikan: number
 */
function getValidNumberInput(promptMessage) {
  while (true) {
    const rawInput = prompt(promptMessage);
    const trimmed = (rawInput ?? "").trim();

    if (trimmed === "") {
      console.log("Input tidak boleh kosong. Coba lagi.");
      continue;
    }

    const numeric = Number(trimmed);
    if (!Number.isNaN(numeric)) return numeric;

    console.log("Bukan angka yang valid. Coba lagi.");
  }
}

/**
 * Meminta input operator yang valid dari user.
 * Operator valid: +, -, *, /, %, **
 * Mengembalikan: string operator
 */
function getValidOperatorInput(promptMessage) {
  const validOperators = ["+", "-", "*", "/", "%", "**"];

  while (true) {
    const rawInput = prompt(promptMessage);
    const op = (rawInput ?? "").trim();
    if (validOperators.includes(op)) return op;
    console.log("Operator tidak valid. Pilih salah satu: +, -, *, /, %, **");
  }
}

// ========= Operasi Aritmatika (Objektif #2) =========
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? "Error: Division by zero!" : a / b;
}
function modulo(a, b) {
  return b === 0 ? "Error: Division by zero!" : a % b;
}
function power(a, b) {
  return a ** b;
}

/**
 * Memilih operasi berdasarkan operator (switch) — Objektif #3
 * Mengembalikan: number atau string error
 */
function compute(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    case "%":
      return modulo(a, b);
    case "**":
      return power(a, b);
    default:
      return "Error: Operator tidak dikenali.";
  }
}

/**
 * Analisis tipe & nilai hasil — Objektif #4
 * - typeof
 * - if/else Positif/Negatif/Nol
 * - Number.isInteger
 * - Ternary untuk Genap/Ganjil
 * - Nullish coalescing (??)
 * - Contoh penggunaan && dan ||
 */
function analyzeResult(result) {
  const safeResult =
    result ?? "Result is undefined or null, something went wrong!";
  console.log("Hasil:", safeResult);

  // Jika null/undefined, cukup tampilkan pesan default
  if (result == null) return;

  const typeOfResult = typeof result;
  console.log("Tipe data hasil:", typeOfResult);

  if (typeOfResult === "number") {
    // Positif / Negatif / Nol
    if (result > 0) {
      console.log("Kategori: Positif");
    } else if (result < 0) {
      console.log("Kategori: Negatif");
    } else {
      console.log("Kategori: Nol");
    }

    // Integer vs Float
    if (Number.isInteger(result)) {
      console.log("Bentuk: Integer");

      // Ternary: Genap / Ganjil
      const parity = result % 2 === 0 ? "Genap" : "Ganjil";
      console.log("Parity:", parity);

      // Contoh && dan ||
      if (result > 0 && result % 2 === 0)
        console.log("Catatan: Positif dan Genap (&&).");
      if (result < 0 || result === 0)
        console.log("Catatan: Negatif atau Nol (||).");
    } else {
      console.log("Bentuk: Floating-point (desimal)");
      console.log("Parity: Genap/Ganjil tidak berlaku untuk desimal");

      // Contoh penggunaan && pada nilai desimal (opsional)
      if (result > 0 && Math.floor(result) % 2 === 0) {
        console.log("Catatan: Positif dan floor(hasil) genap (contoh &&).");
      }
    }
  } else if (typeOfResult === "string") {
    console.log("Keterangan: Operasi menghasilkan pesan error.");
  } else {
    // Fallback untuk tipe lain (tidak diharapkan dalam kalkulator ini)
    console.log(safeResult);
  }
}

// ========= Main Loop (Objektif #3 & #5) =========
while (true) {
  const firstNumber = getValidNumberInput("Masukkan angka pertama: ");
  const operator = getValidOperatorInput(
    "Masukkan operator (+, -, *, /, %, **): "
  );
  const secondNumber = getValidNumberInput("Masukkan angka kedua: ");

  const result = compute(firstNumber, secondNumber, operator);
  analyzeResult(result);

  // Objektif #5: keluar HANYA jika user mengetik "no" (case-insensitive)
  const continueInput = (prompt('Hitung lagi? Ketik "no" untuk keluar: ') ?? "")
    .trim()
    .toLowerCase();
  if (continueInput === "no") {
    console.log("Selesai. Terima kasih!");
    break;
  }
}
