import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { runPart } from "https://deno.land/x/aocd@v1.5.0/mod.ts";

function parse(input: string) {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const items = parse(input);
  return items
    .map((line) => {
      const numbers = line.replace(/[^0-9]+/g, "");
      const combinedNumbers = numbers[0] + numbers[numbers.length - 1];
      return Number(combinedNumbers);
    })
    .reduce(
      (sum, x) => sum + x,
      0,
    );
}

function part2(input: string): number {
  const items = parse(input);
  const digits: { [name: string]: number } = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
  };

  return items
    .map((line) => {
      const numbers: number[] = [];
      for (let i = 0; i < line.length; i++) {
        if (line[i] >= "0" && line[i] <= "9") {
          numbers.push(Number(line[i]));
        } else {
          for (const digitName of Object.keys(digits)) {
            if (line.startsWith(digitName, i)) {
              numbers.push(digits[digitName]);
              break;
            }
          }
        }
      }
      return (numbers[0] * 10) + numbers[numbers.length - 1];
    })
    .reduce(
      (sum, x) => sum + x,
      0,
    );
}

if (import.meta.main) {
  runPart(2023, 1, 1, part1);
  runPart(2023, 1, 2, part2);
}

const TEST_INPUT = `\
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 142);
});

const TEST_INPUT_2 = `\
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT_2), 281);
});
