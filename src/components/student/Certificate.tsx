"use client";

import Image from "next/image";

type CertItem = {
  id: string;
  imgSrc: string;
  alt: string;
  downloadHref?: string;
};

export default function CertificateImage({ cert }: { cert: CertItem }) {
  const downloadLink = cert.downloadHref || cert.imgSrc;

  return (
    <div className="mx-auto max-w-5xl p-4 flex flex-col md:block">
      {/* Title + Button (grouped for md+) */}
      <div className="order-1 md:mb-4 flex items-center justify-between md:order-1">
        <h1 className="font-h4 sm:font-h7 font-bold">Certificate Detail</h1>
        <a
          href={downloadLink}
          download
          className="hidden md:inline-block rounded-md border px-3 py-1.5 font-d5 hover:shadow bg-primary text-white"
        >
          Download PDF
        </a>
      </div>

      {/* Image */}
      <div className="order-2 overflow-hidden rounded-2xl border bg-white shadow-sm mt-5 lg:mt-5 md:order-2">
        <Image
          src={cert.imgSrc}
          alt={cert.alt}
          width={700} // replace with actual image width
          height={400} // replace with actual image height
          className="w-full h-auto object-cover "
          priority 
        />
      </div>

      {/* Button (visible only on small, placed under image) */}
      <div className="order-3 mt-4 flex justify-end md:hidden">
        <a
          href={downloadLink}
          download
          className="rounded-md border px-3 py-1.5 font-d5 hover:shadow bg-primary text-white"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
