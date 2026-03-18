import { useState } from "react";
import { Button } from "../ui/Button";
import { submitForm } from "../../lib/submitForm";
import { trackEvent } from "../../lib/analytics";

export const VoipQuoteForm = () => {
  const [formData, setFormData] = useState({
    solution: "Cloud PBX",
    capacity: "",
    didCount: "",
    portability: "Oui",
    callVolume: "Moyen",
    options: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    __hp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const mode = await submitForm(
        "/api/form-submit",
        formData,
        { allowLocalFallback: false, formName: "voip_devis" }
      );
      trackEvent("form_submit", { form_name: "voip_devis", submit_mode: mode });
      setIsSubmitted(true);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Impossible d'envoyer le devis pour le moment.";
      setError(message);
      trackEvent("form_submit_error", { form_name: "voip_devis" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 mt-8 text-center border rounded-2xl bg-green-900/40 border-green-500/40">
        <h3 className="text-xl font-bold text-green-300">Demande envoyée</h3>
        <p className="mt-2 text-green-200">
          Merci. Nous revenons vers vous avec une proposition adaptée.
        </p>
      </div>
    );
  }

  return (
    <div id="devis" className="p-6 mt-8 border rounded-3xl bg-slate-900/50 border-white/10 md:p-8">
      <p className="mb-6 text-lg text-slate-300">
        Recevez une proposition adaptée en moins de X heures : utilisateurs,
        canaux, numéros, options, volumes.
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="__hp"
          value={formData.__hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Je cherche
          <select
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          >
            <option>Cloud PBX</option>
            <option>SIP Trunk</option>
            <option>Call Center</option>
            <option>Je ne sais pas</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Utilisateurs ou canaux
          <input
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
            placeholder="Ex: 15"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Nombre de numéros DID
          <input
            name="didCount"
            value={formData.didCount}
            onChange={handleChange}
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
            placeholder="Ex: 5"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Portabilité
          <select
            name="portability"
            value={formData.portability}
            onChange={handleChange}
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          >
            <option>Oui</option>
            <option>Non</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Volume d'appels
          <select
            name="callVolume"
            value={formData.callVolume}
            onChange={handleChange}
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          >
            <option>Faible</option>
            <option>Moyen</option>
            <option>Élevé</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Options
          <input
            name="options"
            value={formData.options}
            onChange={handleChange}
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
            placeholder="Enregistrement / Supervision / CRM"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Nom
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Entreprise
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Téléphone
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="px-4 py-3 text-slate-100 border rounded-xl bg-slate-800/60 border-slate-700"
          />
        </label>
        {error && <p className="text-sm text-red-400 md:col-span-2">{error}</p>}
        <div className="md:col-span-2">
          <Button as="button" type="submit" className="w-full py-4" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer mon devis"}
          </Button>
        </div>
      </form>
    </div>
  );
};
