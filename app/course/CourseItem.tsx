import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const CourseItem = ({
  title,
  disc,
  link,
  imageLink,
}: {
  title: string;
  disc: string;
  link: string;
  imageLink: string;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={link}>
        <img className="rounded-t-lg" src={imageLink} alt="" />
      </Link>
      <div className="p-5">
        <Link href={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 text-secondary">
          <span className="font-bold">Duration : </span>
          {disc}
        </p>
        <p></p>
        <Link
          href={link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
        >
          Read more
          <AiOutlineArrowRight className="w-4 h-4 ml-2 -mr-1" />
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
