const alterationGroups = [
  {
    title: "Alterations",
    intro: "Wedding gowns, bridal separates, veils, and wedding-week adjustments.",
    items: [
      "Wedding dress hemming",
      "Bodice alterations",
      "Strap shortening",
      "Sleeve adjustments",
      "Train shortening",
      "Lace gown alterations",
      "Reception dress alterations",
      "Veil shortening",
      "Last-minute bridal alterations",
    ],
  },
  {
    title: "Formalwear + Event Alterations",
    intro: "For rehearsal dinners, galas, black-tie events, and wedding guests.",
    items: [
      "Bridesmaid dress alterations",
      "Mother-of-the-bride alterations",
      "Cocktail dress hemming",
      "Evening gown alterations",
      "Prom dress alterations",
      "Jumpsuit alterations",
      "Zipper repair or replacement",
      "Lining adjustments",
      "Garment steaming prep",
    ],
  },
  {
    title: "Everyday Tailoring",
    intro: "Modern tailoring for the pieces you wear often and want to keep.",
    items: [
      "Jeans hemming",
      "Original hem denim",
      "Pants hemming",
      "Waist adjustments",
      "Adjusting Leg Width",
      "Shortening sleeves",
      "Tapering Pants",
      "Skirt hemming",
      "Button replacement",
      "Simple repairs",
    ],
  },
  {
    title: "Menswear + Suit Alterations",
    intro: "Clean, thoughtful fit adjustments for suits, jackets, shirts, and trousers.",
    items: [
      "Suit jacket alterations",
      "Sleeve shortening",
      "Jacket waist suppression",
      "Trouser hemming",
      "Trouser tapering",
      "Suit pants waist adjustment",
      "Shirt tailoring",
      "Cuff adjustments",
      "Formalwear alterations",
      "Wedding suit alterations",
    ],
  },
  {
    title: "Custom + Special Projects",
    intro: "One-of-one garment work, redesigns, and special commissions.",
    items: [
      "Heirloom garment redesign",
      "Vintage clothing alterations",
      "Denim repair",
      "Patchwork repair",
      "Custom skirt projects",
      "Custom dress projects",
      "Garment redesign",
      "Special occasion alterations",
      "Wardrobe refresh tailoring",
      "Favorite garment restoration",
    ],
  },
];

export default function AlterationsList() {
  return (
    <section id="alterations" className="bg-linen px-6 py-24 text-ink lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="mt-4 font-serif text-5xl md:text-6xl">
            Thoughtful alterations for the pieces that matter.
          </h2>

          <p className="mt-6 text-md leading-relaxed text-ink/70">
            From wedding dress alterations to everyday tailoring,
            denim repairs, formalwear adjustments, and custom garment work, each
            project starts with fit, function, timeline, and care.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alterationGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[2rem] border border-ink/10 bg-bone p-8"
            >
              <h3 className="font-serif text-3xl">{group.title}</h3>

              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                {group.intro}
              </p>

              <ul className="mt-8 grid gap-3 text-sm text-ink/80">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}