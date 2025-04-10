import { ArticleType, getArticles } from "@/app/functions/getArticles";
import PostNavigation from "@/components/PostNavigation";
import SocialSharing from "@/components/SocialSharing";
import Subheading from "@/components/Subheading";
import Link from "next/link";

// If you're using Next 13 with App Router, you can also use `notFound()` if you prefer:
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}) {
  const articles: ArticleType[] = await getArticles();
  const allArticles = articles.flatMap((group) => group.articles);

  console.log("Route param (params.title) =", params.title);
  console.log("All articles slugs =", allArticles.map((a) => a.slug));

  const matchingArticle = allArticles.find(
    (article) => article.slug === params.title
  );

  if (!matchingArticle) {
    return {
      title: "Article not found | Biostache",
    };
  }

  return {
    title: `${matchingArticle.title} | Biostache`,
  };
}

export default async function ArticleDetails({
  params,
}: {
  params: { title: string };
}) {
  try {
    const articles: ArticleType[] = await getArticles();
    const allArticles = articles.flatMap((group) => group.articles);

    const matchingArticle = allArticles.find(
      (article) => article.slug === params.title
    );

    if (!matchingArticle) {
      // Option A: return a simple 404
      return (
        <main className="max-w-[95rem] mx-auto px-4">
          <p>Article not found</p>
        </main>
      );
      // Option B: use the Next.js built-in:
      // notFound();
    }

    // Grab the top 3 latest articles
    const latestArticles = allArticles
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);

    return (
      <main className="max-w-[95rem] w-full mx-auto px-4 md:pt-8 sm:pt-4 xs:pt-2 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
        {/* Back link / “Magazine” navigation */}
        <PostNavigation href="/magazine">Magazine</PostNavigation>

        {/* Title & short excerpt */}
        <article className="grid md:grid-cols-2 gap-6 md:gap-6 pb-6 md:pb-24">
          <h2 className="text-subtitle">{matchingArticle.title}</h2>
          <p>{matchingArticle.description}</p>
        </article>

        {/* Post metadata (author, date, label, etc.) */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 mb-8">
          <div className="flex flex-col sm:flex-row md:items-center gap-2 sm:gap-6">
            <span className="flex flex-wrap">
              <p className="font-semibold pr-2">Text</p>
              <p>{matchingArticle.author}</p>
            </span>
            <span className="flex flex-wrap">
              <p className="font-semibold pr-2">Date</p>
              <time dateTime={matchingArticle.date}>{matchingArticle.date}</time>
            </span>
            <span className="flex flex-wrap">
              <p className="font-semibold pr-2">Read</p>
              <p>{matchingArticle.read}</p>
            </span>
          </div>
          <span className="px-3 py-2 border border-black rounded-full w-fit">
            <p className="uppercase">{matchingArticle.label}</p>
          </span>
        </div>

        {/* Featured Image (if you store it here). 
            Adjust if your featured image is matchingArticle.img 
            rather than matchingArticle.content[0].img. */}
        <div>
          <img
            src={
              matchingArticle.content?.[0]?.img // or just matchingArticle.img
            }
            alt={matchingArticle.imgAlt}
          />
        </div>

        {/* 
          Author info, Social shares, etc. 
          (You can keep this "author block" as is.)
        */}
        <article className="flex flex-col md:flex-row gap-6 md:gap-16 max-w-[62.5rem] w-full mx-auto mt-6 md:mt-24">
          <div className="flex flex-col w-fit">
            <div className="flex gap-4 items-center">
              <img
                className="w-[5rem] h-[5rem]"
                src={matchingArticle.authorAvatar}
                alt={matchingArticle.imgAlt}
              />
              <p className="text-[2rem] font-semibold">
                {matchingArticle.author}
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <div className="flex flex-wrap justify-between">
                <p className="font-semibold">Date</p>
                <time dateTime={matchingArticle.date}>
                  {matchingArticle.date}
                </time>
              </div>
              <div className="flex flex-wrap justify-between">
                <p className="font-semibold">Read</p>
                <p>{matchingArticle.read}</p>
              </div>
              <div className="flex flex-wrap justify-between">
                <p className="flex font-semibold">Share</p>
                <SocialSharing
                  links={[
                    {
                      href: "#",
                      ariaLabel: "Visit our Instagram page",
                      src: "/icons/ri_instagram-line.svg",
                      alt: "Instagram logo",
                    },
                    {
                      href: "#",
                      ariaLabel: "Visit our Twitter page",
                      src: "/icons/ri_twitter-fill.svg",
                      alt: "Twitter logo",
                    },
                    {
                      href: "#",
                      ariaLabel: "Visit our YouTube page",
                      src: "/icons/ri_youtube-fill.svg",
                      alt: "YouTube logo",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* 
            Render the ACTUAL WordPress HTML here:
            matchingArticle.contentHtml is the string from WP.
            We wrap it in a .prose container for Tailwind typography.
            Remove references to multiple content[] sections if they’re unused.
          */}
          <div className="lg:w-3/4">
            <article
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: matchingArticle.contentHtml }}
            />
          </div>
        </article>

        {/* Latest Posts Section */}
        <div>
          <Subheading className="text-subheading" url="/magazine" linkText="See all">
            Latest Posts
          </Subheading>

          {/* A placeholder map if you just want the slugs or something else: */}
          {latestArticles.map((latest) => (
            <div key={latest.slug}>
              <p>{/* Show something minimal here, or remove this div entirely */}</p>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black border-collapse mb-12 md:mb-48">
            {latestArticles.map((latestArticle) => (
              <article
                className="border border-black p-8"
                key={latestArticle.slug}
              >
                <div className="flex items-center justify-between">
                  <time dateTime={latestArticle.date}>{latestArticle.date}</time>
                  <span className="px-3 py-2 border border-black rounded-full">
                    <p className="uppercase">{latestArticle.label}</p>
                  </span>
                </div>
                <Link href={`/magazine/${latestArticle.slug}`}>
                  <img
                    className="w-full my-8"
                    src={latestArticle.img}
                    alt={latestArticle.imgAlt}
                  />
                </Link>
                <h2 className="heading3-title mb-3">
                  <Link href={`/magazine/${latestArticle.slug}`}>
                    {latestArticle.title}
                  </Link>
                </h2>
                <p className="mt-3 mb-12">{latestArticle.description}</p>
                <div className="flex flex-wrap gap-4">
                  <span className="flex">
                    <p className="font-semibold pr-2">Text</p>
                    <p>{matchingArticle.author}</p>
                  </span>
                  <span className="flex">
                    <p className="font-semibold pr-2">Duration</p>
                    <p>{latestArticle.read}</p>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching article details:", error);
    return <p>Error fetching article details</p>;
  }
}