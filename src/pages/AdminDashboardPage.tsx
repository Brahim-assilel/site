import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { getAdminSession, logoutAdmin } from "../lib/adminAuth";
import { trackEvent } from "../lib/analytics";
import {
  createSlugFromTitle,
  deleteManagedBlogPost,
  getManagedBlogPosts,
  saveManagedBlogPost,
  setManagedBlogPostPublished,
  type ManagedBlogPostRecord,
} from "../lib/blogAdminStore";

type EditorState = {
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readingTime: string;
  content: string;
  published: boolean;
};

const todayAsInputDate = () => new Date().toISOString().slice(0, 10);

const createInitialEditorState = (): EditorState => ({
  title: "",
  slug: "",
  description: "",
  image: "",
  category: "Actualités",
  date: todayAsInputDate(),
  readingTime: "",
  content: "",
  published: false,
});

const mapPostToEditorState = (post: ManagedBlogPostRecord): EditorState => ({
  title: post.title,
  slug: post.slug,
  description: post.description,
  image: post.image || "",
  category: post.category,
  date: post.date,
  readingTime: String(post.readingTime),
  content: post.content,
  published: post.published,
});

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");
  const [posts, setPosts] = useState<ManagedBlogPostRecord[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>(createInitialEditorState);
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const publishedCount = useMemo(
    () => posts.filter((post) => post.published).length,
    [posts],
  );

  const refreshPosts = async () => {
    const nextPosts = await getManagedBlogPosts();
    setPosts(nextPosts);
  };

  const resetEditor = () => {
    void refreshPosts();
    setSelectedPostId(null);
    setEditor(createInitialEditorState());
    setIsSlugManual(false);
    setError("");
    setSuccessMessage("");
  };

  const selectPost = (post: ManagedBlogPostRecord) => {
    setSelectedPostId(post.id);
    setEditor(mapPostToEditorState(post));
    setIsSlugManual(true);
    setError("");
    setSuccessMessage("");
  };

  useEffect(() => {
    let isMounted = true;

    getAdminSession()
      .then((session) => {
        if (!isMounted) return;
        if (!session.authenticated) {
          navigate("/admin/login", { replace: true });
          return;
        }
        setAdminEmail(session.email || "");
        refreshPosts().catch((loadError) => {
          const message =
            loadError instanceof Error
              ? loadError.message
              : "Impossible de charger les articles.";
          setError(message);
        });
      })
      .catch(() => {
        if (!isMounted) return;
        navigate("/admin/login", { replace: true });
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleEditorValue = (field: keyof EditorState, value: string | boolean) => {
    setEditor((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTitleChange = (value: string) => {
    setEditor((prev) => ({
      ...prev,
      title: value,
      slug: isSlugManual ? prev.slug : createSlugFromTitle(value),
    }));
  };

  const parseReadingTime = (value: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
    return Math.round(parsed);
  };

  const handleSave = async (forcePublished?: boolean) => {
    setError("");
    setSuccessMessage("");
    setIsSaving(true);
    try {
      const savedPost = await saveManagedBlogPost({
        id: selectedPostId || undefined,
        title: editor.title,
        slug: editor.slug,
        description: editor.description,
        image: editor.image,
        category: editor.category,
        date: editor.date,
        readingTime: parseReadingTime(editor.readingTime),
        content: editor.content,
        published:
          typeof forcePublished === "boolean" ? forcePublished : editor.published,
      });

      setSelectedPostId(savedPost.id);
      setEditor(mapPostToEditorState(savedPost));
      setIsSlugManual(true);
      await refreshPosts();
      setSuccessMessage(
        savedPost.published
          ? "Article enregistré et publié."
          : "Article enregistré en brouillon.",
      );
      trackEvent("admin_blog_saved", {
        post_id: savedPost.id,
        slug: savedPost.slug,
        published: savedPost.published,
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Impossible d'enregistrer l'article.";
      setError(message);
      trackEvent("admin_blog_save_error", {
        reason: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetPublished = async (
    post: ManagedBlogPostRecord,
    nextPublished: boolean,
  ) => {
    setError("");
    setSuccessMessage("");
    try {
      await setManagedBlogPostPublished(post.id, nextPublished);
      await refreshPosts();
      if (selectedPostId === post.id) {
        setEditor((prev) => ({ ...prev, published: nextPublished }));
      }
      setSuccessMessage(
        nextPublished
          ? "Article publié avec succès."
          : "Article retiré de la publication.",
      );
      trackEvent("admin_blog_publish_toggle", {
        post_id: post.id,
        published: nextPublished,
      });
    } catch (publishError) {
      const message =
        publishError instanceof Error
          ? publishError.message
          : "Impossible de modifier l'état de publication.";
      setError(message);
    }
  };

  const handleDelete = async (post: ManagedBlogPostRecord) => {
    const approved = window.confirm(
      `Supprimer définitivement "${post.title}" ?`,
    );
    if (!approved) return;

    setError("");
    setSuccessMessage("");
    try {
      await deleteManagedBlogPost(post.id);
      if (selectedPostId === post.id) {
        resetEditor();
      } else {
        await refreshPosts();
        setSuccessMessage("Article supprimé.");
      }
      trackEvent("admin_blog_deleted", {
        post_id: post.id,
        slug: post.slug,
      });
    } catch (deleteError) {
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : "Impossible de supprimer l'article.";
      setError(message);
    }
  };

  const handleLogout = async () => {
    setError("");
    setIsLoggingOut(true);
    try {
      await logoutAdmin();
      trackEvent("admin_logout", {});
      navigate("/admin/login", { replace: true });
    } catch (logoutError) {
      const message =
        logoutError instanceof Error
          ? logoutError.message
          : "Echec de deconnexion admin.";
      setError(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-[#070B14]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="p-8 border rounded-2xl bg-slate-900/80 border-cyan-300/20">
          <h1 className="text-2xl font-bold text-slate-100">Dashboard Admin</h1>
          <p className="mt-2 text-sm text-slate-400">
            Session active: {adminEmail || "admin"}
          </p>
          <p className="mt-2 text-xs text-amber-300/90">
            Version actuelle: les articles admin sont stockés en base (Neon).
          </p>

          <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3">
            <div className="p-4 border rounded-xl bg-slate-800/40 border-white/10">
              <p className="text-xs tracking-wider uppercase text-slate-500">
                Articles admin
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-100">
                {posts.length}
              </p>
            </div>
            <div className="p-4 border rounded-xl bg-slate-800/40 border-white/10">
              <p className="text-xs tracking-wider uppercase text-slate-500">
                Publiés
              </p>
              <p className="mt-2 text-2xl font-bold text-green-300">
                {publishedCount}
              </p>
            </div>
            <div className="p-4 border rounded-xl bg-slate-800/40 border-white/10">
              <p className="text-xs tracking-wider uppercase text-slate-500">
                Brouillons
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-300">
                {posts.length - publishedCount}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-5 border rounded-xl bg-slate-800/30 border-white/10">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-100">
                  {selectedPostId ? "Modifier l'article" : "Nouvel article"}
                </h2>
                <button
                  type="button"
                  onClick={resetEditor}
                  className="text-sm transition-colors text-slate-400 hover:text-cyan-300"
                >
                  Nouveau
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={editor.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={editor.slug}
                    onChange={(event) => {
                      setIsSlugManual(true);
                      handleEditorValue("slug", event.target.value);
                    }}
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={editor.category}
                    onChange={(event) =>
                      handleEditorValue("category", event.target.value)
                    }
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Description
                  </label>
                  <textarea
                    value={editor.description}
                    onChange={(event) =>
                      handleEditorValue("description", event.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Image (URL)
                  </label>
                  <input
                    type="url"
                    value={editor.image}
                    onChange={(event) => handleEditorValue("image", event.target.value)}
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editor.date}
                    onChange={(event) => handleEditorValue("date", event.target.value)}
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Temps de lecture (min)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editor.readingTime}
                    onChange={(event) =>
                      handleEditorValue("readingTime", event.target.value)
                    }
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Contenu
                  </label>
                  <textarea
                    value={editor.content}
                    onChange={(event) =>
                      handleEditorValue("content", event.target.value)
                    }
                    rows={12}
                    className="w-full px-4 py-3 border rounded-xl bg-slate-900/50 border-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Séparez vos paragraphes avec une ligne vide..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={editor.published}
                      onChange={(event) =>
                        handleEditorValue("published", event.target.checked)
                      }
                      className="w-4 h-4 rounded border-slate-600 bg-slate-900/40"
                    />
                    Publier cet article
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  as="button"
                  type="button"
                  onClick={() => handleSave()}
                  disabled={isSaving}
                >
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </Button>
                <Button
                  as="button"
                  type="button"
                  variant="secondary"
                  onClick={() => handleSave(true)}
                  disabled={isSaving}
                >
                  Enregistrer et publier
                </Button>
                {selectedPostId ? (
                  <Button
                    as="button"
                    type="button"
                    variant="danger"
                    onClick={() => {
                      const post = posts.find((item) => item.id === selectedPostId);
                      if (!post) return;
                      void handleDelete(post);
                    }}
                    disabled={isSaving}
                  >
                    Supprimer
                  </Button>
                ) : null}
              </div>
            </div>

            <div className="p-5 border rounded-xl bg-slate-800/30 border-white/10">
              <h2 className="text-lg font-semibold text-slate-100">
                Articles administrables
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Cette liste gère les articles créés depuis ce dashboard.
              </p>

              <div className="mt-5 space-y-3 max-h-[36rem] overflow-auto pr-1">
                {posts.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    Aucun article admin pour le moment.
                  </p>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border rounded-lg bg-slate-900/40 border-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-100">{post.title}</p>
                          <p className="mt-1 text-xs text-slate-500">/{post.slug}</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            post.published
                              ? "text-green-300 bg-green-900/40"
                              : "text-amber-300 bg-amber-900/40"
                          }`}
                        >
                          {post.published ? "Publié" : "Brouillon"}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-slate-500">
                        {post.date} · {post.readingTime} min
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => selectPost(post)}
                          className="px-3 py-1 text-xs font-semibold transition-colors rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/35"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            void handleSetPublished(post, !post.published)
                          }
                          className="px-3 py-1 text-xs font-semibold transition-colors rounded-full bg-slate-700/70 text-slate-200 hover:bg-slate-600"
                        >
                          {post.published ? "Dépublier" : "Publier"}
                        </button>
                        {post.published ? (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 text-xs font-semibold transition-colors rounded-full bg-blue-600/20 text-blue-300 hover:bg-blue-600/35"
                          >
                            Voir
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {successMessage && (
            <p className="mt-5 text-sm text-green-400">{successMessage}</p>
          )}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              href="/blog"
              variant="secondary"
              onClick={() =>
                trackEvent("admin_dashboard_open_blog", {
                  destination: "/blog",
                })
              }
            >
              Ouvrir le blog
            </Button>
            <Button
              href="/admin/login"
              variant="glass"
              onClick={() =>
                trackEvent("admin_dashboard_open_login", {
                  destination: "/admin/login",
                })
              }
            >
              Page de login
            </Button>
            <Button
              as="button"
              variant="danger"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
