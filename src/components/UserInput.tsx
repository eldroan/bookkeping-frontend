import { ChangeHandler, RefCallBack } from "react-hook-form";

export function UserInput({
  handlers,
  label,
  type,
  error,
}: {
  handlers: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
    ref: RefCallBack;
  };
  label: string;
  type: "text" | "number";
  error: string | undefined;
}) {
  return (
    <div>
      <label
        htmlFor={handlers.name}
        className="block text-base font-normal text-dialog_text mt-4 lowercase first-letter:uppercase"
      >
        {label}
      </label>
      <input
        key={handlers.name}
        className={`block w-full rounded-md border-2 p-2 mt-1 ${
          error ? "border-red-500" : "border-dialog_background"
        }`}
        type={type}
        onChange={handlers.onChange}
        onBlur={handlers.onBlur}
        name={handlers.name}
        ref={handlers.ref}
      />
      <p className="text-red-500 lowercase first-letter:uppercase text-sm pt-1">
        {error}
      </p>
    </div>
  );
}
