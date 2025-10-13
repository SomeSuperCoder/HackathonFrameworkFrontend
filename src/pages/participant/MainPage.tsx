import type { Event } from "@/api/event";
import Timeline from "@/components/timeline/Timeline";

export default function MainPage() {
    const events = [
        {
            name: "Uno",
            description: "",
            time: "2025-12-31T17:02:00.545Z",
        },
        {
            name: "Dos",
            description: "Desc dos",
            time: "2025-10-02T19:05:00.545Z",
        },
    ] as Event[];
    return (
        <div className="h-full flex flex-col items-center justify-center gap-2">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Lorem ipsum
            </h1>
            <p className="max-w-[60%] text-muted-foreground text-md md:text-xl">
                &nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vivamus in tortor risus. Vestibulum nec lacus justo. Aenean quis
                erat sit amet dui blandit hendrerit at viverra tellus. Nullam
                suscipit imperdiet.
            </p>
            <Timeline events={events} />
        </div>
    );
}
