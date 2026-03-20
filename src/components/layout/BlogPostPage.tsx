import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getPostBySlug } from "../../data/blog";
import { Seo } from "../Seo";
import { NotFoundPage } from "../../pages/NotFoundPage";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFoundPage />;
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
            &larr; Retour au blog
          </Link>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-100 md:text-5xl">
            {post.title}
          </h1>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full mt-8 border opacity-80 aspect-video rounded-2xl border-white/10"
            />
          )}

          <div className="flex flex-wrap items-center gap-3 mt-6 text-sm text-slate-500">
            <span className="px-2 py-1 text-xs rounded-md bg-slate-800">
              {post.category}
            </span>
            <span>&middot;</span>
            <span>{formatDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readingTime} min de lecture</span>
          </div>

          <div className="mt-12 prose-p:text-slate-300 prose-strong:text-slate-100 prose-headings:text-cyan-300">
            {post.content}
          </div>

          {post.footer && <div className="mt-12">{post.footer}</div>}
        </motion.article>
      </div>
    </>
  );
};
