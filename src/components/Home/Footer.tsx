
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5">
              <Image
                src="/assets/TogetherWeCan.png"
                alt="TogetherWeCan Logo"
                width={50}
                height={50}
                priority
                className="rounded-2xl bg-green-200 object-contain"
              />

              <div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  Together<span className="text-green-600 dark:text-green-500">WeCan</span>
                </h2>
                <p className="text-[10px] tracking-widest text-gray-500 dark:text-gray-400">
                  SMALL ACTIONS. GREATER IMPACT.
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
              Together, we can make a difference. Join our community and
              participate in meaningful events that create a better tomorrow.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-gray-100 p-2.5 transition hover:bg-green-600 hover:text-white dark:bg-gray-800 dark:hover:bg-green-600"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-gray-100 p-2.5 transition hover:bg-green-600 hover:text-white dark:bg-gray-800 dark:hover:bg-green-600"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-gray-100 p-2.5 transition hover:bg-green-600 hover:text-white dark:bg-gray-800 dark:hover:bg-green-600"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/events" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Upcoming Events
                </Link>
              </li>

              <li>
                <Link href="/login" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
              Get Involved
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/events" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Tree Plantation
                </Link>
              </li>

              <li>
                <Link href="/events" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Community Cleanup
                </Link>
              </li>

              <li>
                <Link href="/events" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Donation Campaigns
                </Link>
              </li>

              <li>
                <Link href="/events" className="transition hover:text-green-600 dark:hover:text-green-400">
                  Education Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-green-600 dark:text-green-500" />
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={19} className="shrink-0 text-green-600 dark:text-green-500" />
                <a
                  href="mailto:hello@togetherwecan.com"
                  className="transition hover:text-green-600 dark:hover:text-green-400"
                >
                  hello@togetherwecan.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={19} className="shrink-0 text-green-600 dark:text-green-500" />
                <span>Get in touch with us</span>
              </li>
            </ul>

            <Link
              href="/events"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Explore Events
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-7 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} TogetherWeCan. All rights reserved.
          </p>

          <p>
            Made with <span className="text-red-500">♥</span> for a better
            community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
