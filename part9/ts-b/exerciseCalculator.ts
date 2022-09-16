type RatingDescription = "Bad" | "OK" | "Good";
type Rating = 1 | 2 | 3; // what if 1 - 99?

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

interface Input {
  daily_exercises?: unknown;
  target?: unknown;
}
// Not exactly used...
interface ParsedInput {
  target: number;
  exArr: Array<number>;
}

const parseArgumentsEx = (args: Input): ParsedInput => {
  if (!args.daily_exercises || !args.target)
    throw new Error("Parameters missing!");

  if (!(args.daily_exercises instanceof Array) || isNaN(Number(args.target)))
    throw new Error("Malformatted parameters!");

  for (let i = 0; i < args.daily_exercises.length; ++i) {
    if (isNaN(Number(args.daily_exercises[i]))) {
      throw new Error("Malformatted parameters!");
    }
  }

  return {
    target: Number(args.target),
    exArr: args.daily_exercises.map((num) => Number(num)),
  };
};

const calculateExercise = (exArr: Array<number>, target: number): Result => {
  const ans: Result = {
    periodLength: exArr.length,
    trainingDays: 0,
    success: true,
    rating: 1,
    ratingDescription: "Bad",
    target,
    average: 0,
  };

  let allEx = 0;
  for (const day of exArr) {
    if (day !== 0) ans.trainingDays += 1;
    allEx += day;
  }

  ans.average = allEx / ans.periodLength;

  if (ans.average < ans.target) ans.success = false;

  const diff: number = ans.average - ans.target;

  if (diff >= 0) {
    ans.rating = 3;
    ans.ratingDescription = "Good";
  } else if (diff > -0.5) {
    ans.rating = 2;
    ans.ratingDescription = "OK";
  } else {
    ans.rating = 1;
    ans.ratingDescription = "Bad";
  }

  return ans;
};

export const exMain = (input: Input): Result => {
  const { exArr, target } = parseArgumentsEx(input);
  return calculateExercise(exArr, target);
};
