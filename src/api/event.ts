export interface Event {
    name: string;
    description: string;
    time: string;
}

export interface ParsedEvent {
    name: string;
    description: string;
    time: Date;
}

export function ParseEvent(event: Event) {
    const date = new Date(event.time);
    return {
        name: event.name,
        description: event.description,
        time: date,
    } as ParsedEvent;
}
