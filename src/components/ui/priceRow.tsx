import { Separator } from "./separator";
import { twMerge } from "tailwind-merge";

interface PriceRowProps {
  label: string;
  value: number | string;
  className?: string;
}

const PriceRow = ({ label, value, className, ...props }: PriceRowProps) => {
  const rowClasses = twMerge(
    "mt-4 flex items-center justify-between text-sm",
    className,
  );

  return (
    <>
      <Separator />
      <div className={rowClasses} {...props}>
        <small>{label}</small>
        <small>{value}</small>
      </div>
    </>
  );
};

export default PriceRow;
