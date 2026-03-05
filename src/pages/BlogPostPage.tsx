import { Link, useParams } from "react-router-dom";
// On réimporte les données statiques depuis notre nouveau fichier
import { getPostBySlug, blogPosts } from "../data/blog";
import { NotFoundPage } from "./NotFoundPage";

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  // On revient à la récupération synchrone des données
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFoundPage />;
  }

  // On recalcule les articles similaires de manière statique
  const relatedPosts = blogPosts
    .filter(
      (p) => p.slug !== post.slug && p.category === post.category
    )
    .slice(0, 2);

  return (
    <div className="px-4 py-28 mx-auto max-w-4xl sm:px-6 lg:px-8">
      <article>
        <header className="mb-12">
          <p className="text-sm text-slate-400">
            <Link to="/blog" className="hover:text-cyan-300">
              Blog
            </Link>{" "}
            / {post.category}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold text-slate-100 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-slate-300">{post.description}</p>
        </header>

        {/* On revient à l'affichage du contenu JSX */}
        {post.content}
        {post.footer}

        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-100">
              Autres articles
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="block p-5 border rounded-2xl bg-slate-900/40 border-white/10 hover:bg-slate-900/70 transition-colors"
                >
                  <h3 className="font-bold text-slate-100">{relatedPost.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{relatedPost.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
