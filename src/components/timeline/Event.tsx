export default function Event(props: { index: number; time: Date }) {
    const color = props.index % 2 == 0 ? "bg-gray-500" : "bg-gray-700";

    return (
        <div
            className={`${color} flex items-center justify-center rounded-full w-16 h-16`}
        >
            {props.index + 1}
        </div>
    );
}
