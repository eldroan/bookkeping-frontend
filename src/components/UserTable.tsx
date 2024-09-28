import { User } from "@/types/user";

interface UserTableProps {
  users: User[];
  loading: boolean;
}
export const UserTable = ({ users, loading }: UserTableProps) => {
  return (
    <>
      <p>{JSON.stringify(users)}</p>
      <p>{JSON.stringify(loading)}</p>
    </>
  );
};
