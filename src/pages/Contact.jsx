import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/pages/Contact.scss';
import Seo from '../components/Seo';

const initialValues = { name: '', email: '', message: '', website: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Le nom est obligatoire.';
  else if (values.name.trim().length < 2)
    errors.name = 'Le nom doit contenir au moins 2 caractères.';

  if (!values.email.trim()) errors.email = 'L’email est obligatoire.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(values.email.trim()))
    errors.email = 'Veuillez saisir une adresse email valide.';

  if (!values.message.trim()) errors.message = 'Le message est obligatoire.';
  else if (values.message.trim().length < 10)
    errors.message = 'Le message doit contenir au moins 10 caractères.';

  if (values.website) {
    errors.global = 'Votre message n’a pas pu être envoyé. (code: honeypot)';
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const firstErrorRef = useRef(null);

  const isValid = useMemo(() => Object.keys(validate(values)).length === 0, [values]);

  useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function focusFirstError() {
    for (const key of ['name', 'email', 'message']) {
      if (errors[key]) {
        const el = document.getElementById(key);
        if (el) el.focus();
        break;
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true, website: true });

    const currentErrors = validate(values);
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) {
      focusFirstError();
      return;
    }

    try {
      setIsSubmitting(true);
      setSent(false);

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'SEND_FAILED');

      setSent(true);
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setErrors((e) => ({
        ...e,
        global: "Une erreur est survenue pendant l'envoi. Merci de réessayer.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact">
      <Seo
        title="Contact - Nicolas Développeur"
        description="Contactez-moi pour un projet web, une mission ou une collaboration."
      />
      <div className="container">
        <div className="contact-panel">
          <h2>Contactez-moi</h2>
          <p className="contact-lead">Un projet, une question ? N’hésitez pas à m’écrire !</p>

          {sent && (
            <div className="alert success" role="status" aria-live="polite">
              ✅ Merci ! Votre message a bien été envoyé.
            </div>
          )}

          {errors.global && (
            <div className="alert error" role="alert" aria-live="assertive" ref={firstErrorRef}>
              {errors.global}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit}>
            <div className="honeypot">
              <label htmlFor="website">Ne pas remplir ce champ</label>
              <input
                id="website"
                name="website"
                type="text"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={Boolean(touched.name && errors.name)}
              />
              {touched.name && errors.name && (
                <p id="name-error" className="field-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={Boolean(touched.email && errors.email)}
              />
              {touched.email && errors.email && (
                <p id="email-error" className="field-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-invalid={Boolean(touched.message && errors.message)}
              />
              {touched.message && errors.message && (
                <p id="message-error" className="field-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting || !isValid}>
              {isSubmitting ? 'Envoi…' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
