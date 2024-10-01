import { ChangeHandler, RefCallBack } from "react-hook-form";

export function UserDropdown({
  handlers,
  label,
  options,
  error,
}: {
  handlers: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
    ref: RefCallBack;
  };
  label: string;
  options: string[];
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
      <select
        className={`block w-full rounded-md border-2 py-2 pl-2mt-1 ${
          error ? "border-red-500" : "border-dialog_background"
        }`}
        onChange={handlers.onChange}
        onBlur={handlers.onBlur}
        name={handlers.name}
        ref={handlers.ref}
      >
        <option value="" disabled>
          Select Gender
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
      <p className="text-red-500 lowercase first-letter:uppercase text-sm pt-1">
        {error}
      </p>
    </div>
  );
}
