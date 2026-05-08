/** @format */

"use client";
import Link from "next/link";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
import { FaFacebook, FaTelegram, FaMapMarkerAlt } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-primary dark:bg-primary/15 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <Link href="/" className="block">
                <Image
                  src="/image/logo/exSTAD-Outline.PNG"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <p className="text-sm text-white leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Line */}
          <div>
            <h3 className="font-bold text-white mb-4">{t("footer.explore")}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.cstad.edu.kh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-white hover:text-gray-200 transition-colors duration-200"
                >
                  {t("footer.bachelor-degree")}
                </a>
              </li>
              <li>
                <Link
                  href="/available-programs"
                  className="text-base text-white"
                >
                  {t("footer.short-courses")}
                </Link>
              </li>
              <li>
                <Link href="/scholar" className="text-base text-white">
                  {t("footer.scholarship")}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.cstad.edu.kh/news-event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-white hover:text-gray-200 transition-colors duration-200"
                >
                  {t("footer.news-events")}
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t("footer.support-legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-base text-white">
                  {t("footer.about-us")}
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-base text-white">
                  {t("footer.faqs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-base text-white">
                  {t("footer.privacy-policy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t("footer.address-contact")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/wjhqKtZq1x1CzS3Z8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white leading-relaxed hover:text-gray-200 transition-colors duration-200 cursor-pointer"
                  >
                    {t("footer.address-line1")}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhoneIphone className="w-6 h-6 text-white flex-shrink-0" />
                <a
                  href="tel:+85595990910"
                  className="text-sm text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  (+855) 95-990-910
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhoneIphone className="w-6 h-6 text-white flex-shrink-0" />
                <a
                  href="tel:+85593990910"
                  className="text-sm text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  (+855) 93-990-910
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <IoMdMail className="w-5 h-5 text-white flex-shrink-0" />
                <a
                  href="mailto:info.istad@gmail.com"
                  className="text-sm text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  info.istad@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Our Sponsors */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t("footer.our-sponsors")}
            </h3>
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <Link
                href="https://www.cstad.edu.kh/"
                className="block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/istad-image/istad-logo-white.png"
                  alt="Logo"
                  width={200}
                  height={200}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t-[0.5px] border-white">
          {/* Copyright and Social Media - Desktop Layout */}
          <div className="hidden xl:flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <p className="text-xs sm:text-sm md:text-base text-white">
                {t("footer.copyright")}
              </p>
            </div>

            {/* Social Media Icons - Desktop */}
            <div className="flex flex-row items-center space-x-2 sm:space-x-4">
              <Link
                href="https://t.me/istadkh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-colors"
              >
                <FaTelegram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-xs sm:text-sm md:text-base xl:inline hidden">
                  {t("footer.telegram")}
                </span>
              </Link>
              <Link
                href="mailto:info.istad@gmail.com"
                className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-colors"
              >
                <IoMdMail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-xs sm:text-sm md:text-base xl:inline hidden">
                  {t("footer.email")}
                </span>
              </Link>
              <Link
                href="https://web.facebook.com/istad.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-colors"
              >
                <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-xs sm:text-sm md:text-base xl:inline hidden">
                  {t("footer.facebook")}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile, Tablet & Laptop Layout - Stacked */}
          <div className="xl:hidden space-y-4">
            {/* Copyright Row */}
            <div className="flex justify-center">
              <Link
                href="https://cstad.edu.kh/"
                className="block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-xs sm:text-sm text-white text-center">
                  {t("footer.copyright")}
                </span>
              </Link>
            </div>

            {/* Social Media Icons Row - Mobile & Tablet */}
            <div className="flex justify-center">
              <div className="flex flex-row items-center space-x-4 sm:space-x-6">
                <Link
                  href="https://t.me/istadkh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-colors"
                >
                  <FaTelegram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="text-xs sm:text-sm xl:inline hidden">
                    {t("footer.telegram")}
                  </span>
                </Link>
                <Link
                  href="mailto:info.istad@gmail.com"
                  className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-colors"
                >
                  <IoMdMail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="text-xs sm:text-sm xl:inline hidden">
                    {t("footer.email")}
                  </span>
                </Link>
                <Link
                  href="https://web.facebook.com/istad.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 sm:space-x-2 text-white hover:text-gray-200 transition-colors"
                >
                  <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span className="text-xs sm:text-sm xl:inline hidden">
                    {t("footer.facebook")}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
