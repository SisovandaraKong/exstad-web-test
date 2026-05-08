export function UserProfileCell({
  name,
  title,
}: {
  name: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span className="font-semibold text-primary dark:text-white">
          {name}
        </span>
        <span className="text-sm text-gray-400">{title}</span>
      </div>
    </div>
  );
}
