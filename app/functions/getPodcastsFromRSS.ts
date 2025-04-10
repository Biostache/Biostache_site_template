import Parser, { Enclosure } from "rss-parser";

interface ExtendedItem extends Parser.Item {
  // Exactly match the shape from rss-parser:
  enclosure?: Enclosure;
}


export default async function getPodcastsFromRSS() {
    const parser = new Parser<{}, ExtendedItem>();
    const feedUrl = "https://feeds.acast.com/public/shows/66309c2fcaefee00125438da";
    const feed = await parser.parseURL(feedUrl);

  // Transform feed items -> your PodcastType shape
  // feed.items is an array of AcastItem
  const podcasts = feed.items.map((item, index) => {
    // item.title -> your .title
    // item.pubDate -> your .date
    // item.enclosure.url -> possibly your .audio file if needed
    // any image, description, etc. depends on the feed structure

    return {
      id: index + 1,
      title: item.title ?? "Untitled",
      img: "/icons/default_podcast_art.png", // or if the feed provides an image link, replace here
      imgAlt: item.title ?? "Podcast episode cover",
      date: item.pubDate ?? "2025-01-01",
      duration: "N/A", // If the feed includes duration, map it here
      episode: `Episode ${index + 1}`,
      slug: (item.title ?? "untitled").toLowerCase().replace(/\s+/g, "-"),
      content: [
        {
          summary: item.contentSnippet ?? "",
          section1: item.content ?? "",
          // This example just puts placeholders in quote, etc.
          quote: ["Here is a quote from the guest", "Guest Name"],
          section2: "",
        },
      ],
    };
  });

  return podcasts;
}