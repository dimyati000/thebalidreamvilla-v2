import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackIcon from "../../../components/icons/BackIcon";

import villa1 from "../../../assets/villa/villa-1.webp";
import villa2 from "../../../assets/villa/villa-2.webp";

import seminyak1 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan1.webp";
import seminyak2 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan2.webp";
import seminyak3 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan3.webp";
import seminyak4 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan4.webp";

import canggu1 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan1.webp";
import canggu2 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan2.webp";
import canggu3 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan3.webp";
import canggu4 from "../../../assets/LeisureEntertainment/destinationguide/pemandangan4.webp";

const backgroundImages = [villa1, villa2];
const BACKGROUND_DELAY = 5000;

const locations = [
  { id: "seminyak", label: "Seminyak" },
  { id: "canggu", label: "Canggu" },
];

const destinations = {
  seminyak: [
    {
      id: "seminyak-beach",
      number: "01",
      title: "Seminyak Beach",
      category: "Sunset & Coast",
      image: seminyak1,
      description:
        "Enjoy a relaxed afternoon by the coast and stay for Seminyak's warm sunset atmosphere.",
      mapQuery: "Seminyak Beach Bali",
    },
    {
      id: "petitenget",
      number: "02",
      title: "Petitenget",
      category: "Culture & Heritage",
      image: seminyak2,
      description:
        "Discover one of Seminyak's cultural landmarks and the quieter character surrounding Petitenget.",
      mapQuery: "Petitenget Temple Bali",
    },
    {
      id: "eat-street",
      number: "03",
      title: "Eat Street",
      category: "Dining & Lifestyle",
      image: seminyak3,
      description:
        "Explore Seminyak's collection of restaurants, cafés, boutiques, and evening experiences.",
      mapQuery: "Eat Street Seminyak Bali",
    },
    {
      id: "sunset-clubs",
      number: "04",
      title: "Sunset Beach Clubs",
      category: "Leisure & Music",
      image: seminyak4,
      description:
        "Spend the day beside the ocean with curated dining, music, and a memorable Bali sunset.",
      mapQuery: "Beach Clubs Seminyak Bali",
    },
  ],

  canggu: [
    {
      id: "echo-beach",
      number: "01",
      title: "Echo Beach",
      category: "Beach & Sunset",
      image: canggu1,
      description:
        "Experience Canggu's coastal energy, ocean views, and an easygoing sunset atmosphere.",
      mapQuery: "Echo Beach Canggu Bali",
    },
    {
      id: "batu-bolong",
      number: "02",
      title: "Batu Bolong",
      category: "Surf & Lifestyle",
      image: canggu2,
      description:
        "Explore a lively neighborhood shaped by surfing, cafés, local shops, and beach culture.",
      mapQuery: "Batu Bolong Canggu Bali",
    },
    {
      id: "tanah-lot",
      number: "03",
      title: "Tanah Lot",
      category: "Culture & Heritage",
      image: canggu3,
      description:
        "Visit one of Bali's most recognizable sea temples and enjoy its dramatic coastal setting.",
      mapQuery: "Tanah Lot Temple Bali",
    },
    {
      id: "surf-experience",
      number: "04",
      title: "Surf Experience",
      category: "Active & Outdoors",
      image: canggu4,
      description:
        "Discover Canggu from the water with a surf experience suited to a relaxed island day.",
      mapQuery: "Surf School Canggu Bali",
    },
  ],
};

export default function DestinationGuide() {
  const navigate = useNavigate();

  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [activeLocation, setActiveLocation] = useState("seminyak");

  const activeItems = useMemo(
    () => destinations[activeLocation] ?? [],
    [activeLocation],
  );

  const [selectedId, setSelectedId] = useState(
    destinations.seminyak[2]?.id ?? destinations.seminyak[0]?.id ?? null,
  );

  /* Background berganti seperti halaman Leisure & Entertainment */
  useEffect(() => {
    if (backgroundImages.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setBackgroundIndex(
        (currentIndex) => (currentIndex + 1) % backgroundImages.length,
      );
    }, BACKGROUND_DELAY);

    return () => window.clearInterval(intervalId);
  }, []);

  /* Card tengah otomatis aktif ketika lokasi diganti */
  useEffect(() => {
    const middleIndex = Math.floor(activeItems.length / 2);

    setSelectedId(
      activeItems[middleIndex]?.id ??
        activeItems[0]?.id ??
        null,
    );
  }, [activeItems]);

  const handleOpenMap = (event, item) => {
    event.stopPropagation();

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      item.mapQuery,
    )}`;

    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        bg-black
        font-cormorant
        text-white
      "
    >
      <style>{`
        @keyframes destinationContentIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* BACKGROUND SLIDER — SAMA DENGAN LEISURE & ENTERTAINMENT */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <img
            key={`destination-background-${index}`}
            src={image}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            className={`
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-opacity
              duration-1000
              ${
                index === backgroundIndex
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
          />
        ))}
      </div>

      {/* OVERLAY — SAMA DENGAN LEISURE & ENTERTAINMENT */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-black/40
          bg-linear-to-b
          from-black/20
          via-transparent
          to-[#1c140a]
          backdrop-blur-[2px]
        "
      />

      {/* CONTENT */}
      <div className="relative z-20 flex min-h-screen flex-col">
        {/* HEADER — CSS DISAMAKAN PERSIS */}
        <header className="flex items-center gap-3 pl-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-md
              transition
              hover:bg-white/20
            "
          >
            <BackIcon />
          </button>

          <h1
            className="
              text-lg
              font-light
              uppercase
              tracking-[0.2em]
              text-white
              drop-shadow-lg
            "
          >
            Destination Guide
          </h1>
        </header>

        {/* LOCATION + CARDS ONLY */}
        <section
          className="
            flex
            flex-1
            flex-col
            items-center
            justify-center
            px-4
            pb-10
            pt-8
            md:px-8
          "
        >
          {/* CANGGU / SEMINYAK */}
          <div
            className="
              mb-6
              flex
              w-fit
              items-center
              rounded-full
              border
              border-white/15
              bg-black/20
              p-1
              shadow-[0_12px_40px_rgba(0,0,0,0.18)]
              backdrop-blur-md
            "
            role="tablist"
            aria-label="Choose villa location"
          >
            {locations.map((location) => {
              const isActive =
                activeLocation === location.id;

              return (
                <button
                  key={location.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() =>
                    setActiveLocation(location.id)
                  }
                  className={`
                    rounded-full
                    px-6
                    py-2.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    transition-all
                    duration-300
                    md:px-8
                    ${
                      isActive
                        ? "bg-[#d6b16f] text-[#21160b] shadow-lg"
                        : "text-white/65 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {location.label}
                </button>
              );
            })}
          </div>

          {/* TRANSPARENT CARD WRAPPER */}
          <div
            className="
              w-full
              max-w-6xl
              overflow-hidden
              rounded-2xl
              border
              border-white/15
              bg-black/15
              p-1.5
              shadow-[0_24px_70px_rgba(0,0,0,0.28)]
              backdrop-blur-md
              md:p-2
            "
          >
            <div
              key={activeLocation}
              className="
                flex
                h-[650px]
                flex-col
                gap-1.5
                md:h-[520px]
                md:flex-row
                md:gap-0
                lg:h-[570px]
              "
            >
              {activeItems.map((item, index) => {
                const isSelected =
                  item.id === selectedId;

                return (
                  <article
                    key={item.id}
                    onClick={() =>
                      setSelectedId(item.id)
                    }
                    className={`
                      group
                      relative
                      cursor-pointer
                      overflow-hidden
                      rounded-lg
                      border-white/10
                      transition-all
                      duration-700
                      ease-in-out
                      will-change-[flex-grow]
                      md:rounded-none
                      ${
                        isSelected
                          ? "flex-[5] md:flex-[4]"
                          : "flex-[1]"
                      }
                      ${
                        index <
                        activeItems.length - 1
                          ? "md:border-r"
                          : ""
                      }
                    `}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={
                        index === 0 ? "high" : "low"
                      }
                      draggable="false"
                      className={`
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        object-center
                        transition-all
                        duration-1000
                        ease-in-out
                        ${
                          isSelected
                            ? "scale-100 brightness-100 grayscale-0"
                            : "scale-105 brightness-[0.34] grayscale-[20%] group-hover:brightness-[0.46]"
                        }
                      `}
                    />

                    {/* CARD OVERLAY — COKELAT/TRANSPARAN, BUKAN BIRU */}
                    <div
                      className={`
                        pointer-events-none
                        absolute
                        inset-0
                        transition-all
                        duration-700
                        ${
                          isSelected
                            ? "bg-linear-to-t from-[#1c140a]/95 via-[#1c140a]/45 to-transparent"
                            : "bg-[#1c140a]/30"
                        }
                      `}
                    />

                    {/* ACTIVE CONTENT */}
                    <div
                      style={{
                        animation: isSelected
                          ? "destinationContentIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                          : "none",
                      }}
                      className={`
                        absolute
                        inset-0
                        flex
                        flex-col
                        justify-end
                        p-5
                        transition-opacity
                        duration-500
                        md:p-8
                        ${
                          isSelected
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0"
                        }
                      `}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="
                            text-[10px]
                            font-semibold
                            tracking-[0.4em]
                            text-[#d6b16f]
                            md:text-xs
                          "
                        >
                          {item.number}
                        </span>

                        <div className="h-px flex-1 bg-[#d6b16f]/35" />

                        <span
                          className="
                            text-[9px]
                            uppercase
                            tracking-[0.22em]
                            text-white/65
                            md:text-[11px]
                          "
                        >
                          {item.category}
                        </span>
                      </div>

                      <h2
                        className="
                          font-cormorant
                          text-2xl
                          font-light
                          uppercase
                          leading-tight
                          tracking-[0.06em]
                          text-white
                          md:text-4xl
                        "
                      >
                        {item.title}
                      </h2>

                      <p
                        className="
                          mt-3
                          max-w-md
                          text-xs
                          font-light
                          leading-relaxed
                          text-white/70
                          md:text-sm
                        "
                      >
                        {item.description}
                      </p>

                      <button
                        type="button"
                        onClick={(event) =>
                          handleOpenMap(event, item)
                        }
                        className="
                          mt-5
                          inline-flex
                          w-fit
                          items-center
                          gap-3
                          rounded-full
                          border
                          border-white/25
                          bg-white/10
                          px-5
                          py-2.5
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.26em]
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:border-[#d6b16f]/70
                          hover:bg-[#d6b16f]
                          hover:text-[#21160b]
                        "
                      >
                        Open Maps
                        <span aria-hidden="true">→</span>
                      </button>

                      <div className="mt-6 hidden gap-1.5 md:flex">
                        {activeItems.map(
                          (destination) => (
                            <span
                              key={destination.id}
                              className={`
                                block
                                h-px
                                transition-all
                                duration-500
                                ${
                                  destination.id ===
                                  selectedId
                                    ? "w-8 bg-[#d6b16f]"
                                    : "w-4 bg-white/25"
                                }
                              `}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    {/* INACTIVE — DESKTOP */}
                    <div
                      className={`
                        absolute
                        inset-0
                        hidden
                        flex-col
                        items-center
                        justify-end
                        pb-7
                        transition-opacity
                        duration-500
                        md:flex
                        ${
                          isSelected
                            ? "pointer-events-none opacity-0"
                            : "pointer-events-auto opacity-100"
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-semibold tracking-[0.3em] text-[#d6b16f]">
                          {item.number}
                        </span>

                        <div className="h-6 w-px bg-white/25" />

                        <h3
                          className="
                            rotate-180
                            whitespace-nowrap
                            font-cormorant
                            text-sm
                            font-light
                            uppercase
                            tracking-widest
                            text-white/85
                            [writing-mode:vertical-lr]
                          "
                        >
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* INACTIVE — MOBILE */}
                    <div
                      className={`
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-between
                        px-5
                        transition-opacity
                        duration-500
                        md:hidden
                        ${
                          isSelected
                            ? "pointer-events-none opacity-0"
                            : "pointer-events-auto opacity-100"
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-semibold tracking-[0.25em] text-[#d6b16f]">
                          {item.number}
                        </span>

                        <h3 className="font-cormorant text-sm font-light uppercase tracking-[0.05em] text-white/90">
                          {item.title}
                        </h3>
                      </div>

                      <span className="text-base font-light text-[#d6b16f]">
                        ＋
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}