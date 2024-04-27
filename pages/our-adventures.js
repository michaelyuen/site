import { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export async function getStaticProps() {
  const res = await fetch(
    "https://res.cloudinary.com/mikey-baby/image/list/our-adventures.json"
  );
  const { resources } = await res.json();
  const photos = resources
    .map((resource) => {
      const { public_id, version, width, height } = resource;
      return {
        key: public_id,
        src: `https://res.cloudinary.com/mikey-baby/image/upload/v${version}/${public_id}.avif`,
        width,
        height,
      };
    })
    .sort((a, b) => {
      /**
       * Sort the photos chronologically
       * ---
       * Parse date (e.g., '2023-10-28') from src (which is public_id), then sort.
       * Since photos were all uploaded to Cloudinary at the same time
       * and this was the easiest way I could think of to sort by date.
       */
      const [dateA] = a.src.match(/\d{4}-\d{2}-\d{2}/);
      const [dateB] = b.src.match(/\d{4}-\d{2}-\d{2}/);
      return new Date(dateA) - new Date(dateB);
    });
  return { props: { componentKey: "our-adventures", photos } };
}

export default function OurAdventures({ photos }) {
  const [showAlbum, setShowAlbum] = useState(false);
  const [showError, setShowError] = useState(false);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { password } = Object.fromEntries(formData.entries());
    if (password === "ladybird") {
      setShowAlbum(true);
    } else {
      setShowError(true);
    }
  };
  return (
    <div>
      <h1>
        <span>our</span>Adventures
      </h1>
      {showAlbum ? (
        <>
          <PhotoAlbum
            layout="rows"
            photos={photos}
            onClick={({ index: current }) => setIndex(current)}
          />
          <Lightbox
            index={index}
            close={() => setIndex(-1)}
            open={index >= 0}
            slides={photos}
          />
        </>
      ) : (
        <div>
          <form autoComplete="off" onSubmit={onSubmit}>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Enter Password: (hint - where we went on our first
              &ldquo;date&rdquo;)
              <input
                autoComplete="off"
                type="password"
                name="password"
                style={{
                  border: "1px solid #262626",
                  borderRadius: "5px",
                  marginTop: "1em",
                  marginBottom: "1em",
                  height: "2em",
                  width: "200px",
                }}
              />
            </label>
            <input type="submit" style={{ marginBottom: "1em" }} />
            <br />
            {showError && (
              <span
                style={{
                  border: "1px solid #7f1d1d",
                  borderRadius: "5px",
                  background: "#f87171",
                  color: "black",
                  padding: "0.5em 1em",
                }}
              >
                Wrong.💔 Try again.
              </span>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
