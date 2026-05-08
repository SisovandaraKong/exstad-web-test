import TextScrollMarquee from "@/components/lightswind/text-scroll-marquee";

const ROADMAP_ITEMS = [
  "Pre-University",
  "Foundation",
  "Full Stack Development",
  "Java",
  "Dev-OPs",
  "Spring Boot",
  "Flutter",
];

const SPACING = "\u00A0".repeat(12);

export default function HorizontalScrollText() {
  const scrollText = ROADMAP_ITEMS.join(SPACING);

  return (
    <TextScrollMarquee
      baseVelocity={2}
      direction="right"
      className="text-3xl font-bold tracking-wide"
      scrollDependent={false}
      delay={500}
    >
      {scrollText}
    </TextScrollMarquee>
  );
}
