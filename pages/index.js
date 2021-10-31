import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>
        <span>my</span>Bio
      </h1>
      <p>
        👋🏻 I&apos;m Michael but some people call me <code>my</code>. I love to
        create order.
      </p>
      <p>
        I am a <s>🤖 robot</s>, <s>👽 alien</s>, 👨🏻‍🌾 human bean, and I live in 📍
        NYC.
      </p>
      <p>
        I&apos;m also a software engineer and I love building{" "}
        <a
          href="https://en.wikipedia.org/wiki/Graphical_user_interface"
          target="_blank"
          rel="noreferrer"
        >
          GUIs
        </a>
        . Currently, I work at MLB on{" "}
        <a href="https://www.mlb.com" rel="noreferrer" target="_blank">
          mlb.com
        </a>
        . I recently had the amazing opportunity to lead the frontend
        development effort of the Cheer at the Ballpark project (💀 rip).
        Previously, I worked at Resy on{" "}
        <a href="https://www.resy.com" rel="noreferrer" target="_blank">
          resy.com
        </a>
        . Read more on{" "}
        <Link href="/work">
          <a>my work page</a>
        </Link>
        .
      </p>
      <p>
        Another hobby I would like take up is writing, so naturally there must
        be a blog! That&apos;s a big part of the motivation behind rebuilding
        this website, aside from it already being long overdue. To enable myself
        to efficiently{" "}
        <a
          href="https://www.swyx.io/writing/learn-in-public"
          target="_blank"
          rel="noopener noreferrer"
        >
          learn in public
        </a>{" "}
        and share what I enjoy.
      </p>
    </div>
  );
}
