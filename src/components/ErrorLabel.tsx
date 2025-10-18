import { Label } from "./ui/label";

export default function ErrorLabel(props: {
  htmlFor: string;
  message?: string;
}) {
  return (
    <Label htmlFor={props.htmlFor}>
      <p className="text-red-500">{props.message}</p>
    </Label>
  );
}
