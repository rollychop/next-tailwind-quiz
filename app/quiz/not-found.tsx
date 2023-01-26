import Link from "next/link";
function notFound() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, the requested quiz is not found
          </p>
          <Link
            href="/quiz"
            className="hover:bg-primary-800 my-4 inline-flex rounded-lg bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    </section>
  );
}

export default notFound;
