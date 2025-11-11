import React from 'react';

const books = [
  {
    id: 'exam-booster-10',
    title: 'Exam Booster: Class 10',
    tagline: 'Concepts • Practice • Mock Tests',
    cover: '/Science_Exam_Booster.jpg',
    buyUrl: 'https://edufingerkiudaan.graphy.com/products/Science-Exam-Booster-Notes---Class-10-69101e935fbd592b8c6022f1?dgps_s=dsh&dgps_u=c&dgps_uid=676014be51a1654745f1c006&dgps_t=cp_m'
  },
  
];

function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

export default function Books() {
  const shelves = chunk(books, 3);

  return (
    <div className="bg-black">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold">Book Showcase</h1>
          <p className="mt-2 text-gray-300">
            Handpicked exam booster books for students. Click "Buy Now" to go to your store.
          </p>
        </header>

        <div className="space-y-14">
          {shelves.map((items, idx) => (
            <div key={'shelf-' + idx} className="relative">
              {/* Books row */}
              <ul className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {items.map((b) => (
                  <li key={b.id} className="flex flex-col items-center">
                    <div className="w-56 sm:w-60">
                      <div className="aspect-[6/8] w-full overflow-hidden rounded-md shadow-md ring-1 ring-white/10">
                        {/* Cover image */}
                        <img
                          src={b.cover}
                          alt={b.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <h3 className="text-base font-semibold">{b.title}</h3>
                        {b.tagline && (
                          <p className="mt-1 text-xs text-gray-300">{b.tagline}</p>
                        )}
                        <a
                          href={b.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-block w-full rounded bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Shelf plank */}
              <div
                aria-hidden
                className="absolute inset-x-0 -bottom-4 h-3 rounded-full bg-amber-800/80 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
              />
            </div>
          ))}
        </div>

        {/* Note for maintainers */}
        {/* <p className="mt-12 text-center text-xs text-gray-500">
          Replace the buy links with your actual ecommerce URLs.
        </p> */}
      </section>
    </div>
  );
}
