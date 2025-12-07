import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";

const InputWithLabel = ({
  labelText,
  LabelClassName,
  InputDisableRing,
  InputClassName,
  className,
  ...props
}) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={props.id} className={LabelClassName}>
        {labelText}
      </Label>
      <Input
        {...props}
        className={`${InputDisableRing && "ring-0 focus-visible:border-0  focus-visible:ring-0"} ${InputClassName}`}
      />
    </div>
  );
};

export default InputWithLabel;
