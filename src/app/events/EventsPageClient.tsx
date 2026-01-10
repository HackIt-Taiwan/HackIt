"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaStar, FaHistory, FaCalendarCheck } from 'react-icons/fa';
import type { Event } from '@/utils/events';
import { useI18n } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsList from '@/components/EventsList';

type EventsPageClientProps = {
  upcomingEvents: Event[];
  pastEvents: Event[];
  featuredEvents: Event[];
  categories: string[];
};

function formatDateRange(event: Event, localeTag: string): string {
  const start = new Date(event.frontmatter.date);
  const startLabel = start.toLocaleDateString(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!event.frontmatter.endDate) {
    return startLabel;
  }

  const end = new Date(event.frontmatter.endDate);
  const endLabel = end.toLocaleDateString(localeTag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `${startLabel} - ${endLabel}`;
}

const EventsPageClient: React.FC<EventsPageClientProps> = ({
  upcomingEvents,
  pastEvents,
  featuredEvents,
  categories,
}) => {
  const { t, locale } = useI18n();
  const localeTag = locale === 'en' ? 'en-US' : 'zh-TW';
  const nextEvent = upcomingEvents[0];
  const totalEvents = upcomingEvents.length + pastEvents.length;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-16 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-0 w-[360px] h-[360px] bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-6">
                {t("eventsPage.badge")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {t("eventsPage.title")}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                {t("eventsPage.subtitle")}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("eventsPage.stats.total")}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEvents}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <FaCalendarCheck />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("eventsPage.stats.upcoming")}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingEvents.length}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <FaHistory />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("eventsPage.stats.past")}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{pastEvents.length}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <FaStar />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("eventsPage.stats.featured")}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{featuredEvents.length}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#events-list"
                  className="px-5 py-2.5 rounded-full bg-primary text-white font-medium shadow-sm hover:bg-primary/90 transition-colors"
                >
                  {t("featuredEvents.viewAllButton")}
                </Link>
                {nextEvent && (
                  <Link
                    href={`/events/${nextEvent.slug}`}
                    className="px-5 py-2.5 rounded-full border border-primary/30 text-primary font-medium hover:bg-primary/10 transition-colors"
                  >
                    {t("eventsList.detailsButton")}
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {nextEvent ? (
                <>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={nextEvent.frontmatter.image}
                      alt={nextEvent.frontmatter.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xs uppercase tracking-[0.2em]">{t("eventsPage.nextTitle")}</p>
                      <h3 className="text-xl font-bold">{nextEvent.frontmatter.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <FaCalendarAlt className="text-primary" />
                      <span>{formatDateRange(nextEvent, localeTag)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <FaMapMarkerAlt className="text-primary" />
                      <span className="truncate">{nextEvent.frontmatter.location}</span>
                    </div>
                    {nextEvent.frontmatter.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {nextEvent.frontmatter.description}
                      </p>
                    )}
                    <Link
                      href={`/events/${nextEvent.slug}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                    >
                      {t("eventsList.detailsButton")}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-gray-600 dark:text-gray-300">
                  <p className="font-medium text-lg">{t("eventsPage.nextTitle")}</p>
                  <p className="mt-2">{t("eventsPage.nextEmpty")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {featuredEvents.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t("eventsPage.featuredTitle")}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {t("eventsPage.featuredSubtitle")}
                </p>
              </div>
              <Link
                href="#events-list"
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {t("featuredEvents.viewAllButton")}
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.slice(0, 3).map(event => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={event.frontmatter.image}
                      alt={event.frontmatter.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDateRange(event, localeTag)}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {event.frontmatter.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {event.frontmatter.description}
                    </p>
                    <div className="text-primary font-medium text-sm">
                      {t("eventsList.detailsButton")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white dark:bg-gray-800" id="events-list">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t("eventsPage.browseTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            {t("eventsPage.browseSubtitle")}
          </p>
        </div>
      </section>

      <EventsList
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        categories={categories}
      />

      <Footer />
    </main>
  );
};

export default EventsPageClient;
