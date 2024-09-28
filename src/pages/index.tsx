import { User } from "@/types/user";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import localFont from "next/font/local";
import { users as initialUsers } from "./api/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserTable } from "@/components/usertable";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const getServerSideProps = (async () => {
  // Fetch data from external API
  return { props: { ssrUsers: initialUsers } };
}) satisfies GetServerSideProps<{ ssrUsers: User[] }>;

const getUrl = () =>
  typeof window !== "undefined" ? window.location.origin : "";

export default function Home({
  ssrUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/users"],
    queryFn: () =>
      axios.get<User[]>(`${getUrl()}/api/users`).then((r) => r.data),
    initialData: ssrUsers,
  });

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] flex flex-col m-8 gap-6`}
    >
      <div className="flex justify-between">
        <h1>Users</h1>
        <button>Add user</button>
      </div>
      {data && <UserTable users={data} loading={isLoading} />}
    </div>
  );
}
