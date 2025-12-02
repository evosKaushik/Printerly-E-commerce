import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";

const InputWithLabel = ({ labelText, className, ...props }) => {
  return (
    <div className={cn("grid gap-2",className)}>
      <Label htmlFor={props.id}>{labelText}</Label>
      <Input {...props} />
    </div>
  );
};

export default InputWithLabel;
