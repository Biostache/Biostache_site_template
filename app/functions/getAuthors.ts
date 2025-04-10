import he from "he"; 
// types/AuthorData.ts
export interface AuthorData {
  id: number;
  name: string;
  slug: string;
  biography: string;
  avatar: string;
  imgAlt: string;
  // add any additional fields
}


export async function getAuthors(): Promise<AuthorData[]> {
  const wpEndpoint = "https://biostache.com/wp-json/wp/v2/pages?_embed"; // or your endpoint
  try {
    const response = await fetch(wpEndpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch authors from WP");
    }

    const users = await response.json();

    const transformedAuthors = users.map((user: any) => {
      return {
        id: user.id,
        slug: user.slug,
        name: user.name,
        biography: user.description ?? "",
        avatar: user.avatar_urls?.["96"] ?? "/fallback.png", 

      } as AuthorData;
    });

    return transformedAuthors;
  } catch (error) {
    console.error("Error in getAuthors:", error);
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
