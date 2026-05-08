type Level = "Beginner" | "Intermediate" | "Advanced";

export default function LabelLevel({ level }: { level: Level }) {
  const color = {
    Beginner: { text: "#16A085", bg: "#E8F9F1" },
    Intermediate: { text: "#2C3E50", bg: "#E1F0FF" },
    Advanced: { text: "#6C2DC7", bg: "#F3E8FF" },
  };
  return (
    <div
      className={`text-[14px] px-3 py-1 rounded-md bg-transparent/80`}
      style={{
        color: color[level].text,
        backgroundColor: color[level].bg,
      }}
    >
      {level}
    </div>
  );
}