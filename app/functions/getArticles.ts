import he from "he"; 
export type ArticleType = {
  id: number;
  // author: string;
  // job: string;
  // city: string;
  // avatar: string;
  // imgAlt: string;
  // slug: string;
  articles: Array<{
    author: string;
    authorAvatar: string;
    title: string;
    popular: boolean;
    popularity: number;
    description: string;
    date: string;
    read: string;
    label: string;
    img: string;
    imgAlt: string;
    slug: string;
    content: Array<{
      img: string;
      summary: string;
      section1: string;
      quote: Array<string>;
      summary2: string;
      section2: string;
    }>;
  }>;
};

export async function getArticles(): Promise<ArticleType[]> {
  const wpEndpoint = "https://biostache.com/wp-json/wp/v2/posts?per_page=50&_embed";
  try {
    const response = await fetch(wpEndpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch posts from WP");
    }

    const posts = await response.json();


    const transformedArticles = posts.map((post: any) => {

      // Attempt to get the featured image from _embedded
      let featuredImageUrl = "/default-image.jpg"; // fallback
      if (
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
      ) {
        featuredImageUrl = post._embedded["wp:featuredmedia"][0].source_url;
      }

      // 2) Attempt to get the author name
      const authorName =
        post.authors[0].display_name || "Unknown Author";

      const authorAvatar = post.authors[0].avatar_url?.url?? "/fallback.png"
      return {
        author: authorName, // <--- store author for THIS article
        authorAvatar: authorAvatar,
        title: stripHtml(he.decode(post.title?.rendered || "")) || "Untitled",
        popular: false,
        popularity: 0,
        description: stripHtml(he.decode(post.excerpt?.rendered || "")),
        date: new Date(post.date).toLocaleDateString(),
        read: "5 min",
        label: "Blog",
        img: featuredImageUrl,
        imgAlt: "Featured image",
        slug: post.slug,
        content: [
          {
            img: featuredImageUrl,
            summary: "",
            section1: "",
            quote: [],
            summary2: "",
            section2: "",
          },
        ],
      };
    });
    
    // Single “parent” object to preserve data[0].articles shape
    const result: ArticleType[] = [
      {
        id: 1,
        articles: transformedArticles,
      },
    ];

    return result;
  } catch (error) {
    console.error("Error in getArticles:", error);
    return [];
  }
}

// Simple helper to remove HTML tags
function stripHtml(htmlString: string): string {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}


  //   const res = await fetch(
//     "https://raw.githubusercontent.com/asbhogal/Fyrre-Magazine/main/json/articles.json"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch article data");
//   }

//   return res.json();
// }
