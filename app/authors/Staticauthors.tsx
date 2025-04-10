
export interface AuthorData {
    id: number;
    name: string;     // e.g. "Harry Glaspole"
    slug: string;     // e.g. "Harry-Glaspole"
    job: string;
    city: string;
    avatar: string;   // e.g. "/images/authors/Harry-Glaspole.jpg"
    // If you want separate "summary" and "body", make biography an object:
    biography: {
      summary: string;
      body: string;
    };
  }
  
  // Example static array
  export const authors: AuthorData[] = [
    {
      id: 1,
      name: "Harry Glaspole",
      slug: "harry-glaspole",
      job: "Editor",
      city: "Melbourne",
      avatar: "/images/authors/Harry-Glaspole.jpg",
      biography: {
        summary:
          "Harry has amassed a wealth of knowledge in the underlying science behind biotechnology breakthroughs...",
        body:
          "He focuses on translating complex topics into accessible stories. Harry joined our team in 2021...",
      },
    },
    {
      id: 2,
      name: "Sam Ruba",
      slug: "sam-ruba",
      job: "Editor",
      city: "Melbourne",
      avatar: "/images/authors/Sam-Ruba.jpg",
      biography: {
        summary: "Sam has expertise in reproductive biotechnology...",
        body:
          "Sam's background includes developing novel infertility treatments in both men and women...",
      },
    },
    {
      id: 3,
      name: "Ryan Wallace",
      slug: "ryan-wallace",
      job: "Editor",
      city: "Melbourne",
      avatar: "/images/authors/Ryan-Wallace.jpg",
      biography: {
        summary:
          "Ryan focuses on genetically modified organisms and how they benefit Australia's agricultural sectors...",
        body:
          "Before joining us, he was heavily involved in GMO research across multiple institutions...",
      },
    },
    {
      id: 4,
      name: "Daniel Giannetti",
      slug: "daniel-giannetti",
      job: "Editor",
      city: "Melbourne",
      avatar: "/images/authors/Daniel-Giannetti.jpg",
      biography: {
        summary:
          "Daniel leverages a strong background in pharmacology to translate complex scientific research...",
        body:
          "He has published articles in numerous scientific journals and is passionate about open science...",
      },
    },
  ];