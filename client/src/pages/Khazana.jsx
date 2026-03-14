import React from 'react';
import SEO from '../components/SEO.jsx';

const classTabs = [
  { id: 'class-6', label: 'Class 6', url: 'https://drive.google.com/drive/folders/126-vffcIwpJ1HM_adwjKOpqf-tR8enFB?usp=drive_link' },
  { id: 'class-7', label: 'Class 7', url: 'https://drive.google.com/drive/folders/11eTcVjmi1qAH5HL_itbDYfRSTYmAvLEJ?usp=drive_link' },
  { id: 'class-8', label: 'Class 8', url: 'https://drive.google.com/drive/folders/1rLozygOm7bWOD5uHLOwQmiz2P1bepX2a?usp=drive_link' },
  { id: 'class-9', label: 'Class 9', url: 'https://drive.google.com/drive/folders/1l08VKKkwy84M6KMk9SGWdTIpXeEADI4d?usp=drive_link' },
  { id: 'class-10', label: 'Class 10', url: 'https://drive.google.com/drive/folders/1Pzl48okeefLTWgPkgW2OAhSQnXNBBO_7?usp=drive_link' },
  { id: 'class-11', label: 'Class 11', url: 'https://drive.google.com/drive/folders/19jArd49ndBnHJ8hVXwxf2aKaTfF-f_Ar?usp=drive_link' },
  { id: 'class-12', label: 'Class 12', url: 'https://drive.google.com/drive/folders/1lLcXdb1yX7PxQRbM3zXgeib7xS5ZVAMT?usp=drive_link' }
];

export default function Khazana() {
  return (
    <div className="bg-black">
      <SEO
        title="Khazana | Edufinger"
        description="Choose your class to access the Khazana resources."
        path="/khazana"
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold">Khazana</h1>
          <p className="mt-2 text-gray-300">
            Select your class to open the Khazana link.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3">
          {classTabs.map((tab) => {
            const disabled = !tab.url;
            const base =
              'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition';
            const enabled = 'bg-white text-black hover:bg-gray-200';
            const disabledCls = 'cursor-not-allowed bg-white/10 text-white/60';

            return (
              <a
                key={tab.id}
                href={tab.url || '#'}
                onClick={(event) => {
                  if (disabled) event.preventDefault();
                }}
                className={`${base} ${disabled ? disabledCls : enabled}`}
                aria-disabled={disabled}
              >
                {tab.label}
              </a>
            );
          })}
        </div>
        <p className="mt-4 text-center text-base text-gray-400">
          This section will be updated every week on Friday from 23-Jan-2026.
        </p>
      </section>
    </div>
  );
}
