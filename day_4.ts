import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { runPart } from "https://deno.land/x/aocd@v1.5.0/mod.ts";

function parse(input: string) {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const cards = parse(input);
  let points = 0;
  cards.forEach((card) => {
    const [, winningNumbersStr, myNumbersSTr] = card.split(
      /(?:\:\s*|\s*\|\s*)/,
    );

    const winningNumbers = winningNumbersStr.split(/\s+/);
    const myNumbers = myNumbersSTr.split(/\s+/);
    let subTotal = 0;
    winningNumbers.forEach((winningNum) => {
      if (myNumbers.includes(winningNum)) {
        if (subTotal === 0) {
          subTotal++;
        } else {
          subTotal *= 2;
        }
      }
    });
    points += subTotal;
  });

  return points;
}

// function part2(input: string): number {
//   const items = parse(input);
//   throw new Error("TODO");
// }

if (import.meta.main) {
  runPart(2023, 4, 1, part1);
  // runPart(2023, 4, 2, part2);
}

const TEST_INPUT = `\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 13);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
