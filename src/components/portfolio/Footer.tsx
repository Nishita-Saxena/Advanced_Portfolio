import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { SiLeetcode, SiKaggle } from "react-icons/si";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = [
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Mail size={20} />, href: "mailto:nishita@example.com", label: "Email" },
    { icon: <SiLeetcode size={20} />, href: "#", label: "LeetCode" },
    { icon: <SiKaggle size={20} />, href: "#", label: "Kaggle" },
  ];

  return (
    <>
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <span className="signature-text text-4xl block mb-6">Nishita Saxena</span>
          <div className="flex justify-center gap-4 mb-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Nishita Saxena. Crafted with passion & code.
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 gradient-btn w-12 h-12 rounded-full flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
