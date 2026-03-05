import { ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { getPostBySlug } from "../data/blog";
import { services } from "../data/services";

const getIconForCategory = (category: string) => {
  const service = services.find((s) => s.category === category);
  return service ? service.icon : <ArrowRight className="w-7 h-7" />;
};

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="px-4 py-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-slate-100 md:text-5xl">
          Article Introuvable
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">
          Désolé, l'article que vous cherchez n'existe pas ou a été déplacé.
        </p>
        <div className="mt-8">
          <Button href="/blog" variant="primary">
            Retourner au Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-4 mx-auto py-28 sm:px-6 lg:px-8">
      <article>
        <header className="mb-12">
          <div className="flex items-center gap-4">
            <Link
              to="/blog"
              className="flex items-center justify-center w-12 h-12 transition-colors rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700"
            >
              {getIconForCategory(post.category)}
            </Link>
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                <Link to="/blog" className="hover:underline">
                  Blog
                </Link>{" "}
                / {post.category}
              </p>
              <p className="text-xs text-slate-400">
                Publié le{" "}
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-slate-100 md:text-5xl">
            {post.title}
          </h1>
        </header>
        {post.content}
        {post.footer}
      </article>
    </div>
  );
};
