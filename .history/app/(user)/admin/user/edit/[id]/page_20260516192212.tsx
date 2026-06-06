
import UserEdit from "@/components/cms/user/UserEdit";

export default async function UserEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <UserEdit userId={id} />
  );
}
