import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Facebook } from "lucide-react";
import { Button } from "../ui/Button";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_FACEBOOK_URL,
  CONTACT_PHONE,
  CONTACT_WHATSAPP,
  CONTACT_WHATSAPP_URL,
} from "../../config/brand";
import { submitForm } from "../../lib/submitForm";
import { trackEvent } from "../../lib/analytics";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    __hp: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
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
    const newErrors = { name: "", email: "", phone: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Le nom complet est requis.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Le format de l'email est invalide.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis.";
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
        { formName: "contact" }
      );
      trackEvent("form_submit", {
        form_name: "contact",
        submit_mode: submitMode,
      });
      setIsSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer.";
      trackEvent("form_submit_error", {
        form_name: "contact",
      });
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 overflow-hidden md:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:gap-16">
          <div className="lg:py-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-slate-100">
              Contactez-nous
            </h2>
            <p className="mt-3 text-base leading-relaxed md:text-lg md:leading-8 text-slate-300">
              Prêt à moderniser votre infrastructure ? Parlez-nous de votre
              projet.
            </p>
            <div className="mt-8 space-y-5 md:mt-10 md:space-y-8">
              <div className="flex gap-4 md:gap-6">
                <MapPin className="flex-shrink-0 w-6 h-6 text-blue-400" />
                <p className="text-slate-400">{CONTACT_ADDRESS}</p>
              </div>
              <div className="flex gap-4 md:gap-6">
                <Phone className="flex-shrink-0 w-6 h-6 text-blue-400" />
                <p className="text-slate-400">{CONTACT_PHONE}</p>
              </div>
              <div className="flex gap-4 md:gap-6">
                <Mail className="flex-shrink-0 w-6 h-6 text-blue-400" />
                <p className="text-slate-400">{CONTACT_EMAIL}</p>
              </div>
              <div className="flex gap-4 md:gap-6">
                <MessageCircle className="flex-shrink-0 w-6 h-6 text-green-400" />
                <a
                  href={CONTACT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors text-slate-400 hover:text-green-300"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "contact_whatsapp",
                      destination: CONTACT_WHATSAPP_URL,
                    })
                  }
                >
                  WhatsApp: {CONTACT_WHATSAPP}
                </a>
              </div>
              <div className="flex gap-4 md:gap-6">
                <a
                  href={CONTACT_FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium transition-colors text-slate-300 hover:text-blue-300"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "contact_facebook",
                      destination: CONTACT_FACEBOOK_URL,
                    })
                  }
                >
                  <Facebook className="w-5 h-5" />
                  <span>Page Facebook: AssilelTech</span>
                </a>
              </div>
            </div>
            {isSubmitted ? (
              <div className="p-8 mt-12 text-center border rounded-lg bg-green-900/50 border-green-500/50">
                <h3 className="text-lg font-bold text-green-300">
                  Merci pour votre message !
                </h3>
                <p className="mt-2 text-green-400">
                  Nous avons bien reçu votre demande et nous vous recontacterons
                  dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 md:mt-12">
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
                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-bold text-slate-300">
                      Nom complet
                    </label>
                    <div className="mt-2.5">
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
                        //placeholder="Jean Dupont"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-bold text-slate-300">
                      Email
                    </label>
                    <div className="mt-2.5">
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
                        //placeholder="jean@societe.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-bold text-slate-300">
                      Numéro de téléphone{" "}
                      <span className="font-normal text-slate-400">
                        (Optionnel)
                      </span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                        //placeholder={CONTACT_PHONE}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block mb-2 text-sm font-bold text-slate-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3.5 text-slate-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.message
                        ? "border-red-500 ring-red-500"
                        : "border-slate-700 focus:ring-cyan-400"
                    }`}
                    placeholder="Décrivez votre question ou votre projet..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
                {submitError && (
                  <p className="mt-4 text-sm text-red-400">{submitError}</p>
                )}
                <div className="mt-8">
                  <Button
                    as="button"
                    type="submit"
                    className="w-full py-3.5 md:py-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
