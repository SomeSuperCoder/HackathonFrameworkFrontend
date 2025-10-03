import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ErrorAlert(props: {
    message?: string;
    className?: string;
}) {
    return props.message ? (
        <Alert variant="destructive" className={props.className}>
            <AlertCircleIcon />
            <AlertTitle>{props.message}</AlertTitle>
        </Alert>
    ) : null;
}
