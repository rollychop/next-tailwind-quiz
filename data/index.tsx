import Question2022 from "./qus2022.json";
import Question2021 from "./qus2021.json";
import { QuestionModel } from "../typying";

export const queslist = {
  "2022": Question2022,
  "2021": Question2021,
};

export const questionsMap: Map<string, QuestionModel[]> = new Map();
questionsMap.set("2021", Question2021);
questionsMap.set("2022", Question2022);

export const allcourses = [
  {
    name: "Fundamentals of Artifical Intelligence",
    duration: "12 Week",
    instructor: "Prof. M Hazar",
    link: "/quiz",
  },
];
