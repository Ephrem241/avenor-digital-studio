import { formatDate, readingMinutes, type ContentBlock } from "@/lib/content-blocks";
import { isProductionDeployment } from "@/lib/env";

/**
 * Insights articles. Drafts (`published: false`) are visible in dev and on preview
 * deployments and return 404 in production until the owner approves them.
 * Advice is written from practice: no statistics or studies that can't be sourced.
 */
export type ArticleIndustry = "hospitality" | "beauty-wellness" | "general";

export type Article = {
  slug: string;
  title: string;
  description: string;
  industry: ArticleIndustry;
  published: boolean;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Services linked under the article, by slug from lib/services.ts. */
  serviceSlugs: string[];
  blocks: ContentBlock[];
};

export const articleIndustryLabels: Record<ArticleIndustry, string> = {
  hospitality: "Hospitality",
  "beauty-wellness": "Beauty & Wellness",
  general: "Planning",
};

export const articles: Article[] = [
  {
    slug: "small-hotel-website-direct-enquiries",
    title: "What a small hotel website needs before it can take direct enquiries",
    description:
      "The room details, photos, directions and replies a guesthouse or boutique hotel needs in place before guests will contact it directly.",
    industry: "hospitality",
    published: false,
    date: "2026-11-21",
    serviceSlugs: ["website-design-development", "customer-enquiry-management"],
    blocks: [
      {
        type: "p",
        text: "Many guests find a small hotel on a booking platform and then look for its own website. They want to see more of the place, check how to get there, or ask something the listing doesn't answer. If your website can't answer them, they go back to the platform. If it can, some of them will contact you directly.",
      },
      { type: "p", text: "Before you spend money on design, check that the site has the following in place." },
      { type: "h2", text: "Rooms that guests can compare" },
      {
        type: "p",
        text: "Give each room type its own section with photos, the bed setup, how many guests it sleeps and what's included. Guests compare rooms quickly, so list the details in the same order for every room.",
      },
      {
        type: "p",
        text: "If you publish rates, say what they include and when they change. If you don't, say how a guest can get a price and how soon you'll reply.",
      },
      { type: "h2", text: "Photos taken for the website" },
      {
        type: "p",
        text: "Guests judge a room by its photos. Phone snapshots taken at night, or pictures from before the last renovation, make a good room look worse than it is. Plan one daylight shoot that covers every room type, the bathrooms, the view, the breakfast area and the entrance. Bright, accurate photos work better than heavily edited ones, because guests notice when the room doesn't match.",
      },
      { type: "h2", text: "Directions for someone who has never been there" },
      {
        type: "p",
        text: "Add a map, the address written the way a taxi driver would recognise it, and a few lines on how to get there from the airport or the bus station. If the hotel is hard to find, a photo of the entrance helps more than another paragraph of text.",
      },
      { type: "h2", text: "One clear way to ask a question" },
      {
        type: "p",
        text: "Pick the channel your team actually answers, whether that's a form, email, WhatsApp or the phone, and show it on every page. A form should ask only for what you need to reply: dates, number of guests, room type and a way to get back to them.",
      },
      { type: "h2", text: "A reply that arrives in time" },
      {
        type: "p",
        text: "A direct enquiry is only worth something if somebody answers it. Decide who reads new enquiries, how often they check, and who covers when they're away. An automatic acknowledgement that tells the guest when to expect an answer can help, as long as a real reply follows.",
      },
      { type: "h2", text: "Your policies, in writing" },
      {
        type: "p",
        text: "Guests who book directly can't fall back on a platform's rules, so they look for yours. Publish check-in and check-out times, your cancellation policy, how payment works and any deposit you take.",
      },
      { type: "h2", text: "Where to start" },
      {
        type: "p",
        text: "If none of this exists yet, start with the rooms, the photos and the enquiry channel. Those decide whether a guest writes to you or goes back to the platform.",
      },
    ],
  },
  {
    slug: "salon-booking-contact-or-real-time",
    title: "Contact-based or real-time booking for your barbershop or salon",
    description:
      "When a barbershop or salon should let clients book a time slot online, and when a call or a message works better.",
    industry: "beauty-wellness",
    published: false,
    date: "2026-11-21",
    serviceSlugs: ["booking-reservation-systems", "website-design-development"],
    blocks: [
      {
        type: "p",
        text: "When a salon or barbershop plans a new website, the first question is usually about online booking. Should clients pick a time slot on the site, or should the site send them to a call or a message? Both work. Which one suits you depends on how your shop runs today.",
      },
      { type: "h2", text: "Real-time booking" },
      {
        type: "p",
        text: "With real-time booking, clients see open slots and confirm one without talking to anyone. It suits shops where:",
      },
      {
        type: "ul",
        items: [
          "the team already keeps a shared calendar and updates it",
          "services take a predictable amount of time",
          "clients often want to book outside opening hours",
          "someone is responsible for keeping availability correct",
        ],
      },
      {
        type: "p",
        text: "The cost is discipline. If the calendar is out of date, clients turn up for appointments the shop can't honour, and that does more harm than having no online booking.",
      },
      { type: "h2", text: "Contact-based booking" },
      {
        type: "p",
        text: "With contact-based booking, the website helps clients choose and then puts them in touch. They pick a service, choose a barber or stylist, and call or message that person to agree a time. It suits shops where:",
      },
      {
        type: "ul",
        items: [
          "clients ask for a particular person",
          "each staff member manages their own appointments",
          "most bookings already happen by phone, WhatsApp or Telegram",
          "walk-ins fill a good part of the day",
        ],
      },
      {
        type: "p",
        text: "It asks less of the team, because the way appointments are managed stays the same. The website's job is to make the first message easy to send.",
      },
      { type: "h2", text: "How we handled it for Noah Barbershop" },
      {
        type: "p",
        text: [
          "Noah Barbershop in Bole, Addis Ababa, takes bookings by phone and message, so ",
          { text: "the site we built for them", href: "/work/noah-barbershop" },
          " works the same way. Each service on the menu opens the barber list with that service already selected. Each barber's profile shows how they prefer to be contacted, and the WhatsApp links open with a booking message already written.",
        ],
      },
      {
        type: "p",
        text: "The shop has no booking calendar to maintain, and clients can still reach the barber they want in a few taps.",
      },
      { type: "h2", text: "Questions to answer before you choose" },
      {
        type: "ol",
        items: [
          "Who manages appointments today, and where?",
          "Do clients usually ask for a particular person?",
          "Could someone keep an online calendar accurate every day?",
          "How do your clients prefer to reach you?",
        ],
      },
      {
        type: "p",
        text: "If most of your answers point to calls and messages, start with contact-based booking. You can add real-time booking later, once the team is ready to run a shared calendar.",
      },
    ],
  },
  {
    slug: "preparing-for-a-website-project",
    title: "What to prepare before you start a website project",
    description:
      "The content, photos, decisions and account logins that keep a website project moving, whoever builds it.",
    industry: "general",
    published: false,
    date: "2026-11-21",
    serviceSlugs: ["website-design-development", "website-care"],
    blocks: [
      {
        type: "p",
        text: "Website projects tend to stall at the same point: the design is ready, but the content, photos or decisions it depends on aren't. You can avoid most of that by preparing a few things before the work starts.",
      },
      { type: "h2", text: "Know what the website is for" },
      {
        type: "p",
        text: "Write down the one thing you most want visitors to do. For a hotel that might be sending an enquiry; for a salon, booking an appointment. Every page should lead towards it, so whoever designs the site needs to know what it is.",
      },
      { type: "h2", text: "Gather the facts about your business" },
      {
        type: "ul",
        items: [
          "Your services or rooms, with prices if you publish them",
          "Opening hours, the address and how to get there",
          "The contact channels your team actually answers",
          "The policies customers ask about, such as cancellations and deposits",
        ],
      },
      { type: "p", text: "These details look small, but they're what customers look for first." },
      { type: "h2", text: "Collect photos, or plan a shoot" },
      {
        type: "p",
        text: "Look at the photos you already have and be honest about them. If they're old, dark or don't show what you sell, book a photographer early. Arranging a shoot often takes longer than people expect.",
      },
      { type: "h2", text: "Decide who approves the work" },
      {
        type: "p",
        text: "Name one person who can sign off designs and copy. When several people send feedback separately, the project waits while their comments are reconciled.",
      },
      { type: "h2", text: "Find your logins" },
      {
        type: "p",
        text: "Check that you can sign in to your domain registrar, your email provider and any social or booking accounts you want linked to the site. If nobody can sign in to the domain, the new site can't go live on it until access is recovered.",
      },
      { type: "h2", text: "Plan for after launch" },
      {
        type: "p",
        text: "Decide who will answer enquiries, who will update prices and opening hours, and who to call when something stops working. A website keeps bringing in customers only while someone keeps it accurate.",
      },
      {
        type: "p",
        text: ["When you're ready, ", { text: "tell us about your project", href: "/contact" }, "."],
      },
    ],
  },
];

/** Whether an article may be shown on this deployment. */
export function isArticleVisible(article: Article): boolean {
  return article.published || !isProductionDeployment;
}

/** Visible articles, newest first. */
export function getVisibleArticles(): Article[] {
  return articles.filter(isArticleVisible).sort((a, b) => b.date.localeCompare(a.date));
}

export function getVisibleArticle(slug: string): Article | undefined {
  const article = articles.find((item) => item.slug === slug);
  return article && isArticleVisible(article) ? article : undefined;
}

export function articleReadingMinutes(article: Article): number {
  return readingMinutes(article.blocks);
}

export const formatArticleDate = formatDate;
