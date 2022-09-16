interface Input {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  height?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weight?: any;
}

interface ParsedInput {
  height: number;
  weight: number;
}

interface Output {
  height: number;
  weight: number;
  bmi: string;
}

// Shamelessly copied from course material 🙈
const parseArguments = (args: Input): ParsedInput => {
  if (!args.weight || !args.height)
    throw new Error("Missing Height or Weight.");

  if (!isNaN(Number(args.height)) && !isNaN(Number(args.weight))) {
    return {
      height: Number(args.height),
      weight: Number(args.weight),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  height = height / 100;
  const bmi: number = weight / (height * height);

  if (bmi < 18.5) {
    return "Under weight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "Normal (Healthy weight)";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "Overweight";
  } else if (bmi >= 30 && bmi <= 34.9) {
    return "Obesity (Class I)";
  } else if (bmi >= 35 && bmi <= 39.9) {
    return "Obesity (Class II";
  } else {
    return "Extreme obesity";
  }
};

// errors are catch-ed in the route.
export const bmiMain = (argv: Input): Output => {
  const { height, weight } = parseArguments(argv);
  return { height, weight, bmi: calculateBmi(height, weight) };
};
