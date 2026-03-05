import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blog";
import { services } from "../data/services";

const getIconForCategory = (category: string) => {
  const service = services.find((s) => s.category === category);
  // Fallback to a default icon if none is found for the category
  return service ? service.icon : <ArrowRight className="w-7 h-7" />;
};

export const BlogListPage = () => {
  return (
    <div className="px-4 mx-auto py-28 max-w-7xl sm:px-6 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-100 md:text-6xl">
          Notre Blog
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-300">
          Retrouvez nos analyses, guides et retours d'expérience sur les
          technologies qui façonnent le monde de demain.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="flex flex-col p-6 transition-all duration-300 border rounded-3xl bg-slate-900/50 border-white/10 hover:border-cyan-300/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-cyan-500/10"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 text-cyan-300">
                  {getIconForCategory(post.category)}
                </div>
                <span className="text-sm font-semibold text-cyan-300">
                  {post.category}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-100">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {post.description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="text-xs text-slate-500">
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center text-sm font-medium text-cyan-300">
                Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
