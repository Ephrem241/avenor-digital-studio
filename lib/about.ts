/**
 * Working principles on the About page. Each is a commitment the owner confirms before
 * launch (docs/launch-checklist.md). No team, history, numbers or awards here.
 */
export type Principle = {
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    title: "We say where a project stands",
    body: "Every project on this site shows its real status. If something is still in development, we say so, and we describe only features that exist.",
  },
  {
    title: "Phones first",
    body: "Most of your customers will find you on a phone. We design and test each page at phone width before we move on to larger screens.",
  },
  {
    title: "Plain language",
    body: "We write copy your customers can understand, and we explain technical choices to you in the same way.",
  },
  {
    title: "Only what the business needs",
    body: "We start with the smallest version that does the job and add features when there's a reason for them.",
  },
  {
    title: "Your site stays yours",
    body: "Your domain, your content and your accounts stay in your name, so you can change or move them whenever you need to.",
  },
];

/** placeholder: true. The owner has not yet confirmed these principles. */
export const principlesConfirmed = false;
