import React, { useState } from "react";
import { Button } from "../ui/Button";
import { submitForm } from "../../lib/submitForm";
import { trackEvent } from "../../lib/analytics";

export const AuditSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
    __hp: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", company: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: "", email: "", company: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Le nom complet est requis.";
      isValid = false;
    }
    if (!formData.company.trim()) {
      newErrors.company = "Le nom de l'entreprise est requis.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Le format de l'email est invalide.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    setSubmitError("");
    setIsSubmitting(true);
    try {
      const submitMode = await submitForm(
        "/api/form-submit",
        formData,
        { formName: "audit" }
      );
      trackEvent("form_submit", {
        form_name: "audit",
        submit_mode: submitMode,
      });
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.";
      trackEvent("form_submit_error", {
        form_name: "audit",
      });
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="audit" className="py-20 md:py-24">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="p-6 border shadow-2xl bg-slate-900/60 border-white/10 shadow-black/40 sm:p-8 md:p-14 rounded-2xl md:rounded-3xl backdrop-blur-xl">
          <div className="mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl text-slate-100">
              Demandez votre Audit Gratuit
            </h2>
            <p className="text-sm leading-relaxed md:text-base text-slate-300">
              Remplissez ce formulaire pour obtenir une analyse gratuite de
              votre infrastructure.
            </p>
          </div>
          {isSubmitted ? (
            <div className="p-8 text-center border rounded-lg bg-green-900/50 border-green-500/50">
              <h3 className="text-lg font-bold text-green-300">
                Demande d'audit envoyée !
              </h3>
              <p className="mt-2 text-green-400">
                Merci ! Nous analysons votre demande et reviendrons vers vous
                très prochainement.
              </p>
              <p className="mt-4 text-sm text-green-500">
                En attendant, n'hésitez pas à explorer nos{" "}
                <a
                  href="#services"
                  className="font-bold underline hover:text-blue-400"
                >
                  autres services
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-300">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-500 ring-red-500"
                        : "border-slate-700 focus:ring-cyan-400"
                    }`}
                    // placeholder="Jean Dupont"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-500 ring-red-500"
                        : "border-slate-700 focus:ring-cyan-400"
                    }`}
                    // placeholder="jean@societe.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-300">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.company
                        ? "border-red-500 ring-red-500"
                        : "border-slate-700 focus:ring-cyan-400"
                    }`}
                    placeholder="Votre Société"
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-bold text-slate-300">
                    Site web{" "}
                    <span className="font-normal text-slate-400">
                      (Optionnel)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                    placeholder="https://societe.com"
                  />
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-2 text-sm font-bold text-slate-300">
                  Message{" "}
                  <span className="font-normal text-slate-400">
                    (Optionnel)
                  </span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  placeholder="Décrivez brièvement votre besoin..."
                ></textarea>
              </div>
              {submitError && (
                <p className="text-sm text-red-400">{submitError}</p>
              )}
              <Button
                as="button"
                type="submit"
                className="w-full py-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
