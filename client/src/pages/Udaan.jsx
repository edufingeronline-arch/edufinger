import React from 'react';
import SEO from '../components/SEO.jsx';

const kits = [
  {
    id: 'aarambh-9-cbse',
    title: 'Aarambh for 9th (CBSE)',
    tagline: 'Only 3999/- | Science',
    cover: '/9th-cbse.png',
    buyUrl: 'https://edufingerkiudaan.graphy.com/courses/Class-9-Full-Year-Course-CBSE-AARAMBH-696502bda7ff2e292815a43d-696502bda7ff2e292815a43d'
  },
  {
    id: 'aarambh-9-gseb',
    title: 'Aarambh for 9th (GSEB)',
    tagline: 'Only 3999/- | Science',
    cover: '/9th-gseb.png',
    buyUrl: 'https://edufingerkiudaan.graphy.com/courses/Class-9-Full-Year-Course-GSEB-AARAMBH-6965025f80d17c62e84773cd-6965025f80d17c62e84773cd'
  },
  {
    id: 'aarambh-10-cbse',
    title: 'Udaan for 10th (CBSE)',
    tagline: 'Only 4999/- | Science',
    cover: '/10th-cbse.png',
    buyUrl: 'https://edufingerkiudaan.graphy.com/courses/Class-10-Full-Year-Course-CBSE-UDDAN-696501e6c241354112ad9d8d-696501e6c241354112ad9d8d'
  },
  {
    id: 'aarambh-10-gseb',
    title: 'Udaan for 10th (GSEB)',
    tagline: 'Only 3999/- | Science',
    cover: '/10th-gseb.png',
    buyUrl: 'https://edufingerkiudaan.graphy.com/courses/Class-10-Full-Year-Course-GSEB-UDDAN-6965003cfac2e66bd19f2c54-6965003cfac2e66bd19f2c54'
  }
];

export default function Udaan() {
  return (
    <div className="bg-black">
      <SEO
        title="Udaan Kit | Edufinger"
        description="Explore the Udaan Kit curated by Raj Sir for Grade 9 & 10 learners."
        path="/udaan"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold">Udaan Kit Showcase</h1>
          <p className="mt-2 text-gray-300">
            Your complete Grade 9 & 10 kit from Edufinger. Click "Buy Now" to enroll.
          </p>
        </header>

        <div className="relative flex flex-col items-center">
          <ul className="relative z-10 grid grid-cols-1 gap-10 pb-6 sm:grid-cols-2 lg:grid-cols-4">
            {kits.map((kit) => (
              <li key={kit.id} className="shrink-0">
                <div className="w-64 sm:w-72">
                  <div className="rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-transparent">
                      <img
                        src={kit.cover}
                        alt={kit.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-base font-semibold text-white">{kit.title}</h3>
                    {kit.tagline && (
                      <p className="mt-1 text-xs text-white/70">{kit.tagline}</p>
                    )}
                    <a
                      href={kit.buyUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => {
                        if (!kit.buyUrl) event.preventDefault();
                      }}
                      className={`mt-4 inline-block w-full rounded-md px-3 py-2 text-center text-sm font-semibold text-white transition ${
                        kit.buyUrl
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'cursor-not-allowed bg-white/10 text-white/60'
                      }`}
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-4 h-3 rounded-full bg-amber-800/80 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          />
        </div>

        
      </section>
    </div>
  );
}
