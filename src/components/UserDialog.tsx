import { Gender } from "@/types/gender";
import { User } from "@/types/user";
import { getUrl } from "@/utils/geturl";
import * as Dialog from "@radix-ui/react-dialog";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, FormEvent, useState, useEffect } from "react";

const newUser = async (user: User) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // await axios.post<User[]>(`${getUrl()}/api/users`, {}).then((r) => r.data);
};
const updateUser = async (user: User) => {
  await axios.post<User[]>(`${getUrl()}/api/users`, {}).then((r) => r.data);
};
const test: User = {
  firstName: "Leandro",
  lastName: new Date().getMilliseconds().toString().slice(0, 19),
  gender: Math.random() > 0.5 ? Gender.Male : Gender.Female,
  age: 20,
};

export function UserDialog({
  user,
  children,
}: {
  user?: User;
  children: ReactNode;
}) {
  const editMode = user !== undefined;
  const title = editMode ? "Edit user" : "Add user";
  const cta = editMode ? "Save" : "Add";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("Clicked!");
    mutate();
  };

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: () => (editMode ? updateUser(test) : newUser(test)),
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
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white p-8 shadow-lg rounded-lg max-w-full w-[512px]">
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold text-2xl">{title}</h2>
            <div className="flex flex-row gap-2 justify-between">
              <button
                className="flex items-center text-black gap-2 py-3 px-4 rounded-lg hover:shadow-xl border-dialog_background border-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center bg-black text-white gap-2 py-3 px-4 rounded-lg hover:shadow-xl focus:ring focus:ring-inset focus:ring-white grow justify-center"
              >
                {isPending && (
                  <SymbolIcon width="16" height="16" className="animate-spin" />
                )}
                <p className="text-sm font-bold">{cta}</p>
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
