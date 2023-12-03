import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { runPart } from "https://deno.land/x/aocd@v1.5.1/mod.ts";

interface Subset {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  subsets: Subset[];
}

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const game1: Game = {
  id: 1,
  subsets: [
    { red: 4, green: 0, blue: 3 },
    { red: 1, green: 2, blue: 6 },
    { red: 0, green: 2, blue: 0 },
  ],
};

function parse(input: string): Game[] {
  return input.trimEnd().split("\n").map((line) => {
    const [firstPart, secondPart] = line.split(":");
    const id = Number(firstPart.split(" ")[1]);
    const subsets = secondPart.split(";").map((subsetStr) => {
      const subset: Subset = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for (const colorString of subsetStr.split(",")) {
        const [cubeCount, cubeColor] = colorString.trimStart().split(" ");
        if (cubeColor === "red") {
          subset["red"] = Number(cubeCount);
        } else if (cubeColor === "green") {
          subset["green"] = Number(cubeCount);
        } else {
          subset["blue"] = Number(cubeCount);
        }
      }
      return subset;
    });

    return {
      id,
      subsets,
    };
  });
}

function part1(input: string): number {
  const games = parse(input);
  return games
    .filter((game) => {
      for (const gameSubset of game.subsets) {
        if (
          gameSubset.red > 12 || gameSubset.green > 13 || gameSubset.blue > 14
        ) {
          return false;
        }
      }
      return true;
    })
    .reduce(
      (sum, game) => sum + game.id,
      0,
    );
}

function part2(input: string): number {
  const games = parse(input);
  let sum = 0;
  for (const game of games) {
    let red = 0;
    let green = 0;
    let blue = 0;

    for (const gameSubset of game.subsets) {
      if (gameSubset.red > red) {
        red = gameSubset.red;
      }
      if (gameSubset.green > green) {
        green = gameSubset.green;
      }
      if (gameSubset.blue > blue) {
        blue = gameSubset.blue;
      }
    }
    sum += red * green * blue;
  }
  return sum;
}

if (import.meta.main) {
  runPart(2023, 2, 1, part1);
  runPart(2023, 2, 2, part2);
}

const TEST_INPUT = `\
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 8);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 2286);
});
