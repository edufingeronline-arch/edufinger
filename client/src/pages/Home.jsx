import Hero from '../components/Hero.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Home() {
  const Icons = {
    Cap: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true" {...props}>
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v3.5A6.5 6.5 0 0012 22a6.5 6.5 0 006-6.5V12" />
      </svg>
    ),
    Clock: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    Video: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true" {...props}>
        <rect x="3" y="5" width="13" height="14" rx="2" />
        <path d="M16 8l5-3v14l-5-3z" />
      </svg>
    ),
    Target: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M22 12h-2M4 12H2" />
      </svg>
    ),
    Chat: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true" {...props}>
        <path d="M21 12a8 8 0 10-3.3 6.4L21 21l-1.6-3.3A7.9 7.9 0 0021 12z" />
      </svg>
    ),
    Users: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true" {...props}>
        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.9" />
        <path d="M16 3.1a4 4 0 010 7.8" />
      </svg>
    ),
  };

  const features = [
    { title: 'Top Educators', desc: 'Learn from experienced teachers with proven track records.', icon: 'Cap', png: '/icons/educators.png' },
    { title: 'Self-paced Learning', desc: 'Flexible scheduling that adapts to your availability.', icon: 'Clock', png: '/icons/clock.png' },
    { title: 'Visual Lessons', desc: 'Audio-visual content with animations and diagrams.', icon: 'Video', png: '/icons/video.png' },
    { title: 'Exam Focused', desc: 'Content designed around board exam patterns.', icon: 'Target', png: '/icons/target.png' },
    { title: 'Supportive Community', desc: 'Collaborate and get guidance from peers and mentors.', icon: 'Chat', png: '/icons/chat.png' },
    { title: 'Online Classes', desc: 'Live sessions with teachers and fellow students.', icon: 'Users', png: '/icons/users.png' },
  ];

  const testimonials = [
    { name: 'Mayur', quote: 'Edufinger is a very helpful learning website with clear lessons and useful tests.' },
    { name: 'Bhavnik', quote: 'I enjoy learning on Edufinger — it’s interactive, well-structured, and easy to use.' },
    { name: 'Dhaval', quote: 'The study material of edufinger is very usefull for school test and exams' },
    { name: 'Bindya', quote: 'Objective test questions are very usefull for school final exams.' },
    { name: 'Khusali', quote: 'The study materials are clear and updated regularly.' },
    { name: 'Hirva', quote: 'Kasoti series concept is wonderful.' },
  ];

  return (
    <div>
      <Hero />

      {/* Founder section */}
      <section className="bg-black">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight">Meet the Founder</h2>
            <h3 className="mb-4 text-4xl font-extrabold leading-tight text-blue-300">RAJ SHAH</h3>
            <p className="text-white leading-relaxed">A passionate educator and creative thinker, Raj Shah transforms learning through innovative teaching methods, experiments, and concept-based videos that make Science and Math engaging and easy to grasp. His goal is to spark curiosity and inspire students to enjoy learning beyond textbooks. As an entrepreneur and content creator, he promotes education through short digital courses, creative initiatives, and social media. His journey reflects a balanced blend of teaching, innovation, and purpose - celebrating education while guiding students toward a brighter, more curious future.</p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/Raj-shah.png"
              alt="Raj Shah"
              className="h-44 w-44 rounded-full object-cover ring-2 ring-blue-200"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold">What You'll Find</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((f) => {
              const Icon = Icons[f.icon];
              return (
                <div key={f.title} className="rounded-xl border border-white/10 bg-black/60 p-6 shadow-sm backdrop-blur transition hover:bg-black/70">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-white/10">
                    {f.png ? (
                      <img src={f.png} alt={f.title} className="h-8 w-8 object-contain" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement.querySelector('svg')?.setAttribute('style','display:block'); }} />
                    ) : null}
                    <Icon style={{display:'none'}} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-300">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-bold">From the Community</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 bg-black/60 p-6 shadow-sm backdrop-blur">
                <div className="mb-4 flex items-start gap-3">
                  <img src="/icons/user.png" alt="User" className="h-10 w-10 rounded-full ring-1 ring-white/10 object-cover bg-white/5" onError={(e)=>{e.currentTarget.style.opacity='0';}} />
                  <p className="text-gray-300">&quot;{t.quote}&quot;</p>
                </div>
                <p className="text-sm font-semibold">&mdash; {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <ContactForm /> */}
    </div>
  );
}
