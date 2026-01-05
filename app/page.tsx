'use client';import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

/**
 * METATONE - Artist Management
 * Layout: 8 Items in 2-Column Grid (4 Rows)
 * Features: Glitch Intro, Video Hover, Custom SVG Icons, Red Accents
 */

// --- Custom Components ---

// Reliable SVG for the X (Twitter) Logo
const XLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- Data ---
const ITEMS = [
  // --- ROW 1 ---
  {
    id: 1,
    name: "JOHN SUMMIT",
    type: "artist",
    logo: "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/ec4dcd05-1754-4b1f-8475-05b8467883d0/JS_LOGO_STACKED_WHITE.png?content-type=image%2Fpng",
    images: [
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/2942f61a-e486-4402-9b5c-58f65f7ae144/John+Summit+-+5X3A7534.jpg?content-type=image%2Fjpeg",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/68aeffa1-8291-44a3-9d70-92d64fd56af7/5X3A7238.jpg?format=1500w",
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/2942f61a-e486-4402-9b5c-58f65f7ae144/John+Summit+-+5X3A7534.jpg?content-type=image%2Fjpeg"
    ],
    socials: [
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/johnsummit/" },
      { icon: "custom-x", link: "https://twitter.com/johnsummit" },
      { icon: "fa-brands fa-tiktok", link: "https://www.tiktok.com/@johnsummit" },
      { icon: "fa-solid fa-globe", link: "https://www.johnsummitmusic.com/" }
    ]
  },
  {
    id: 2,
    name: "MAX STYLER",
    type: "artist",
    logo: "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/c061fb19-cd89-4509-b69e-5964ecb68552/MaxStyler-Logo-textured-white.png",
    video: "https://www.metatone.com/s/MS-Final.mp4", // Video for hover
    images: [
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/43d7ad7d-86e1-4f9d-9a2a-0bb3300ba4d3/25.07.29_MAXSTYLERPRESS_FINALS-3+%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/43d7ad7d-86e1-4f9d-9a2a-0bb3300ba4d3/25.07.29_MAXSTYLERPRESS_FINALS-3+%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/43d7ad7d-86e1-4f9d-9a2a-0bb3300ba4d3/25.07.29_MAXSTYLERPRESS_FINALS-3+%281%29.jpg"
    ],
    socials: [
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/maxstyler/" },
      { icon: "custom-x", link: "https://twitter.com/maxstyler" },
      { icon: "fa-brands fa-soundcloud", link: "https://soundcloud.com/maxstyler" }
    ]
  },
  
  // --- ROW 2 ---
  {
    id: 3,
    name: "RANGER TRUCCO",
    type: "artist",
    logo: "https://images.squarespace-cdn.com/content/v1/619714660b917e781ecc2179/70f9366e-a63f-44c2-a347-fbcc523b5fdb/RANGER_TRUCCO_SECOND_LOGO_WHITE.png",
    images: [
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/f00e6757-87b4-46b8-8695-d1eacb075b34/2025.05.12+Ranger+Summer+Press+Pics+Day+2_0036.jpg?content-type=image%2Fjpeg",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/33cd641c-b406-482b-a810-dddd49e81060/2025.05.12+Ranger+Summer+Press+Pics+Day+3_0003.jpg?format=500w",
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/f00e6757-87b4-46b8-8695-d1eacb075b34/2025.05.12+Ranger+Summer+Press+Pics+Day+2_0036.jpg?content-type=image%2Fjpeg"
    ],
    socials: [
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/rangertrucco/" },
      { icon: "custom-x", link: "https://twitter.com/djrangertrucco" },
      { icon: "fa-brands fa-soundcloud", link: "https://soundcloud.com/ranger-trucco" }
    ]
  },
  {
    id: 4,
    name: "LAYTON GIORDANI",
    type: "artist",
    logo: "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/d8960cd3-5227-4492-95ce-567a1a7ec940/LG-LOGO-TEXT-WHT-TRANSPARENT+%281%29.png?content-type=image%2Fpng",
    images: [
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/7053521b-897d-4d11-8496-c1b911310d9d/Layton+Giordani_1+%281%29.jpg?content-type=image%2Fjpeg",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/08ae71a9-93da-4eec-9e83-50ad85e7a1eb/Layton+Giordani_2.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/7053521b-897d-4d11-8496-c1b911310d9d/Layton+Giordani_1+%281%29.jpg?content-type=image%2Fjpeg"
    ],
    socials: [
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/laytongiordani/" },
      { icon: "custom-x", link: "https://twitter.com/LaytonGiordani" },
      { icon: "fa-brands fa-facebook", link: "https://www.facebook.com/LaytonGiordani" },
      { icon: "fa-brands fa-soundcloud", link: "https://soundcloud.com/laytongiordani" }
    ]
  },

  // --- ROW 3 ---
  {
    id: 5,
    name: "EXPERTS ONLY",
    type: "label",
    logo: "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/819cec99-c7ca-4dff-87d0-9c4fff5a7270/EO_LOGO_INLINE_WITHICON_LIGHT.png?content-type=image%2Fpng",
    images: [
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/3eb9f92b-2d19-43d5-8a26-efe2162ea511/EOF2025_0921_212712-3079_ALIVE-2.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/5ac1952f-0cad-4a22-8fde-b52433f899a5/25.09.20_EOF25_SATURDAY_%40isayhah_140.jpg?format=1500w"
    ],
    socials: [
      { icon: "fa-solid fa-globe", link: "https://www.expertsonlyrecs.com/" },
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/expertsonly/" },
      { icon: "custom-x", link: "https://twitter.com/expertsonly_" },
      { icon: "fa-brands fa-tiktok", link: "https://www.tiktok.com/@expertsonlyrecs" },
      { icon: "fa-brands fa-facebook", link: "https://www.facebook.com/expertsonlyrec" },
      { icon: "fa-brands fa-youtube", link: "https://www.youtube.com/@expertsonly" },
      { icon: "fa-brands fa-soundcloud", link: "https://soundcloud.com/expertsonly" }
    ]
  },
  {
    id: 6,
    name: "NATURAL RANGE",
    type: "label",
    logo: "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/69447352-d081-497e-a137-2e4374bfbbea/Range.logo_WHITE.png?format=1500w",
    images: [
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/0b154203-cc8f-48dd-95c3-cefe140f0018/Range.jpg",
      "https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/aefa5b0b-80ec-4a0b-8cba-6995d1fcee2e/000490860038_%23%23%23.jpg"
    ],
    socials: [
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/range.label/" },
      { icon: "fa-brands fa-youtube", link: "https://www.youtube.com/@naturalrange" }
    ]
  },

  // --- ROW 4 ---
  {
    id: 7,
    name: "NU MODA",
    type: "label",
    logo: "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/20ac2c3f-d9bd-45a1-80e8-9be7b2917751/NuModaLogo.png?content-type=image%2Fpng",
    images: [
      "https://images.squarespace-cdn.com/content/68e4c49925870a6e37fa03fc/1fae02df-b6ed-4494-a58d-35cee4f141d2/HOMESCREEN+STATIC.jpg?content-type=image%2Fjpeg",
      "https://images.squarespace-cdn.com/content/68e4c49925870a6e37fa03fc/1fae02df-b6ed-4494-a58d-35cee4f141d2/HOMESCREEN+STATIC.jpg?content-type=image%2Fjpeg"
    ],
    socials: [
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/numodarecords/" },
      { icon: "custom-x", link: "https://x.com/numodarecords" },
      { icon: "fa-brands fa-tiktok", link: "https://www.tiktok.com/@numodarecords" },
      { icon: "fa-brands fa-facebook", link: "https://www.facebook.com/numodarecords" }
    ]
  },
  {
    id: 8,
    name: "MAD MINDS",
    type: "label",
    logo: "https://images.squarespace-cdn.com/content/v1/68911b4bf0a541785ed58c38/1eb3e8ca-61b6-4a89-93bc-495f88b956fe/LOGO+TYPE_+WHITE+%28TRANSPARENT%29.png?format=1500w",
    images: [
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/e739fad0-da22-4505-933b-6b932b34b049/MADMINDS+COMBINED+%28HORIZONTAL%29.jpg?content-type=image%2Fjpeg",
      "https://images.squarespace-cdn.com/content/61022155cc16ca349d135a60/e739fad0-da22-4505-933b-6b932b34b049/MADMINDS+COMBINED+%28HORIZONTAL%29.jpg?content-type=image%2Fjpeg"
    ],
    socials: [
      { icon: "fa-brands fa-soundcloud", link: "https://soundcloud.com/madmindsnyc" },
      { icon: "fa-brands fa-instagram", link: "https://www.instagram.com/madmindsnyc/" },
      { icon: "custom-x", link: "https://x.com/MAD_MINDS_NYC" }
    ]
  }
];

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: any }) => {  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <img 
        src="https://static1.squarespace.com/static/61022155cc16ca349d135a60/t/611d7975c9d6c87f38fbbedf/1629321589702/Logo+Glitch+Intro+Animation+Large.gif" 
        alt="Loading" 
        className="w-full h-full object-cover md:object-contain"
      />
    </div>
  );
};

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-10 md:py-6 mix-blend-exclusion text-white pointer-events-none">
      <div className="flex items-center gap-2 group pointer-events-auto cursor-pointer">
        <div className="relative h-8 md:h-12 w-auto">
           <img 
             src="https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/b62529ee-f802-4ad1-ae82-fed5b1f6ae0f/Metatone+Artist+and+DJ+Management+-+Logo.png?format=1500w" 
             alt="Metatone Logo" 
             className="h-full w-auto object-contain brightness-0 invert" 
           />
        </div>
      </div>

      <div className="pointer-events-auto flex items-center gap-6">
        {/* Metatone Socials */}
        <div className="hidden sm:flex items-center gap-6 text-white">
          <a href="https://www.instagram.com/metatonemgmt/" target="_blank" rel="noopener noreferrer" className="hover:text-[#cf0110] hover:scale-110 transition-all duration-300">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <a href="https://x.com/metatonemgmt" target="_blank" rel="noopener noreferrer" className="hover:text-[#cf0110] hover:scale-110 transition-all duration-300 flex items-center">
            <XLogo />
          </a>
          <a href="https://www.facebook.com/metatonemgmt" target="_blank" rel="noopener noreferrer" className="hover:text-[#cf0110] hover:scale-110 transition-all duration-300">
            <i className="fa-brands fa-facebook text-xl"></i>
          </a>
          <a href="https://open.spotify.com/user/bodhicollective?si=6099b68d6b1344b0" target="_blank" rel="noopener noreferrer" className="hover:text-[#cf0110] hover:scale-110 transition-all duration-300">
            <i className="fa-brands fa-spotify text-xl"></i>
          </a>
          <a href="https://soundcloud.com/metatonemgmt" target="_blank" rel="noopener noreferrer" className="hover:text-[#cf0110] hover:scale-110 transition-all duration-300">
            <i className="fa-brands fa-soundcloud text-xl"></i>
          </a>
        </div>
        
        {/* Sophisticated Contact Button */}
        <a 
          href="mailto:contact@metatone.com" 
          className="group relative px-10 py-3 overflow-hidden rounded-full border border-white/20 bg-transparent hover:border-[#cf0110] transition-colors duration-300"
        >
          {/* Red Fill Effect */}
          <span className="absolute inset-0 bg-[#cf0110] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
          {/* Text */}
          <span className="relative font-mono font-bold text-sm uppercase tracking-[0.2em] text-white transition-all duration-300 group-hover:tracking-[0.25em]">
            Contact
          </span>
        </a>
      </div>
    </nav>
  );
};

const GridItem = ({ item }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [rotations, setRotations] = useState<number[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.images) {
      setRotations(item.images.map(() => Math.random() * 6 - 3));
    }
  }, [item.images]);

  useEffect(() => {
    // MAX STYLER LOGIC (Preserved)
    if (item.video) {
      if (isHovering && item.images) {
        intervalRef.current = setInterval(() => {
          setImageIndex((prev) => (prev + 1) % item.images.length);
        }, 200);
        
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.log("Video play failed", e));
        }
      } else {
        clearInterval(intervalRef.current);
        setImageIndex(0);
        
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }
    } 
    // ALL OTHER TILES (Simple Swap Logic)
    else {
      // Clean up intervals if any (just in case)
      clearInterval(intervalRef.current);
      
      if (isHovering && item.images && item.images.length > 1) {
        // Switch to Alternate Image
        setImageIndex(1);
      } else {
        // Revert to Original Image
        setImageIndex(0);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovering, item.images, item.video]);

  return (
    <div 
      className={`relative group h-[500px] md:h-[600px] bg-[#111] overflow-hidden border border-white/10 md:col-span-1`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none"></div>

      {/* Video Background Layer (For Max Styler) */}
      {item.video && (
        <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <video 
            ref={videoRef}
            src={item.video}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      )}

      {/* Image Stack (Hidden if video is playing on hover) */}
      <div className={`absolute inset-0 w-full h-full p-4 md:p-8 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.02] ${item.video && isHovering ? 'opacity-0' : 'opacity-100'}`}>
         {item.images.map((img, idx) => (
           <div 
            key={idx}
            className={`absolute inset-0 md:inset-4 bg-cover bg-center transition-all duration-300 ease-out shadow-2xl ${
              idx === imageIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95'
            }`}
            style={{ 
              backgroundImage: `url(${img})`,
              filter: 'none', 
              transform: isHovering && idx === imageIndex 
                ? `rotate(${rotations[idx]}deg) scale(1.05)` 
                : `rotate(0deg) scale(1)`
            }}
           >
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
             {item.type === 'label' && (
                <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
             )}
           </div>
         ))}
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
        {/* Top Right Arrow */}
        <div className="flex justify-between items-start w-full">
           {/* Pill - Only for Labels */}
           {item.type === 'label' ? (
              <span className="bg-white text-black text-[10px] font-bold uppercase px-2 py-1 tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
                RECORD LABEL
              </span>
           ) : (
             <div></div> 
           )}
           
           <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center shadow-lg">
              <ArrowUpRight size={24} strokeWidth={2.5} />
           </div>
        </div>

        {/* Center: Logo or Name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center flex items-center justify-center">
          {item.logo ? (
             <img 
               src={item.logo} 
               alt={item.name} 
               className="max-w-[80%] max-h-[120px] object-contain opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 drop-shadow-2xl"
             />
          ) : (
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 blur-sm group-hover:blur-0 mix-blend-difference">
               {item.name}
             </h2>
          )}
        </div>
      </div>

      {/* Permanent Info Bar */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md border-t border-white/10 p-4 md:p-6 flex justify-between items-end translate-y-[0%] transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none text-white mb-1 group-hover:text-transparent group-hover:stroke-text transition-all duration-300">
            {item.name}
          </h2>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 pointer-events-auto">
          {item.socials.map((social, index) => (
            <a 
              key={index} 
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 md:w-10 md:h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-sm"
            >
              {/* Check for custom SVG icon vs FontAwesome class */}
              {social.icon === "custom-x" ? <XLogo /> : <i className={social.icon}></i>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Ref for the grid section
  const gridRef = useRef(null);
  
  // Scroll handler
  const scrollToGrid = () => {
    gridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Inject FontAwesome
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#333] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Space+Mono:wght@400;700&display=swap');
        
        .stroke-text {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
        
        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #050505;
        }
      `}</style>

      {/* Intro Glitch */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Global Grain Overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <Navigation />

      <main className="relative pt-32 pb-20 px-4 md:px-6 max-w-[1800px] mx-auto">
        
        {/* Hero Section - Animated Logo & Scroll Button */}
        <div className="mb-24 flex flex-col items-center justify-center py-10 md:py-20 min-h-[60vh]">
           <img 
             src="https://images.squarespace-cdn.com/content/v1/61022155cc16ca349d135a60/1629321372550-BC2TRO43T2BY0WT967S5/Metatone+DJ+and+Artist+Management+-+Logo+Glitch+Large.gif?format=2500w" 
             alt="Metatone Animation" 
             className="w-full max-w-4xl object-contain mix-blend-screen mb-12" 
           />
           
           {/* View Roster Scroll Button */}
           <button 
             onClick={scrollToGrid}
             className="group flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-500"
           >
             <span className="font-mono text-xs uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500">View Roster</span>
             <ChevronDown className="w-6 h-6 animate-bounce mt-2 text-[#cf0110]" />
           </button>
        </div>

        {/* The Grid: 2 Columns */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-28">
           {ITEMS.map(item => (
             <GridItem key={item.id} item={item} />
           ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10 mt-20 bg-black">
        <div className="max-w-[1800px] mx-auto flex flex-col items-center justify-center text-center gap-6">
          <p className="font-mono text-xs uppercase text-neutral-500 tracking-widest">
             Location: Phoenix, AZ
          </p>
          <div className="h-px w-10 bg-white/20"></div>
          <p className="font-mono text-xs uppercase text-neutral-600 tracking-wider">
             © 2026 Metatone Management, LLC. All Rights Reserved &nbsp;●&nbsp; Website crafted by: Minimist
          </p>
        </div>
      </footer>
    </div>
  );
}