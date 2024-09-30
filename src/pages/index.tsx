import { User } from "@/types/user";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import localFont from "next/font/local";
import { users as initialUsers } from "./api/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { ReactNode, useState } from "react";
import { getUrl } from "@/utils/geturl";

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
  return { props: { ssrUsers: initialUsers } };
}) satisfies GetServerSideProps<{ ssrUsers: User[] }>;

export default function Home({
  ssrUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const columns = ["Gender", "First Name", "Last Name", "Age"];
  const [sortBy, setSortBy] = useState({ key: columns[0], ascending: false });
  // TODO: Add isLoading and general spinner for ssr data failure
  const { data: users } = useQuery({
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
        <h1 className="font-medium text-4xl">Users</h1>
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
                    <DeleteUserDialog>
                      <Dialog.Trigger className="font-bold border-2 py-1 px-4 text-sm rounded-md">
                        Delete
                      </Dialog.Trigger>
                    </DeleteUserDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function UserDialog({ user, children }: { user?: User; children: ReactNode }) {
  const title = user !== undefined ? "Edit user" : "Add user";
  const cta = user !== undefined ? "Save" : "Add";
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-black/10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg">
          {/* <div className="bg-white flex flex-col"> */}

          <p>{title}</p>
          <p>{cta}</p>
          {/* </div> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DeleteUserDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-black/10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg">
          {/* <div className="bg-white flex flex-col"> */}

          <p>Delete user</p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
