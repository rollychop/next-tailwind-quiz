import CourseItem from "./course/CourseItem";

export default function Home() {
  return (
    <section className="">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
        <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center">
          Currently Supported Courses
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
          <CourseItem
            title="Fundamentals of Artificail Intelligence"
            disc="12 Week"
            link="/"
            imageLink="/image.jpg"
          />
          <CourseItem
            title="Fundamentals of Artificail Intelligence"
            disc="12 Week"
            link="/"
            imageLink="/image.jpg"
          />
          <CourseItem
            title="Fundamentals of Artificail Intelligence"
            disc="12 Week"
            link="/"
            imageLink="/image.jpg"
          />
        </div>
      </div>
    </section>
  );
}
