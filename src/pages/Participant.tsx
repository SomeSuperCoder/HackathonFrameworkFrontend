import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function Participant() {
    const user = useContext(UserContext);

    return <h1>Welcome, {user?.name}!</h1>;
}
