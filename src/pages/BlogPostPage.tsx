import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const BlogListPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On appelle notre pont Vercel
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de fetch :", err);
        setLoading(false);
      });
  }, []);

  return (
    // J'utilise le fond blanc de votre site
    <div className="min-h-screen px-4 pt-32 pb-24 mx-auto bg-white sm:px-6 lg:px-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[#F2F2F0] border border-[#2A95BF]/20 text-[#2A95BF] text-sm font-bold mb-6 tracking-wide">
          Actualités & Découvertes
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#3C41A6] mb-6 tracking-tight">
          Notre{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A95BF] to-[#3C41A6]">
            Blog
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500">
          Retrouvez nos derniers articles, nos expertises en cybersécurité et
          nos conseils d'architecture réseau.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center text-[#2A95BF] text-xl font-bold animate-pulse">
          Chargement des articles... ⏳
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-slate-500 text-lg bg-[#F2F2F0] py-12 rounded-3xl">
          Aucun article pour le moment. Allez en écrire un sur Notion !
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            // Extraction du titre de l'article depuis Notion
            const titre =
              post.properties.Name?.title?.[0]?.plain_text ||
              "Article sans titre";
            const date = new Date(post.created_time).toLocaleDateString(
              "fr-FR"
            );

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 border border-[#F2F2F0] shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-xs font-bold text-[#2A95BF] mb-4 uppercase tracking-wider bg-[#2A95BF]/10 inline-block px-3 py-1 rounded-full">
                  {date}
                </div>
                <h2 className="text-2xl font-bold text-[#35428C] mb-6 group-hover:text-[#2A95BF] transition-colors">
                  {titre}
                </h2>
                <button className="text-[#35428C] group-hover:text-[#2A95BF] font-bold transition-colors flex items-center gap-2">
                  Lire l'article →
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
