import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader } from "lucide-react";

export default function InfoAlert(props: { message?: string }) {
    return props.message ? (
        <div className="h-screen flex items-center justify-center">
            <Alert variant="default" className="w-fit">
                <Loader className="animate-spin" />
                <AlertTitle>{props.message}</AlertTitle>
            </Alert>
        </div>
    ) : null;
}
