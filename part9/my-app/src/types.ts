export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDescription extends CoursePartBase {
  type: "normal" | "submission" | "special";
  description: string;
}

export interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

export interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: string[];
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
