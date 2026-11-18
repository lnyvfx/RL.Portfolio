/* ============================================================
   projects.js : données partagées par index.html et project.html
   Champs d'un projet :
     id        ID YouTube de la vidéo (obligatoire)
     title, type ("solo" | "duo" | "team"), label, desc  (obligatoires)
     long      description détaillée affichée sur la page du projet
               (sinon "desc" est utilisée ; \n = retour à la ligne)
     download  lien DIRECT vers le fichier complet du projet (affiche le bouton "Download full project file")
     buy, price  (optionnel) projet VENDU : buy:"https://xxx.gumroad.com/l/xxxx", price:"10 €"
                 -> le projet apparaît dans Shop avec un bouton "Buy". buy:"" = bouton grisé en attendant le lien
     team      clé d'une team (voir "teams" plus bas) ou nom libre ; affiché seulement si renseigné
     year, role, tools:["Blender", ...]   (optionnels, petites pastilles)
     big:true   (breakdown) vidéo plus grande
     right:true (breakdown) vidéo à droite, texte à gauche
     pair:[{src, poster, title, desc}, {...}] (breakdown) deux petites vidéos côte à côte à droite, texte principal à gauche
     newEffect:true (breakdown) ligne de séparation encadrée avant ce breakdown (nouvel effet)
     texture:{img, title, desc}  (breakdown) petite image + texte sous le texte de la vidéo
     stack:true (breakdown) texte plus petit au-dessus de la vidéo, à droite
     start      (vidéo seule) seconde de départ, pour sauter une intro : start:2.5
     breakdown:[
       {kind:"vfx", title:"Smoke & particles", desc:"...", yt:"ID_YOUTUBE"},
       {kind:"3d",  title:"Wireframe", desc:"...", src:"breakdowns/x.mp4", poster:"breakdowns/x.jpg"},
       {kind:"3d",  title:"Render passes", img:"breakdowns/x.jpg"},
       {kind:"3d",  title:"Avant / après", desc:"...", before:"breakdowns/x_avant.mp4", src:"breakdowns/x_apres.mp4"}   // avant / après (curseur à glisser), vidéos d'origine
     ]
   ============================================================ */
/* Teams : le champ  team:"nixus"  d'un projet pointe vers une entrée ci-dessous.
   (un nom libre, ex. team:"RLFX", affiche juste le nom sans logo ni réseaux) */
const teams = {
  nixus: {
    name: "Team Nixus", logo: "logos/nixus.png",
    tiktok:  "https://www.tiktok.com/@teamnixusrl",
    youtube: "https://www.youtube.com/@TeamNixus",
    x:       "https://x.com/TeamNixus"
  },
  mih: {
    name: "Made In Heaven", logo: "logos/mih.png",
    tiktok:  "https://www.tiktok.com/@madeinheavenrl",
    youtube: "https://www.youtube.com/@MadeInHeavenRL",
    x:       "https://x.com/madeinheavenfx",
    // vidéos de la team affichées dans "My teams" (ouvrent YouTube) ; title:"" = "Watch on YouTube"
    videos: [
      {id:"YKIO_dswgPI", title:"Keep Me Going"},
      {id:"PkEF7p19O64", title:"Made In Heaven"}
    ]
  },
  soul: {
    name: "Team Soul", logo: "logos/soul.png",
    tiktok:  "https://www.tiktok.com/@team_soul_rl1",
    youtube: "https://www.youtube.com/@TeamSoulrl",
    x:       "https://x.com/teamsoulrl",
    videos: [
      {id:"n4Fp4iKFTws", title:"INVERSION"}
    ]
  },
};

const projects = [
  {id:"RL5rxCky1cA", title:"Echo Chamber", type:"team", label:"Team project", team:"nixus",
   desc:"The Team Nixus halloween special 2026.",
   buy:"https://lynvex.gumroad.com/l/echo-chamber-mypart", price:"8 €",
   breakdown:[
     {kind:"3d", title:"Backroom effect", desc:"how I managed to recreate the Backrooms aesthetic in Blender and mix it with assets from Rocket League",
      before:"breakdowns/backroom_avant.mp4", beforePoster:"breakdowns/backroom_avant.jpg",
      src:"breakdowns/backroom_apres.mp4", poster:"breakdowns/backroom_apres.jpg"},
     {kind:"3d", title:"Backroom effect, full breakdown", desc:"3D models setup · Rendered in Cycles (Blender) · VHS effect composited in After Effects",
      src:"breakdowns/Breakdown_1_EchoChamber.mp4", poster:"breakdowns/Breakdown_1_EchoChamber.jpg"},
     {kind:"3d", title:"Camera tracking", newEffect:true,
      desc:"The real shot is tracked to recreate a virtual camera in Blender, so the 3D scene follows the footage with the exact same perspective and movement.",
      pair:[
        {src:"breakdowns/echo_track_checker.mp4", poster:"breakdowns/echo_track_checker.jpg", title:"Checker render",
         desc:"The tracked camera rendered with a checker texture, to clearly read the perspective and the camera movement."},
        {src:"breakdowns/echo_track_points.mp4", poster:"breakdowns/echo_track_points.jpg", title:"Point cloud",
         desc:"The points recovered during tracking: a few dots in 3D space that rebuild the volumes and reliefs the tracking relied on to recreate the virtual camera."}
      ]}
   ]},
  {id:"jTG4uRBdb40", title:"Kickstart", type:"solo", label:"solo edit", team:"soul",
   desc:"A solo edit, client work for Team Soul.",
   buy:"https://lynvex.gumroad.com/l/kickstart", price:"15 €"},
  {id:"PTPKU8zK7hM", title:"Voracity", type:"duo", label:"Duo edit", team:"nixus",
   desc:"A duo edit with @Bazill blending visual effects and rhythm to showcase the gameplay.", breakdown:[
     {kind:"3d", title:"Card floor", desc:"From the Blender viewport to the final render.",
      before:"breakdowns/voracity_avant.mp4", beforePoster:"breakdowns/voracity_avant.jpg",
      src:"breakdowns/voracity_apres.mp4", poster:"breakdowns/voracity_apres.jpg"},
     {kind:"3d", title:"Card floor, after compositing", desc:"The final shot, once the render is composited.", stack:true,
      aside:{   // colonne de gauche : séquence 360° (cliquer-glisser) + texture
        scrub:{dir:"breakdowns/particles/", frames:100, start:50, title:"Camera-facing layers",
               desc:"Each glowing point is a particle: a flat 2D layer placed in 3D space. The layers always follow the camera's orientation, so they keep facing it from every angle. Drag to orbit around them."},
        texture:{img:"breakdowns/particles_texture.png", title:"Particle texture",
               desc:"One texture, multiplied across many layers with random size and rotation factors."}
      },
      src:"breakdowns/voracity_final.mp4", poster:"breakdowns/voracity_final.jpg"},
     {kind:"3d", title:"Cars hit effect", desc:"how I managed to create a cool shock effect between rocket league cars in Blender", src:"breakdowns/Breakdown_1_Voracity.mp4", poster:"breakdowns/Breakdown_1_Voracity.jpg", big:true, right:true, newEffect:true},
     {kind:"3d", title:"Sparks particle system", desc:"The spark layer is used as the instance of a Particle System, so it emits lots of sparks with adapted settings (amount, speed, lifetime, spread). Here is the spark simulation alone on a black background.",
      src:"breakdowns/voracity_sparks.mp4", poster:"breakdowns/voracity_sparks.jpg",
      texture:{img:"breakdowns/sparks_texture.png", title:"Spark texture", desc:"A single spark layer: this is the instance the Particle System emits."}}
   ]},
  {id:"z1bxOp29GUc", title:"Revolver", type:"team", label:"Team project", team:"nixus",
   desc:"A collective project where each editor brings their own style to a spooky edit."},
  {id:"r1OqFtoUvqM", title:"Nixus Christmas Special 2025", type:"team", label:"Team project", team:"nixus",
   desc:"The 2025 Christmas special, made with the Nixus team."},
  {id:"DdnWmGHrbAQ", title:"ALL IN MOTION (4K)", type:"solo", label:"Solo edit",
   desc:"A solo edit with some really good 3D improvement"},
  {id:"O6M79LWhIqY", title:"RLFX Best of France", type:"team", label:"3D intro", label:"my part", team:"RLFX",
   desc:"My parts in RLFX, the project bringing together the best French editors."},
  {id:"RAwW1-0ps9w", title:"I SEEEE YOU BABY BOI", type:"solo", label:"Solo edit",
   desc:"A solo edit, trying to be smooth and have a good pace"},
  {id:"8VCnqffQulU", title:"5ONJOUR", type:"solo", label:"Solo edit",
   desc:"A solo edit, trying a different style and different 3D techniques", breakdown:[
     {kind:"3d", title:"Car morphing effect", desc:"how I managed to create a cool car morphing effect from an octane to a fennec in Blender", src:"breakdowns/Breakdown_1_5ONJOUR.mp4", poster:"breakdowns/Breakdown_1_5ONJOUR.jpg"}
   ]}
];

// (plus utilisé : l'ancien fond animé de l'accueil a été retiré)
const bgOnly = [
  {id:"e_FYaQPYzNQ"},
  {id:"g-zf_K4XYnc"},
  {id:"ixwpaMofYTU"},
  {id:"YKIO_dswgPI"},
  {id:"PkEF7p19O64"},
  {id:"n4Fp4iKFTws"}
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
