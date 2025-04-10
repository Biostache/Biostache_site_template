// app/authors/AuthorsCardGrid.tsx (or whatever name)
import { authors } from "@/app/authors/Staticauthors";
import type { AuthorData } from "@/app/authors/Staticauthors";
import formatString from "@/app/functions/formatString";
import Image from "next/image";
import Link from "next/link";

export default function Authors() {
  // This is now your local array of static authors
  const data: AuthorData[] = authors;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mb-48 max-w-[95rem] w-full mx-auto border border-black border-collapse">
      {data.map((author) => (
        <article
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 md:gap-12 p-4 md:p-8 border border-black"
          key={author.id}
        >
          {/* Link to each author’s detail page by slug */}
          <Link href={`/authors/${author.slug}`}>
            <Image
              className="w-[9.375rem] h-[9.375rem] object-cover rounded-full hover:scale-105 transition"
              src={author.avatar}
              alt={author.name}
              width={150}
              height={150}
            />
          </Link>
          <div>
            <p className="heading3-title mb-4">
              <Link href={`/authors/${author.slug}`}>{author.name}</Link>
            </p>
            <div className="flex gap-8">
              <span className="flex">
                <p className="font-semibold pr-2">Job</p>
                <p>{author.job}</p>
              </span>
              <span className="flex">
                <p className="font-semibold pr-2">City</p>
                <p>{author.city}</p>
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

