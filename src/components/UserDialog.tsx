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

const newUser = async (user: User) => {
  await axios.post<User[]>(`${getUrl()}/api/users`, user).then((r) => r.data);
};
const updateUser = async (user: User) => {
  await axios
    .patch<User[]>(`${getUrl()}/api/users/${user.id}`, user)
    .then((r) => r.data);
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
  const description = editMode ? "User edition form" : "User creation form";

  const onSubmit = async (user: User) => {
    mutate(user);
  };

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({ resolver: yupResolver(userSchema), defaultValues: user });
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (u: User) => (editMode ? updateUser(u) : newUser(u)),
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
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        reset(user);
        setOpen(value);
      }}
    >
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-black/10" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white p-8 shadow-lg rounded-lg max-w-full w-[512px]">
          <Dialog.Description className="sr-only">
            {description}
          </Dialog.Description>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Title className="font-bold text-2xl">{title}</Dialog.Title>
            <UserDropdown
              handlers={register("gender")}
              label="Gender"
              options={["male", "female"]}
              error={errors.gender?.message}
            />
            <UserInput
              handlers={register("firstName")}
              label="First Name"
              type="text"
              error={errors.firstName?.message}
            />
            <UserInput
              handlers={register("lastName")}
              label="Last Name"
              type="text"
              error={errors.lastName?.message}
            />
            <UserInput
              handlers={register("age")}
              label="Age"
              type="number"
              error={errors.age?.message}
            />
            <div className="flex flex-row gap-2 justify-between mt-8">
              <Dialog.Close
                className="flex items-center text-black gap-2 py-2 px-3 rounded-lg hover:shadow-xl border-dialog_background border-2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Dialog.Close>
              <button
                type="submit"
                className="flex items-center bg-black text-white gap-2 py-2 px-3 rounded-lg hover:shadow-xl focus:ring focus:ring-inset focus:ring-white grow justify-center"
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
