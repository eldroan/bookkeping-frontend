import { User } from "@/types/user";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import localFont from "next/font/local";
import { db } from "./api/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
  GitHubLogoIcon,
  PlusIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useState } from "react";
import { getUrl } from "@/utils/geturl";
import { UserDialog } from "@/components/UserDialog";
import { UserDeleteDialog } from "@/components/UserDeleteDialog";

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
  // Returning data since it in memory but probably should fetch api or consume a service
  return { props: { ssrUsers: db.users } };
}) satisfies GetServerSideProps<{ ssrUsers: User[] }>;

export default function Home({
  ssrUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const columns = ["Gender", "First Name", "Last Name", "Age"];
  const [sortBy, setSortBy] = useState({ key: columns[0], ascending: false });
  // TODO: Add isLoading and general spinner for ssr data failure
  const { data: users, isFetching } = useQuery({
    queryKey: ["/api/users"],
    queryFn: () =>
      axios.get<User[]>(`${getUrl()}/api/users`).then((r) => r.data),
    initialData: ssrUsers,
  });

  const handleSort = (key: string) => {
    if (key == undefined) return;
    setSortBy((prevSortBy) => ({
      key,
      ascending: key === prevSortBy.key ? !prevSortBy.ascending : false,
    }));
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] flex flex-col p-8 gap-6 bg-background h-screen overflow-x-scroll`}
    >
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-4xl flex gap-2 justify-center items-center">
          Users{" "}
          {isFetching && (
            <SymbolIcon width="16" height="16" className="animate-spin" />
          )}
        </h1>
        <UserDialog>
          <Dialog.Trigger className="flex items-center bg-black text-white gap-2 py-3 px-4 rounded-full hover:shadow-xl focus:ring focus:ring-inset focus:ring-white">
            <PlusIcon width="16" height="16" />
            <p className="text-sm font-bold">Add button</p>
          </Dialog.Trigger>
        </UserDialog>
      </div>
      {users && (
        <table className="bg-white shadow-lg rounded-lg border-separate px-8 py-4 table-fixed">
          <thead>
            <tr>
              {columns.map((wording) => (
                <th key={wording}>
                  <button
                    className="flex items-center gap-2 w-full text-left py-4"
                    onClick={() => handleSort(wording)}
                  >
                    <p className="text-gray-400">{wording}</p>
                    {sortBy.key === wording && !sortBy.ascending && (
                      <CaretDownIcon
                        width="16"
                        height="16"
                        className="text-gray-400"
                      />
                    )}
                    {sortBy.key === wording && sortBy.ascending && (
                      <CaretUpIcon
                        width="16"
                        height="16"
                        className="text-gray-400"
                      />
                    )}
                    {sortBy.key !== wording && (
                      <CaretSortIcon
                        width="16"
                        height="16"
                        className="text-gray-400"
                      />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 capitalize">
                {/* TODO: This border has gaps between rows that look bad on hover */}
                <td className="border-t py-5">{u.gender}</td>
                <td className="border-t py-5">{u.firstName}</td>
                <td className="border-t py-5">{u.lastName}</td>
                <td className="border-t py-5">{u.age}</td>
                <td className="border-t py-5">
                  <div className="flex justify-end gap-2">
                    <UserDialog user={u}>
                      <Dialog.Trigger className="font-bold border-2 py-1 px-4 text-sm rounded-md">
                        Edit
                      </Dialog.Trigger>
                    </UserDialog>
                    <UserDeleteDialog user={u}>
                      <Dialog.Trigger className="font-bold border-2 py-1 px-4 text-sm rounded-md">
                        Delete
                      </Dialog.Trigger>
                    </UserDeleteDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <a
        className="fixed right-0 bottom-0 mr-8 mb-8 rounded-full"
        href="https://github.com/eldroan/bookkeping-frontend"
      >
        <GitHubLogoIcon width={40} height={40} />
      </a>
    </div>
  );
}
