import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ErrorAlert(props: { message?: string }) {
    return props.message ? (
        <div className="h-screen flex items-center justify-center">
            <Alert variant="destructive" className="w-fit">
                <AlertCircleIcon />
                <AlertTitle>{props.message}</AlertTitle>
            </Alert>
        </div>
    ) : null;
}
