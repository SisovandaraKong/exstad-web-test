import React from "react";
import { OrbitingCircles } from "../magicui/orbiting-circles";
import { Ripple } from "../magicui/ripple";
import Image from "next/image";

export default function BackgroundCircle() {
  // You can dynamically set radius based on screen width if needed
  const radius = 320;
  const iconSize = 50;

  return (
    <div className="w-full">
      <div className="relative overflow-hidden h-full aspect-square flex items-center justify-center">
        <Ripple mainCircleOpacity={0.18} numCircles={5} className="absolute" />

        <OrbitingCircles
          className="z-10"
          speed={0.2}
          radius={radius}
          iconSize={iconSize}
        >
          <Icons.nextjs />
          <Icons.flutter />
          <Icons.microservices />
          <Icons.blockchain />
          <Icons.figma />
          <Icons.devops />
          <Icons.html />
          <Icons.cpp />
          <Icons.java />
          <Icons.postgres />
          <Icons.boostrap />
          <Icons.linux />
          <Icons.css />
          <Icons.docker />
          <Icons.react />
          <Icons.git />
        </OrbitingCircles>

        <div
          className="absolute inset-0 z-0 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
          }}
        ></div>
      </div>
    </div>
  );
}

const iconBaseProps = {
  width: 50,
  height: 50,
  className: "object-contain",
  style: { maxWidth: "100%", maxHeight: "100%" },
};

const Icons = {
  flutter: () => <Image unoptimized src="/logo/flutter.png" alt="Flutter" {...iconBaseProps} />,
  nextjs: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 128 128">
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" />
    </svg>
  ),
  microservices: () => <Image unoptimized src="/logo/spring.png" alt="Microservices" {...iconBaseProps} />,
  figma: () => <Image unoptimized src="/logo/figma.png" alt="Figma" {...iconBaseProps} />,
  devops: () => <Image unoptimized src="/logo/dev-ops.png" alt="DevOps" {...iconBaseProps} />,
  html: () => <Image unoptimized src="/logo/html.png" alt="HTML" {...iconBaseProps} />,
  cpp: () => <Image unoptimized src="/logo/cpp.png" alt="C++" {...iconBaseProps} />,
  java: () => <Image unoptimized src="/logo/java.png" alt="Java" {...iconBaseProps} />,
  postgres: () => <Image unoptimized src="/logo/postgres.png" alt="Postgres" {...iconBaseProps} />,
  boostrap: () => <Image unoptimized src="/logo/boostrap.png" alt="boostrap" {...iconBaseProps} />,
  linux: () => <Image unoptimized src="/logo/linux.png" alt="Linux" {...iconBaseProps} />,
  blockchain: () => <Image unoptimized src="/logo/Blockchain.png" alt="Blockchain" {...iconBaseProps} />,
  css: () => <Image unoptimized src="/logo/css.png" alt="CSS" {...iconBaseProps} />,
  docker: () => <Image unoptimized src="/logo/docker.png" alt="Docker" {...iconBaseProps} />,
  react: () => <Image unoptimized src="/logo/react.png" alt="React" {...iconBaseProps} />,
  git: () => <Image unoptimized src="/logo/git.png" alt="Git" {...iconBaseProps} />,
};
