import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { usePublicBlogPosts } from "../lib/blogAdminStore";
import { ArticleShareBar } from "../components/blog/ArticleShareBar";
import { Seo } from "../components/Seo";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const BlogPostPage = () => {
  const { slug } = useParams();
  const posts = usePublicBlogPosts();
  const post = slug ? posts.find((item) => item.slug === slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen px-4 pt-32 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-100">
            Article introuvable
          </h1>
          <p className="mt-4 text-slate-400">
            Cet article n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link
            to="/blog"
            className="inline-flex px-5 py-2 mt-8 text-sm font-semibold text-black transition-colors rounded-full bg-cyan-400 hover:bg-cyan-300"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const postUrl = `${window.location.origin}/blog/${post.slug}`;

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        imageUrl={post.image}
        url={postUrl}
        type="article"
      />
      <div className="min-h-screen px-4 pt-32 pb-24">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Link
            to="/blog"
            className="inline-flex mb-8 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
          >
            ← Retour au blog
          </Link>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-100 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 leading-relaxed text-slate-400">
            {post.description}
          </p>
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full mt-8 border opacity-70 aspect-video rounded-2xl border-white/10"
            />
          ) : null}

          <div className="flex flex-wrap gap-3 mt-6 text-sm text-slate-500">
            <span>{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime} min de lecture</span>
          </div>

          <ArticleShareBar title={post.title} slug={post.slug} />

          <div className="mt-12">{post.content}</div>
          {post.footer}
        </motion.article>
      </div>
    </>
  );
};
