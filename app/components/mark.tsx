// Derya mark: a disc with an S-shaped blade cut out, same geometry as the product logo.
export const MARK_PATH =
  "M200 20 A180 180 0 1 1 200 380 A180 180 0 1 1 200 20Z M270 60 C182 104 192 262 130 340 C218 296 208 138 270 60Z";

export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <path d={MARK_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
