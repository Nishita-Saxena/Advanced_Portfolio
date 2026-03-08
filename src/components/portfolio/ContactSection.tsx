import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Github, Linkedin, Mail, Check } from "lucide-react";
import { SiLeetcode, SiKaggle } from "react-icons/si";

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "Collaboration", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with EmailJS or Formspree
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const socials = [
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Mail size={20} />, label: "Email", href: "mailto:nishita@example.com" },
    { icon: <SiLeetcode size={20} />, label: "LeetCode", href: "#" },
    { icon: <SiKaggle size={20} />, label: "Kaggle", href: "#" },
  ];

  return (
    <section id="contact" className="py-24 relative section-bg-contact">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <h2 className="section-heading text-3xl md:text-4xl text-foreground mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-muted-foreground font-body mt-8 mb-8">
              Whether it's a collaboration, internship, research opportunity, or just a hello — my inbox is open.
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border p-3 flex items-center gap-2 text-muted-foreground hover:text-primary hover:border-primary transition-all"
                  aria-label={s.label}
                >
                  {s.icon}
                  <span className="text-sm font-body">{s.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border p-6 md:p-8 space-y-4"
          >
            <div>
              <label className="mono-label text-muted-foreground text-[10px] block mb-1">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-background px-4 py-3 text-foreground font-body text-sm outline-none border border-border focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="mono-label text-muted-foreground text-[10px] block mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-background px-4 py-3 text-foreground font-body text-sm outline-none border border-border focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="mono-label text-muted-foreground text-[10px] block mb-1">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-background px-4 py-3 text-foreground font-body text-sm outline-none border border-border focus:border-primary transition-colors"
              >
                <option>Collaboration</option>
                <option>Internship</option>
                <option>Research</option>
                <option>Just Saying Hi</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="mono-label text-muted-foreground text-[10px] block mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-background px-4 py-3 text-foreground font-body text-sm outline-none border border-border focus:border-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-3 font-body font-semibold flex items-center justify-center gap-2 group"
            >
              {submitted ? (
                <>
                  <Check size={18} /> Message Sent!
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;