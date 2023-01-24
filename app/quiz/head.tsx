export default function Head({ params }: { params: { slug: string } }) {
  return (
    <>
      <title>Quizzes {params.slug}</title>
    </>
  );
}
