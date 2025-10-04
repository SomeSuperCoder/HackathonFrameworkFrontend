import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function UnrwappedErrorAlert(props: { message: string }) {
    return (
        <Alert variant="destructive" className="w-fit">
            <AlertCircleIcon />
            <AlertTitle>{props.message}</AlertTitle>
        </Alert>
    );
}
