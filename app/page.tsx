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
        <div className="mx-auto max-w-screen-lg py-8 px-4 lg:py-16">
          <h1 className="mb-4 text-center text-4xl font-extrabold tracking-tight">
            Currently Avialable Course
          </h1>
          <div className="grid place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
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
