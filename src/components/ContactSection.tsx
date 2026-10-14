import { useState } from 'react';
import {
  playPop,
  playSuccess,
  playClick,
  playError,
} from '@/hooks/useSoundEffects';
import SectionBlock from './SectionBlock';
import { Mail, Copy, Check, Send, Globe } from 'lucide-react';
import { SOCIAL_ICONS } from './socialIcons';
import { PROFILE, SOCIAL_LINKS, WEB3FORMS_ACCESS_KEY } from '@/data/constants';

const contactSocials = SOCIAL_LINKS.filter((l) => l.id !== 'email');

type Status = 'idle' | 'sending' | 'sent' | 'error';

const SUBMIT_LABEL: Record<Status, string> = {
  idle: 'Send Message',
  sending: 'Sending...',
  sent: 'Message Sent',
  error: 'Send Message',
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStatus('sending');
    try {
      if (!WEB3FORMS_ACCESS_KEY) throw new Error('Missing Web3Forms key');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: form.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      playSuccess();
    } catch {
      setStatus('error');
      playError();
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionBlock id="contact" title="Get in touch">
      <div className="grid md:grid-cols-2 gap-8 md:gap-20">
        {/* Left Column: Contact Info */}
        <div className="space-y-8 md:space-y-10">
          <p className="text-foreground/80 leading-relaxed font-light text-lg">
            I'm always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            feel free to drop a message.
          </p>

          <div className="space-y-6">
            <div className="group flex items-center gap-4 p-4 border border-foreground/10 bg-white/50 hover:border-black transition-colors duration-300 rounded-none">
              <div className="p-3 bg-black text-white self-start rounded-none">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">
                  Email
                </p>
                <p className="font-mono text-sm break-all">{PROFILE.email}</p>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 hover:bg-black/5 rounded-none transition-colors relative"
                title="Copy email"
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-foreground/40" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 border border-foreground/10 bg-white/50 hover:border-black transition-colors duration-300 rounded-none">
              <div className="p-3 bg-black text-white self-start rounded-none">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">
                  Current Status
                </p>
                <p className="font-mono text-sm uppercase">
                  {PROFILE.availability}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-foreground/50 mb-4">
              Connect
            </p>
            <div className="flex gap-4">
              {contactSocials.map((link) => {
                const Icon = SOCIAL_ICONS[link.id];
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    aria-label={link.label}
                    className="p-3 border border-foreground/20 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 active:scale-95 touch-manipulation rounded-none"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group relative">
            <input
              id="contact-name"
              type="text"
              required
              placeholder=" "
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="peer w-full bg-transparent border-2 border-foreground/10 px-4 py-4 text-foreground focus:outline-none focus:border-black transition-colors rounded-none"
            />
            <label
              htmlFor="contact-name"
              className="absolute left-4 top-4 text-foreground/40 text-sm uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-black peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2"
            >
              Your Name
            </label>
          </div>

          <div className="group relative">
            <input
              id="contact-email"
              type="email"
              required
              placeholder=" "
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="peer w-full bg-transparent border-2 border-foreground/10 px-4 py-4 text-foreground focus:outline-none focus:border-black transition-colors rounded-none"
            />
            <label
              htmlFor="contact-email"
              className="absolute left-4 top-4 text-foreground/40 text-sm uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-black peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2"
            >
              Email Address
            </label>
          </div>

          <div className="group relative">
            <textarea
              id="contact-message"
              required
              rows={5}
              placeholder=" "
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="peer w-full bg-transparent border-2 border-foreground/10 px-4 py-4 text-foreground focus:outline-none focus:border-black transition-colors resize-none rounded-none"
            />
            <label
              htmlFor="contact-message"
              className="absolute left-4 top-4 text-foreground/40 text-sm uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-black peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-7 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2"
            >
              Message
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="disabled:opacity-60 disabled:pointer-events-none w-full group relative flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-mono uppercase tracking-widest overflow-hidden transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] hover:-translate-y-1 active:scale-95 active:shadow-none touch-manipulation rounded-none"
          >
            <span className="relative z-10 font-bold">
              {SUBMIT_LABEL[status]}
            </span>
            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <p role="status" aria-live="polite" className="font-mono text-xs">
            {status === 'sent' && (
              <span className="text-green-700">
                Thanks! I'll get back to you soon.
              </span>
            )}
            {status === 'error' && (
              <span className="text-red-600">
                Something went wrong. Please email me at {PROFILE.email}.
              </span>
            )}
          </p>
        </form>
      </div>
    </SectionBlock>
  );
};

export default ContactSection;
