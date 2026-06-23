const pricingGroups = [
  {
    title: "Modern Tailoring",
    items: [
      ["Pants/Jeans hem", "$25-$55"],
      ["Zipper replacement", "$35-$75"],
      ["Waist adjustment", "$45-$95"],
      ["Sleeves", "$50-$125"],
      ["Jacket adjustments", "$75-$250"],
    ],
  },
  {
    title: "Bridal + Formal",
    items: [
      ["Consultation", "$50"],
      ["Bustle", "$95-$250"],
      ["Simple dress alterations", "$350-$500"],
      ["Moderate bridal alterations", "$500-$1,000"],
      ["Complex bridal work", "$1,000+"],
    ],
  },
  {
    title: "Speed + Urgent Service",
    items: [
      ["Mobile fitting", "$50+"],
      ["Priority turnaround", "+50%"],
      ["Rush turnaround", "+100%"],
      ["Wedding emergency", "$350 minimum"],
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#f5f2eb] px-6 py-24 text-[#1c1b19] lg:px-12">
      <div className="mx-auto max-w-6xl">
     
        <h2 className="mb-6 text-5xl font-light tracking-[-0.03em] md:text-7xl">
          The perfect fit, transparently priced.
        </h2>

        <p className="mb-14 max-w-4xl text-md leading-relaxed text-stone-600">
          Every garment is different, but pricing shouldn't feel mysterious.
          Final quotes are confirmed before work begins.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingGroups.map((group) => (
            <div key={group.title} className="border border-stone-300/70 p-8">
              <h3 className="mb-8 text-3xl font-light">{group.title}</h3>

              <div className="space-y-5">
                {group.items.map(([service, price]) => (
                  <div
                    key={service}
                    className="flex justify-between gap-6 border-b border-stone-300/70 pb-4 text-sm"
                  >
                    <span>{service}</span>
                    <span className="text-right text-stone-600">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-stone-500">
          Pricing may vary based on fabric, construction, layers, beading, fit
          complexity, deadline, and number of fittings required.
        </p>
      </div>
    </section>
  );
}