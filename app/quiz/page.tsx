import Link from "next/link";

function Quiz() {
  const data = [
    { name: "AI Quiz 2022", link: "/quiz/2022" },
    { name: "AI Quiz 2021", link: "/quiz/2021" },
  ];
  return (
    <main>
      <h1 className="mt-4 text-center text-3xl font-bold">List of Quizes</h1>
      {/* <div className="mt-4 h-[2px] bg-gray-100 opacity-10"></div> */}
      <div className="mt-4 flex flex-col items-center justify-center">
        {data.map((q) => (
          <QuizItem key={q.name} {...q} />
        ))}
      </div>
      <div></div>
    </main>
  );
}

interface QuizItemProp {
  name: string;
  link: string;
}

const QuizItem = ({ name, link }: QuizItemProp) => (
  <div className="my-4">
    <Link
      className="inline-flex items-center rounded-lg bg-gray-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
      href={link}
    >
      {name}
    </Link>
  </div>
);

export default Quiz;
