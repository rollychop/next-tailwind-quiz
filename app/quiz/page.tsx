import Link from "next/link";

function Quiz() {
  const data = [
    { name: "AI Quiz 2022", link: "/quiz/2022" },
    { name: "AI Quiz 2021", link: "/quiz/2021" },
  ];
  return (
    <main>
      <h1 className="text-center mt-4 text-3xl font-bold">List of Quizes</h1>
      <div className="h-[2px] mt-4 bg-gray-100 opacity-10"></div>
      <div className="flex flex-col justify-center items-center mt-4">
        {data.map((q) => (
          <QuizItem {...q} />
        ))}
      </div>
      <div></div>
    </main>
  );
}

const QuizItem = ({ name, link }: { name: string; link: string }) => (
  <div className="my-4">
    <Link
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
      href={link}
    >
      {name}
    </Link>
  </div>
);

export default Quiz;
