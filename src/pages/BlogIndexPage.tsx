import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogPosts } from "../data/blog";

const categoryColors: Record<string, string> = {
  Téléphonie:
    "bg-cyan-400/10 text-cyan-300 border border-cyan-400/30",
  Cybersécurité:
    "bg-violet-400/10 text-violet-300 border border-violet-400/30",
  Réseau:
    "bg-blue-400/10 text-blue-300 border border-blue-400/30",
  Cloud:
    "bg-emerald-400/10 text-emerald-300 border border-emerald-400/30",
};

const getCategoryStyle = (category: string) =>
  categoryColors[category] ??
  "bg-slate-400/10 text-slate-300 border border-slate-400/30";

/** Estimate reading time from content string length */
const estimateReadTime = (description: string) => {
  const words = description.split(" ").length * 15; // rough multiplier
  return Math.max(3, Math.round(words / 200));
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const BlogIndexPage = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* glow orbs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Ressources & Insights
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 leading-tight">
            Notre{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400">
                Blog
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/60 to-blue-400/60 rounded-full blur-sm" />
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Conseils experts, analyses approfondies et bonnes pratiques pour
            piloter votre transformation numérique avec confiance.
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-28">
        {/* ─── FEATURED ARTICLE ─── */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-14"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
              ★ Article à la une
            </p>
            <Link
              to={`/blog/${featured.slug}`}
              className="group relative flex flex-col md:flex-row gap-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* colored accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500" />

              {/* Illustration zone */}
              <div className="md:w-2/5 relative min-h-[200px] md:min-h-[280px] bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-800/60 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.6),transparent_60%)]" />
                <div className="relative z-10 text-center p-8">
                  <div className="text-7xl mb-3">📡</div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/60">
                    {featured.category}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <span
                  className={`self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryStyle(featured.category)}`}
                >
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-100 group-hover:text-cyan-200 transition-colors duration-300 leading-snug">
                  {featured.title}
                </h2>
                <p className="mt-4 text-slate-400 leading-relaxed line-clamp-3">
                  {featured.description}
                </p>
                <div className="mt-6 flex items-center gap-5 text-sm text-slate-500">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{estimateReadTime(featured.description)} min de lecture</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Lire l'article complet
                  <svg
                    className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ─── OTHER ARTICLES GRID ─── */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Tous les articles
              </p>
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-slate-600">{blogPosts.length} articles</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/8 bg-slate-900/50 hover:bg-slate-800/60 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1"
                  >
                    {/* Top accent gradient on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/50 transition-all duration-500" />

                    {/* Color band by category */}
                    <div
                      className={`h-1.5 w-full ${
                        post.category === "Cybersécurité"
                          ? "bg-gradient-to-r from-violet-500 to-purple-600"
                          : post.category === "Cloud"
                          ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                          : "bg-gradient-to-r from-cyan-400 to-blue-500"
                      }`}
                    />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Category badge */}
                      <span
                        className={`self-start px-2.5 py-1 rounded-full text-xs font-semibold mb-4 ${getCategoryStyle(post.category)}`}
                      >
                        {post.category}
                      </span>

                      <h2 className="text-lg font-bold text-slate-100 group-hover:text-cyan-200 transition-colors duration-300 leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span>{formatDate(post.date)}</span>
                          <span>·</span>
                          <span>{estimateReadTime(post.description)} min</span>
                        </div>
                        <span className="text-xs font-semibold text-cyan-400/70 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                          Lire
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* ─── NEWSLETTER BANNER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-cyan-950/20 to-slate-900/80 p-10 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.07),transparent_65%)]" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">💡</div>
            <h2 className="text-2xl font-bold text-slate-100">
              Besoin d'un accompagnement personnalisé ?
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">
              Nos experts analysent gratuitement votre infrastructure et vous
              proposent les meilleures solutions pour votre PME.
            </p>
            <Link
              to="/#audit"
              className="inline-flex items-center gap-2 mt-7 px-7 py-3 rounded-full font-semibold text-sm bg-cyan-400 text-black hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
            >
              Demander un audit gratuit
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};