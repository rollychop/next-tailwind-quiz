import { notFound } from "next/navigation";
import CourseItem from "./CourseItem";

async function CoursePage() {
  try {
    const data = await fetch(
      `${
        process.env.URL ? process.env.URL : "http://localhost:3000"
      }/api/course`
    ).then((res) => res.json());
    return (
      <div className="grid place-items-center gap-4 py-4 md:grid-cols-2 lg:grid-cols-3 lg:px-16 xl:px-32">
        {data.map((c: { name: string; duration: string; link: string }) => (
          <CourseItem
            key={c.name}
            title={c.name}
            disc={c.duration}
            link={c.link}
            imageLink="/image.jpg"
          />
        ))}
      </div>
    );
  } catch (err) {
    return notFound();
  }
}

export default CoursePage;
