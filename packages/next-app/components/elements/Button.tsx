import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  className = "",
  type,
  disabled,
  onClick,
  children,
}) => {
  const btnBase =
    "w-32 rounded-full px-4 py-2 font-bold text-coffee-200 hover:text-coffee-50 bg-coffee-800 hover:bg-coffee-900 border-2 border-coffee-200 hover:border-coffee-900";

  if (disabled)
    return (
      <div
        className={`${btnBase} ${className} border-stone-200/90 shadow-sm hover:shadow-sm text-stone-500/70`}
      >
        <div className="">{children}</div>
      </div>
    );

  return (
    <button className={`${className} ${btnBase}`} type={type} onClick={onClick}>
      <div className="">{children}</div>
    </button>
  );
};
