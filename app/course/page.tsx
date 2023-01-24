import CourseItem from "./CourseItem";

function CoursePage() {
  const data = [
    {
      title: "Artificail Intelligence",
      desc: "12 Week",
      link: "/",
      imageLink: "/image.jpg",
    },
    {
      title: "Machine Learning",
      desc: "4 Week",
      link: "/",
      imageLink: "/image.jpg",
    },
    {
      title: "Mathematics",
      desc: "12 Week",
      link: "/",
      imageLink: "/image.jpg",
    },
  ];
  return (
    <div className="py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center lg:px-16 xl:px-32">
      {data.map((ob) => (
        //@ts-ignore
        <CourseItem {...ob} />
      ))}
    </div>
  );
}

export default CoursePage;
