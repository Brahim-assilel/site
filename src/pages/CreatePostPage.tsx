import React, { useState } from "react";
// Pour la redirection après la création, utilisez useNavigate (v6) ou useHistory (v5)
// import { useNavigate } from "react-router-dom";

export const CreatePostPage = () => {
  // const navigate = useNavigate(); // Décommentez si vous utilisez react-router-dom v6

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // FormData est nécessaire pour envoyer des fichiers (images) avec du texte.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        body: formData, // Pas de header 'Content-Type', le navigateur le gère pour FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la création de l'article.");
      }

      const newPost = await response.json();
      setSuccess(`Article "${newPost.title}" créé avec succès !`);
      // Optionnel : rediriger l'utilisateur
      // navigate(`/blog/${newPost.slug}`);

      // Réinitialiser le formulaire
      setTitle('');
      setSlug('');
      setDescription('');
      setContent('');
      setCategory('');
      setImage(null);
      // Pour réinitialiser le champ de fichier, il faut manipuler le DOM
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-28 mx-auto max-w-2xl sm:px-6 lg:px-8 text-slate-200">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">Créer un nouvel article</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300">Titre</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-300">Slug (URL)</label>
          <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-300">Catégorie</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-300">Contenu (HTML)</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
        </div>
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-slate-300">Image</label>
          <input type="file" id="image-upload" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50">
            {isSubmitting ? "Création en cours..." : "Créer l'article"}
          </button>
        </div>
      </form>
    </div>
  );
};