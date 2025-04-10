
// import getPodcastsFromRSS from './getPodcastsFromRSS';
import getPodcastsFromRSS from "./getPodcastsFromRSS";
export type PodcastType = {
  id: number;
  title: string;
  img: string;
  imgAlt: string;
  date: string;
  duration: string;
  episode: string;
  slug: string;
  content: {
    summary: string;
    section1: string;
    quote: string[];
    section2: string;
  }[];
};
export async function getPodcasts(): Promise<PodcastType[]> {
  // OPTIONAL: if you still want to fallback on your old JSON approach, you can combine them:
  /*
  const res = await fetch(
    "https://raw.githubusercontent.com/asbhogal/Fyrre-Magazine/main/json/podcasts.json"
  );
  let jsonPodcasts: PodcastType[] = [];
  if (res.ok) {
    jsonPodcasts = await res.json();
  }
  */

  // Now fetch from the RSS feed
  // const rssPodcasts = await getPodcastsFromRSS();

  // Combine them if you want, or just return the RSS-based episodes:
  // return [...rssPodcasts, ...jsonPodcasts]; // if you want to unify
  // return rssPodcasts;
  const rssPodcasts = await getPodcastsFromRSS();
  return rssPodcasts;
}
// export async function getPodcasts(): Promise<PodcastType[]> {
//   const res = await fetch(
//     "https://raw.githubusercontent.com/asbhogal/Fyrre-Magazine/main/json/podcasts.json"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch podcast data");
//   }
//     // OPTIONAL: if you still want to fallback on your old JSON approach, you can combine them:
//   /*
//   const res = await fetch(
//     "https://raw.githubusercontent.com/asbhogal/Fyrre-Magazine/main/json/podcasts.json"
//   );
//   let jsonPodcasts: PodcastType[] = [];
//   if (res.ok) {
//     jsonPodcasts = await res.json();
//   }
//   */

//   // Now fetch from the RSS feed
//   const rssPodcasts = await getPodcastsFromRSS();

//   // Combine them if you want, or just return the RSS-based episodes:
//   // return [...rssPodcasts, ...jsonPodcasts]; // if you want to unify
//   return rssPodcasts;
// }
