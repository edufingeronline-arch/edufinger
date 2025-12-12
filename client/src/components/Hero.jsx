import ImageSlider from "./ImageSlider.jsx";

export default function Hero() {
  const images = [
    "/UDAAN_KIT.jpg",
    "/Kasoti.jpg",
    "/Khazana(Notes).jpg",
  ];
  const links = ["/books", "/blog", "edufinger.com"]; // update to your desired routes
  const alts = ["UDAAN Kit", "Kasoti", "Khazana Notes"];

  return (
    <section className="bg-black text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-20 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Stories, Tutorials, and Insights</h1>
          <p className="mb-6 text-lg opacity-90">A modern blog for developers and creators. Fresh content and deep dives every week.</p>
          <a href="/blog" className="inline-block rounded bg-white px-5 py-3 font-semibold text-indigo-700 shadow hover:bg-gray-100">Read the Blog</a>
        </div>
        <div className="hidden md:block">
          <div className="aspect-video w-full rounded-xl overflow-hidden ring-1 ring-white/20">
            <ImageSlider className="h-full w-full" images={images} interval={3000} fit="contain" links={links} alts={alts} />
          </div>
        </div>
      </div>
    </section>
  );
}
