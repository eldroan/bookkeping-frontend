import { User, userSchema } from "@/types/user";
import { getUrl } from "@/utils/geturl";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Dialog from "@radix-ui/react-dialog";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserInput } from "./UserInput";
import { UserDropdown } from "./UserDropdown";

export function UserDeleteDialog({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: () =>
      axios
        .delete<User[]>(`${getUrl()}/api/users/${user.id}`)
        .then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/users"],
        refetchType: "all",
      });
    },
  });

  useEffect(() => {
    if (isSuccess) setOpen(false);
  }, [isSuccess]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-black/10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white p-8 shadow-lg rounded-lg max-w-full w-[448px]">
          <Dialog.Description className="sr-only">
            User edition form
          </Dialog.Description>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              mutate();
            }}
            className="flex flex-col"
          >
            <Dialog.Title className="font-bold text-2xl text-center">
              Are you sure you want to delete user?
            </Dialog.Title>
            <button
              type="submit"
              className="flex items-center bg-red-500 text-white gap-2 py-2 px-3 rounded-lg hover:shadow-xl justify-center  mt-4"
            >
              {isPending && (
                <SymbolIcon width="20" height="20" className="animate-spin" />
              )}
              <p className="text-xl font-bold">DELETE</p>
            </button>
            <Dialog.Close
              className=" text-black gap-2 py-2 px-3 rounded-lg hover:shadow-xl border-dialog_background border-2 mt-4"
              onClick={() => setOpen(false)}
            >
              <p className="text-xl font-bold">CANCEL</p>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
