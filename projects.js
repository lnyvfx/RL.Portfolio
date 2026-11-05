/* ============================================================
   projects.js : données partagées par index.html et project.html
   Champs d'un projet :
     id        ID YouTube de la vidéo (obligatoire)
     title, type ("solo" | "duo" | "team"), label, desc  (obligatoires)
     long      description détaillée affichée sur la page du projet
               (sinon "desc" est utilisée ; \n = retour à la ligne)
     team      clé d'une team (voir "teams" plus bas) ou nom libre ; affiché seulement si renseigné
     year, role, tools:["Blender", ...]   (optionnels, petites pastilles)
     breakdown:[
       {kind:"vfx", title:"Smoke & particles", desc:"...", yt:"ID_YOUTUBE"},
       {kind:"3d",  title:"Wireframe", desc:"...", src:"breakdowns/x.mp4", poster:"breakdowns/x.jpg"},
       {kind:"3d",  title:"Render passes", img:"breakdowns/x.jpg"}
     ]
   ============================================================ */
/* Teams : le champ  team:"nixus"  d'un projet pointe vers une entrée ci-dessous.
   (un nom libre, ex. team:"RLFX", affiche juste le nom sans logo ni réseaux) */
const teams = {
  nixus: {
    name: "Nixus", logo: "logos/nixus.png",
    tiktok:  "https://www.tiktok.com/@teamnixusrl",
    youtube: "https://www.youtube.com/@TeamNixus",
    x:       "https://x.com/TeamNixus"
  },
  soul: {
    name: "Team Soul", logo: "logos/soul.png",
    tiktok:  "https://www.tiktok.com/@team_soul_rl1",
    youtube: "https://www.youtube.com/@TeamSoulrl",
    x:       "https://x.com/teamsoulrl"
  }
};

const projects = [
  {id:"RL5rxCky1cA", title:"Echo Chamber", type:"team", label:"Team project", team:"nixus",
   desc:"The Team Nixus halloween special 2026.", breakdown:[
     {kind:"3d", title:"Backroom effect", desc:"how I managed to recreate the Backrooms aesthetic in Blender and mix it with assets from Rocket League", src:"breakdowns/Breakdown_1_EchoChamber.mp4", poster:"breakdowns/Breakdown_1_EchoChamber.jpg"}
   ]},
  {id:"jTG4uRBdb40", title:"Kickstart", type:"solo", label:"solo edit", team:"soul",
   desc:"A solo edit, client work for Team Soul."},
  {id:"PTPKU8zK7hM", title:"Voracity", type:"duo", label:"Duo edit", team:"nixus",
   desc:"A duo edit with @Bazill blending visual effects and rhythm to showcase the gameplay."},
  {id:"z1bxOp29GUc", title:"Revolver", type:"team", label:"Team project", team:"nixus",
   desc:"A collective project where each editor brings their own style to a spooky edit."},
  {id:"r1OqFtoUvqM", title:"Nixus Christmas Special 2025", type:"team", label:"Team project", team:"nixus",
   desc:"The 2025 Christmas special, made with the Nixus team."},
  {id:"DdnWmGHrbAQ", title:"ALL IN MOTION (4K)", type:"solo", label:"Solo edit",
   desc:"A solo edit with some really good 3D improvement"},
  {id:"5gwjbs27fx0", title:"RLFX Best of France", type:"team", label:"My part", team:"RLFX",
   desc:"My part in RLFX, the project bringing together the best French editors."},
  {id:"RAwW1-0ps9w", title:"I SEEEE YOU BABY BOI", type:"solo", label:"Solo edit",
   desc:"A solo edit, trying to be smooth and have a good pace"},
  {id:"8VCnqffQulU", title:"5ONJOUR", type:"solo", label:"Solo edit",
   desc:"A solo edit, trying a different style and different 3D techniques"}
];

// Extra thumbnails used ONLY in the hero background (not listed in Projects)
const bgOnly = [
  {id:"e_FYaQPYzNQ"},
  {id:"g-zf_K4XYnc"},
  {id:"ixwpaMofYTU"}
];

const labelOf = k => k === '3d' ? '3D' : 'VFX';

// Miniature YouTube en bonne qualité (maxres, sinon hq)
function setThumb(img, id) {
  img.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  img.addEventListener('error', () => {
    if (!img.dataset.fb) { img.dataset.fb = 1; img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }
  });
  // maxresdefault renvoie une petite image grise si absente
  img.addEventListener('load', () => {
    if (img.naturalWidth <= 120 && !img.dataset.fb) { img.dataset.fb = 1; img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }
  });
}
