import { m } from "framer-motion"; // Changed from 'motion' to 'm'
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";
import { Link } from "react-router";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <Link
    to={href}
    className="text-neutral-400 hover:text-white transition-colors duration-200 text-[15px]"
  >
    {children}
  </Link>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <m.a
    href={href}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors duration-200"
    aria-label={label}
  >
    {icon}
  </m.a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Business Registration", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Get Started", href: "/next-steps" },
      ],
    },
    // {
    //   title: "Legal",
    //   links: [
    //     { label: "Privacy Policy", href: "#privacy" },
    //     { label: "Terms of Service", href: "#terms" },
    //     { label: "Cookie Policy", href: "#cookies" },
    //   ],
    // },
  ];

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <m.div {...fadeIn} className="lg:col-span-4">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Pink & Purple
              </h3>
              <p className="text-neutral-400 text-[15px] leading-relaxed mb-6 max-w-xs">
                Empowering SMEs with business solutions,
                automation, and strategic guidance.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:info@pinkandpurple.co.za"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" strokeWidth={2} />
                  <span className="text-[14px]">hello@pinkandp.com</span>
                </a>
                <a
                  href="tel:+27123456789"
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" strokeWidth={2} />
                  <span className="text-[14px]">+27 66 422 8087</span>
                </a>
                <div className="flex items-center gap-3 text-neutral-400">
                  <MapPin className="w-4 h-4" strokeWidth={2} />
                  <span className="text-[14px]">Pretoria, Gauteng, South Africa</span>
                </div>
              </div>
            </m.div>

            {/* Links Columns */}
            {footerSections.map((section, index) => (
              <m.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * (index + 1),
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="lg:col-span-2"
              >
                <h4 className="text-white font-semibold text-[15px] mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}

            {/* Social Links Column */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="lg:col-span-2"
            >
              <h4 className="text-white font-semibold text-[15px] mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <SocialLink
                  href="https://linkedin.com"
                  icon={<Linkedin className="w-5 h-5" strokeWidth={2} />}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://twitter.com"
                  icon={<Twitter className="w-5 h-5" strokeWidth={2} />}
                  label="Twitter"
                />
                <SocialLink
                  href="https://instagram.com"
                  icon={<Instagram className="w-5 h-5" strokeWidth={2} />}
                  label="Instagram"
                />
                <SocialLink
                  href="https://facebook.com"
                  icon={<Facebook className="w-5 h-5" strokeWidth={2} />}
                  label="Facebook"
                />
              </div>
            </m.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="py-6 border-t border-neutral-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-[14px]">
              © {currentYear} Pink & Purple. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <FooterLink href="#privacy">Privacy</FooterLink>
              <FooterLink href="#terms">Terms</FooterLink>
              <FooterLink href="#cookies">Cookies</FooterLink>
            </div>
          </div>
        </m.div>
      </div>
    </footer>
  );
}