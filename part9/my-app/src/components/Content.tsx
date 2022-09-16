import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <div key={course.name}>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <Part coursePart={course} />
        </div>
      ))}
    </div>
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  let details;
  switch (coursePart.type) {
    case "normal":
      details = <p>{coursePart.description}</p>;
      break;
    case "groupProject":
      details = <p>Project excercises {coursePart.groupProjectCount}</p>;
      break;
    case "submission":
      details = (
        <div>
          <p>{coursePart.description}</p>
          <p>Submit to: {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
      break;
    case "special":
      details = (
        <div>
          <p>{coursePart.description}</p>
          <div>
            <p>Required skills: </p>
            <div>
              {coursePart.requirements.map((requirement) => (
                <p key={requirement}>{requirement}</p>
              ))}
            </div>
          </div>
        </div>
      );
      break;
    default:
      return assertNever(coursePart);
  }
  return <div>{details}</div>;
};
export default Content;
