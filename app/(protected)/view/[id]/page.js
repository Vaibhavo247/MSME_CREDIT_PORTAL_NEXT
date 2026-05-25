import ViewModalPerson from "@/components/view/viewmodalperson";

export default async function ViewPage({ params }) {
  const { id } = await params;

  return (
    <div className="p-4">
      <ViewModalPerson id={id} />
    </div>
  );
}
