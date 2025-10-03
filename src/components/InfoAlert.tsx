import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader } from "lucide-react";

export default function InfoAlert(props: {
    message?: string;
    className?: string;
}) {
    return props.message ? (
        <Alert variant="default" className={props.className}>
            <Loader className="animate-spin" />
            <AlertTitle>{props.message}</AlertTitle>
        </Alert>
    ) : null;
}
