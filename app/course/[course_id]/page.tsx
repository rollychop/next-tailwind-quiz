type AppParams = { params: { course_id: string } };

function CourseItem({ params }: AppParams) {
  console.log(params);
  return (
    <div>
      Course Item page <span className="text-2xl">{params.course_id}</span>
    </div>
  );
}

export default CourseItem;
