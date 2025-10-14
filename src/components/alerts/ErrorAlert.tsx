import UnrwappedErrorAlert from "./UnwrappedErrorAlert";

export default function ErrorAlert(props: { message?: string }) {
  return props.message ? (
    <div className="h-full flex items-center justify-center">
      <UnrwappedErrorAlert message={props.message ?? ""} />
    </div>
  ) : null;
}
