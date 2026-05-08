"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="matrix-container">
      <div className="matrix-grid"></div>

      {/* Glass Card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-10 max-w-lg w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center"
          >
            <Image
              src="/image/logo/exSTAD-01.png"
              alt="Site Logo"
              width={100}
              height={100}
              priority
              className=" "
            />
          </motion.div>

          {/* 404 Title */}
          <div className="flex flex-row items-center justify-center gap-2">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent"
            >
              404
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl font-semibold mt-2 text-foreground"
            >
              Page Not Found
            </motion.h2>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl font-normal mt-1 text-foreground"
          >
            ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានទេ
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-gray-600 dark:text-gray-300"
          >
            <p>
  We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t exist.
</p>

            <br />
            យើងសូមអភ័យទោស ប៉ុន្តែទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានទេ។
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full shadow-md transition duration-300"
            >
              Go Back to Homepage / ត្រឡប់ទៅទំព័រដើម
            </Link>
          </motion.div>
        </div>
      </div>

      {/* --- Matrix CSS Inside --- */}
      <style jsx>{`
        .matrix-container {
          width: 100%;
          height: 100vh;
          perspective: 1500px;
          position: relative;
          background-color: #0d0d1a;
          overflow: hidden;
        }

        .matrix-grid {
          width: 100%;
          height: 100%;
          background: linear-gradient(#262645 1px, transparent 1px),
            linear-gradient(90deg, #262645 1px, transparent 1px),
            repeating-linear-gradient(
              45deg,
              rgba(0, 255, 170, 0.05) 0px 1px,
              transparent 1px 12px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(0, 255, 170, 0.05) 0px 1px,
              transparent 1px 12px
            ),
            radial-gradient(circle at center, #0a0a1a 0%, #000 100%);
          background-size:
            28px 28px,
            28px 28px,
            50px 50px,
            50px 50px,
            cover;
          border: 1px solid rgba(0, 255, 170, 0.1);
          box-shadow:
            inset 0 0 40px rgba(0, 255, 170, 0.1),
            0 0 60px rgba(0, 255, 170, 0.15);
          transform-style: preserve-3d;
          transition: all 0.6s ease-in-out;
          position: relative;
        }

        .matrix-grid::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 170, 0.4),
            transparent
          );
          animation: borderFlow 6s linear infinite;
          pointer-events: none;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        .matrix-grid::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 160px;
          height: 160px;
          background: radial-gradient(
            circle,
            rgba(0, 255, 170, 0.15) 0%,
            transparent 70%
          );
          transform: translate(-50%, -50%);
          animation: pulse 3.5s ease-in-out infinite alternate;
          z-index: 1;
        }

        @keyframes borderFlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
