import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { getArticleShareLinks } from "../../lib/articleShare";

type ArticleShareBarProps = {
  title: string;
  slug: string;
};

type ShareTarget = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const ArticleShareBar = ({ title, slug }: ArticleShareBarProps) => {
  const [copied, setCopied] = useState(false);
  const [nativeSharing, setNativeSharing] = useState(false);

  const shareLinks = useMemo(() => getArticleShareLinks(title, slug), [slug, title]);

  const shareTargets = useMemo<ShareTarget[]>(
    () => [
      {
        name: "Facebook",
        href: shareLinks.facebookUrl,
        icon: Facebook,
      },
      {
        name: "X",
        href: shareLinks.xUrl,
        icon: Twitter,
      },
      {
        name: "LinkedIn",
        href: shareLinks.linkedinUrl,
        icon: Linkedin,
      },
      {
        name: "WhatsApp",
        href: shareLinks.whatsappUrl,
        icon: MessageCircle,
      },
    ],
    [shareLinks],
  );

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleCopyLink = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(shareLinks.articleUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (!canNativeShare || typeof navigator === "undefined") return;

    try {
      setNativeSharing(true);
      await navigator.share({
        title,
        text: title,
        url: shareLinks.articleUrl,
      });
    } catch {
      // Ignore canceled share dialogs.
    } finally {
      setNativeSharing(false);
    }
  };

  return (
    <section className="p-5 mt-8 border rounded-2xl bg-slate-900/70 border-white/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-semibold tracking-wide uppercase text-slate-300">
          Partager cet article
        </p>
        <div className="flex flex-wrap gap-2">
          {shareTargets.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Partager sur ${name}`}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors border rounded-full bg-slate-800 text-slate-200 border-white/10 hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <Icon className="w-4 h-4" />
              <span>{name}</span>
            </a>
          ))}

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors border rounded-full bg-slate-800 text-slate-200 border-white/10 hover:border-cyan-400/40 hover:text-cyan-300"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Lien copié" : "Copier le lien"}</span>
          </button>

          {canNativeShare ? (
            <button
              type="button"
              onClick={handleNativeShare}
              disabled={nativeSharing}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors border rounded-full bg-cyan-400/10 text-cyan-300 border-cyan-400/30 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Share2 className="w-4 h-4" />
              <span>{nativeSharing ? "Partage..." : "Partager"}</span>
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};
