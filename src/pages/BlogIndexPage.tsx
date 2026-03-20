import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import { Check, Copy, Facebook, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getArticleShareLinks } from "../lib/articleShare";
import { usePublicBlogPosts } from "../lib/blogAdminStore";

const categoryColors: Record<string, string> = {
  Téléphonie: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30",
  Cybersécurité: "bg-violet-400/10 text-violet-300 border border-violet-400/30",
  Réseau: "bg-blue-400/10 text-blue-300 border border-blue-400/30",
  Cloud: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30",
  "Systèmes d'Information":
    "bg-amber-400/10 text-amber-300 border border-amber-400/30",
};

const getCategoryStyle = (category: string) =>
  categoryColors[category] ??
  "bg-slate-400/10 text-slate-300 border border-slate-400/30";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

type CardShareAction = {
  name: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
};

type BlogCardShareActionsProps = {
  title: string;
  slug: string;
};

const BlogCardShareActions = ({ title, slug }: BlogCardShareActionsProps) => {
  const [copied, setCopied] = useState(false);
  const shareLinks = useMemo(() => getArticleShareLinks(title, slug), [slug, title]);

  const actions = useMemo<CardShareAction[]>(
    () => [
      { name: "Facebook", url: shareLinks.facebookUrl, icon: Facebook },
      { name: "X", url: shareLinks.xUrl, icon: Twitter },
      { name: "LinkedIn", url: shareLinks.linkedinUrl, icon: Linkedin },
      { name: "WhatsApp", url: shareLinks.whatsappUrl, icon: MessageCircle },
    ],
    [shareLinks],
  );

  const fallbackCopy = (value: string) => {
    if (typeof document === "undefined") return false;

    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      return success;
    } catch {
      return false;
    }
  };

  const handleCopy = async () => {
    let copiedSuccessfully = false;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareLinks.articleUrl);
        copiedSuccessfully = true;
      } catch {
        copiedSuccessfully = false;
      }
    }

    if (!copiedSuccessfully) {
      copiedSuccessfully = fallbackCopy(shareLinks.articleUrl);
    }

    setCopied(copiedSuccessfully);
    if (copiedSuccessfully) {
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const openShareUrl = (url: string) => {
    if (typeof window === "undefined") return;

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.open(url, "_self");
    }
  };

  return (
    <div className="relative z-20 flex items-center justify-between pt-4 mt-5 border-t border-white/10 pointer-events-auto">
      <span className="text-xs font-medium tracking-wide uppercase text-slate-500">
        Partager
      </span>
      <div className="flex items-center gap-2">
        {actions.map(({ name, url, icon: Icon }) => (
          <button
            key={name}
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openShareUrl(url);
            }}
            aria-label={`Partager sur ${name}`}
            className="inline-flex items-center justify-center w-8 h-8 transition-colors border rounded-full bg-slate-800/80 border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void handleCopy();
          }}
          aria-label={copied ? "Lien copié" : "Copier le lien"}
          className="inline-flex items-center justify-center w-8 h-8 transition-colors border rounded-full bg-slate-800/80 border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export const BlogIndexPage = () => {
  const blogPosts = usePublicBlogPosts();
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen">
      <section className="relative px-4 pt-32 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl font-extrabold text-slate-100">Notre Blog</h1>
          <p className="mt-6 text-lg text-slate-400">
            Ressources et analyses pour votre transformation numérique.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl px-4 mx-auto pb-28">
        {featured ? (
          <div className="p-8 mb-10 border rounded-3xl bg-slate-900 border-white/10">
            <Link to={`/blog/${featured.slug}`} className="block">
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="object-cover w-full mb-6 border opacity-70 aspect-video rounded-2xl border-white/10"
                />
              ) : null}
              <span className={getCategoryStyle(featured.category)}>
                {featured.category}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white">{featured.title}</h2>
              <p className="mt-3 text-slate-400">{featured.description}</p>
              <div className="mt-4 text-sm text-slate-500">
                {formatDate(featured.date)} · {featured.readingTime} min
              </div>
            </Link>
            <BlogCardShareActions title={featured.title} slug={featured.slug} />
          </div>
        ) : (
          <div className="p-8 mb-10 text-center border rounded-3xl bg-slate-900 border-white/10">
            <h2 className="text-2xl font-bold text-slate-100">
              Aucun article publié
            </h2>
            <p className="mt-3 text-slate-400">
              Utilisez l&apos;interface admin pour publier votre premier article.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <div
              key={post.slug}
              className="p-6 border rounded-2xl bg-slate-900 border-white/10"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <span className={getCategoryStyle(post.category)}>{post.category}</span>
                <h2 className="mt-3 text-xl font-bold text-white">{post.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{post.description}</p>
                <div className="mt-4 text-xs text-slate-500">
                  {formatDate(post.date)} · {post.readingTime} min
                </div>
              </Link>
              <BlogCardShareActions title={post.title} slug={post.slug} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-sm text-slate-500">{blogPosts.length} articles</div>
      </div>
    </div>
  );
};
