'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Linkedin, Twitter, Github, Mail, MapPin } from 'lucide-react';
import { KanjiStamp } from '@/components/effects/KanjiStamp';
import { OriginalCoderMascot } from '@/components/mascot/OriginalCoderMascot';
import { DEFAULT_PROFILE } from '@/data/default-profile';
import { playAnimeSound } from '@/lib/audio';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'ARCHITECTURE_CONSULT',
    message: '',
    systemToken: '', // Honeypot
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    playAnimeSound('blip');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        playAnimeSound('levelup');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to dispatch message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network connection failure.');
    }
  };

  return (
    <section
      id="contact"
      className="relative px-6 sm:px-12 lg:px-24 py-24 border-b border-navy-900/10 dark:border-electric-cyan/20"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-12 pb-4 border-b border-navy-900/10 dark:border-electric-cyan/20">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs">
            <span className="font-extrabold text-electric-blue dark:text-electric-cyan">
              06 CONTACT
            </span>
            <span className="text-slate-400">// DISPATCH PACKET</span>
            <KanjiStamp kanji="連絡" romaji="RENRAKU" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-navy-900 dark:text-white tracking-tight">
            Initiate System Connection
          </h2>
        </div>

        <div className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900 px-3 py-1.5 rounded border border-navy-900/15 dark:border-electric-cyan/30">
          FIG. 06 // DIRECT DISPATCH INGRESS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 p-6 sm:p-8 rounded-md shadow-manga dark:shadow-manga-dark">
          {status === 'success' ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <OriginalCoderMascot
                state="celebrate"
                size={180}
                showSpeechBubble
                speechText="TRANSMISSION CONFIRMED! ★"
              />
              <h3 className="text-2xl font-black text-navy-900 dark:text-white font-mono mt-4">
                Message Received in System Logs
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
                Your dispatch has been committed. I will reply to {formData.email} promptly.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', email: '', category: 'ARCHITECTURE_CONSULT', message: '', systemToken: '' });
                }}
                className="mt-4 px-4 py-2 border border-navy-900 dark:border-electric-cyan rounded font-mono text-xs font-bold hover:bg-electric-blue hover:text-white transition-colors"
              >
                DISPATCH ANOTHER PACKET
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot hidden input */}
              <input
                type="text"
                name="systemToken"
                value={formData.systemToken}
                onChange={(e) => setFormData({ ...formData, systemToken: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs font-bold text-navy-900 dark:text-white mb-1.5">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2.5 rounded border border-navy-900/20 dark:border-electric-cyan/40 bg-navy-50/50 dark:bg-navy-900/60 font-sans text-sm text-navy-900 dark:text-white focus:outline-none focus:border-electric-blue dark:focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-navy-900 dark:text-white mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2.5 rounded border border-navy-900/20 dark:border-electric-cyan/40 bg-navy-50/50 dark:bg-navy-900/60 font-sans text-sm text-navy-900 dark:text-white focus:outline-none focus:border-electric-blue dark:focus:border-electric-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-navy-900 dark:text-white mb-1.5">
                  TOPIC / CATEGORY
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded border border-navy-900/20 dark:border-electric-cyan/40 bg-navy-50/50 dark:bg-navy-900/60 font-mono text-xs text-navy-900 dark:text-white focus:outline-none focus:border-electric-blue"
                >
                  <option value="ARCHITECTURE_CONSULT">Distributed Architecture Consultation</option>
                  <option value="DISTRIBUTED_SYSTEMS">High-Performance / Low-Latency Systems</option>
                  <option value="OPPORTUNITY">Career Opportunity / Staff Engineering</option>
                  <option value="GENERAL">General Inquiries & Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-navy-900 dark:text-white mb-1.5">
                  TRANSMISSION PAYLOAD *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your architecture scope, scale requirements, or inquiry..."
                  className="w-full px-3 py-2.5 rounded border border-navy-900/20 dark:border-electric-cyan/40 bg-navy-50/50 dark:bg-navy-900/60 font-sans text-sm text-navy-900 dark:text-white focus:outline-none focus:border-electric-blue dark:focus:border-electric-cyan"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/30 rounded text-xs text-rose-600 dark:text-rose-400 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 bg-electric-blue hover:bg-blue-600 text-white font-mono font-bold text-sm rounded shadow-manga dark:shadow-manga-dark transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'COMMITTING TO LOG...' : 'DISPATCH TRANSMISSION →'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info & Socials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="border-2 border-navy-900 dark:border-electric-cyan bg-white dark:bg-navy-950 p-6 rounded-md shadow-manga dark:shadow-manga-dark space-y-4">
            <h3 className="font-mono text-xs font-bold text-navy-900 dark:text-white uppercase pb-2 border-b border-navy-900/10 dark:border-electric-cyan/20">
              DIRECT CHANNELS & PROFILES
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${DEFAULT_PROFILE.email}`}
                className="flex items-center gap-3 p-2.5 rounded hover:bg-navy-50 dark:hover:bg-navy-900 text-navy-900 dark:text-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-electric-blue dark:text-electric-cyan" />
                <span>{DEFAULT_PROFILE.email}</span>
              </a>

              <a
                href={`https://github.com/${DEFAULT_PROFILE.username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-2.5 rounded hover:bg-navy-50 dark:hover:bg-navy-900 text-navy-900 dark:text-slate-200 transition-colors"
              >
                <Github className="w-4 h-4 text-navy-900 dark:text-white" />
                <span>GITHUB // @{DEFAULT_PROFILE.username}</span>
              </a>

              <div className="flex items-center gap-3 p-2.5 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-sakura-pink" />
                <span>{DEFAULT_PROFILE.location} // IN-OFFICE / HYBRID</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <OriginalCoderMascot
              state="wave"
              size={150}
              showSpeechBubble
              speechText="OPEN FOR ARCHITECTURE INQUIRIES"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
