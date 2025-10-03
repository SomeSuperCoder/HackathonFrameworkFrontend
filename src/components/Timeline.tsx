import { ParseEvent, type Event as EventType } from "@/api/event";
import Event from "./Event";
import { HoverCard, HoverCardContent } from "./ui/hover-card";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";

export default function Timeline(props: { events: EventType[] }) {
    const events = props.events.map((e) => ParseEvent(e));
    return (
        <div className="flex w-fit">
            {events.map((e, i) => {
                return (
                    <div key={i} className="flex items-center">
                        <HoverCard>
                            <HoverCardTrigger>
                                <Event index={i} time={e.time} />
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                                    {e.name}
                                </h2>
                                <p className="leading-7">{e.description}</p>
                                <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                    {e.time.toLocaleString("ru-RU", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    })}
                                </code>
                            </HoverCardContent>
                        </HoverCard>
                        {i + 1 != events.length && (
                            <div className="bg-gray-400 w-7 h-1"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
