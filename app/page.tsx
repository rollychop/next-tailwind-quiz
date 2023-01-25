import CourseItem from "./course/CourseItem";
import { notFound } from "next/navigation";

export default async function Home() {
  try {
    const courses = await fetch(
      `${
        process.env.URL ? process.env.URL : "http://localhost:3000"
      }/api/course`
    ).then((res) => res.json());
    return (
      <section className="">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center">
            Currently Avialable Course
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
            {courses.map(
              (c: { name: string; duration: string; link: string }) => (
                <CourseItem
                  key={c.name}
                  title={c.name}
                  disc={c.duration}
                  link={c.link}
                  imageLink="/image.jpg"
                />
              )
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return notFound();
  }
}
