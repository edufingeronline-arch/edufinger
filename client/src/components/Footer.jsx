export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="px-6 py-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Brand + About */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/2.png" alt="Edufinger" className="h-20 w-auto rounded md:h-30" />
            </div>
            <p className="max-w-xl text-white/90">
              Celebrate Education @ Your FIngertips. 
            </p>
            <ul className="mt-5 space-y-2 text-white/90">
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M4 8l8 5 8-5"/><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/></svg>
                <a href="mailto:Edufingeronline@gmail.com" className="hover:underline">Edufingeronline@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.18 2 2 0 0 1 4 2h4.09a2 2 0 0 1 2 1.72 12.66 12.66 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.66 12.66 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+919726622262" className="hover:underline">+91 9726622262</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Gujarat, India</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2 text-white/90">
              <li><a className="hover:underline" href="/">Home</a></li>
              <li><a className="hover:underline" href="/books">Udaan Kit</a></li>
              <li><a className="hover:underline" href="/blog">Blog</a></li>
              <li><a className="hover:underline" href="/books">Book</a></li>
              <li><a className="hover:underline" href="/admin/login">Khazana</a></li>
              {/* <li><a className="hover:underline" href="/admin/login">Contact</a></li> */}
            </ul>
          </div>
          </div>

          <hr className="my-8 border-white/10" />

          <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/90 md:flex-row">
            <p>© {new Date().getFullYear()} Edufinger — All rights reserved. Designed and Developed by <a href="#" className="underline">Tech4webs</a>.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
