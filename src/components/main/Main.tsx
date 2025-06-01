import { useState } from 'react'

/* Componentes React */
import CreateMainItems from './utils/CreateMainItems'
import CreateRecommendations from './utils/CreateRecommendations'
import CreateArtists from './utils/CreateArtists'

/* Imagens de músicas e playlists mais tocados*/
import programmingDeepFocus from '@assets/images/songs/programming_deep_focus.webp'
import melancholySadMix  from '@assets/images/songs/melancholy_sad_mix.webp'
import programmingAndCodingLofi from '@assets/images/songs/programming_coding_lofi_hiphop.webp'
import codingMode from '@assets/images/songs/coding_mode.webp'
import binauralBeats from '@assets/images/songs/40hz_binaural_beats.webp'
import classicalMusicStudySleep from '@assets/images/songs/classical_music_study_sleep.webp'
import danielMp3 from '@assets/images/artists/daniel_mp3.webp'
import jazzVibes from '@assets/images/songs/jazz_vibes.webp'

/* Imagens de recomendações de músicas */
import dailyMix1 from '@assets/images/recommendations/daily_mix_1.webp'
import snowfall from '@assets/images/recommendations/snowfall.webp'
import apathy from '@assets/images/recommendations/apathy.webp'
import distortedMemories from '@assets/images/recommendations/distorted_memories.webp'
import firstSnow from '@assets/images/recommendations/first_snow.webp'
import dreamstate from '@assets/images/recommendations/dreamstate.webp'
import november8 from '@assets/images/recommendations/november_8.webp'
import rainInside from '@assets/images/recommendations/rain_inside.webp'
import youNotTheSame from '@assets/images/recommendations/you_not_the_same.webp'
import analogueWinter from '@assets/images/recommendations/analogue_winter.webp'
import snowDream from '@assets/images/recommendations/snow_dream.webp'
import yourEyes from '@assets/images/recommendations/your_eyes.webp'
import oneWish from '@assets/images/recommendations/one_wish.webp'
import schoolRooftop from '@assets/images/recommendations/school_rooftop.webp'

/* Imagens de artistas */
import oneheart from '@assets/images/artists/oneheart.webp'
import reidenshi from '@assets/images/artists/reidenshi.webp'
import antent from '@assets/images/artists/antent.webp'
import leadwave from '@assets/images/artists/leadwave.webp'
import aVow from '@assets/images/artists/a_vow.webp'
import myHeadIsEmpty from '@assets/images/artists/my_head_is_empty.webp'
import potsu from '@assets/images/artists/potsu.webp'
import austinFarwell from '@assets/images/artists/austin_farwell.webp'


/* Itens */
export type MainItemType = {
  image: string
  title: string
}
const items: Record<string, MainItemType> = {
  programmingDeepFocus: {
    image: programmingDeepFocus,
    title: 'Programming 🖥️ - Deep Focus'
  },
  programmingAndCodingLofi: {
    image: programmingAndCodingLofi,
    title: 'Programming and Coding Lofi Hip-Hop'
  },
  codingMode: {
    image: codingMode,
    title: 'Coding Mode'
  },
  melancholySadMix: {
    image: melancholySadMix,
    title: 'Melancholy Sad Mix'
  },
  binauralBeats: {
    image: binauralBeats,
    title: '40 Hz Binaural Beats 🧠'
  },
  classicalMusicStudySleep: {
    image: classicalMusicStudySleep,
    title: 'classical music to study or sleep to'
  },
  danielMp3: {
    image: danielMp3,
    title: 'daniel.mp3'
  },
  jazzVibes: {
    image: jazzVibes,
    title: 'Chill Jazz Vibes 🎷 mellow jazz beats & jazzhop'
  },
}

/* Recomendações */
export type RecommendationType = {
  image: string
  title: string
  desc: string
}
const recommendations: Record<string, RecommendationType> = {
  dailyMix1: {
    image: dailyMix1,
    title: '',
    desc: 'Øneheart, reidenshi, my head is empty e mais'
  },
  snowfall: {
    image: snowfall,
    title: 'snowfall',
    desc: 'Øneheart, reidenshi'
  },
  apathy: {
    image: apathy,
    title: 'apathy',
    desc: 'Øneheart'
  },
  distortedMemories: {
    image: distortedMemories,
    title: 'distorted memories',
    desc: 'Øneheart, reidenshi'
  },
  firstSnow: {
    image: firstSnow,
    title: 'first snow',
    desc: 'Antent'
  },
  dreamstate: {
    image: dreamstate,
    title: 'dreamstate',
    desc: 'suffershade'
  },
  november8: {
    image: november8,
    title: 'november 8',
    desc: 'reidenshi'
  },
  rainInside: {
    image: rainInside,
    title: 'rain inside',
    desc: 'Øneheart, Antent'
  },
  youNotTheSame: {
    image: youNotTheSame,
    title: 'you not the same (deep version)',
    desc: 'TileKid'
  },
  analogueWinter: {
    image: analogueWinter,
    title: 'analogue winter',
    desc: '.diedlonely'
  },
  snowDream: {
    image: snowDream,
    title: 'snow dream',
    desc: 'Imnl'
  },
  yourEyes: {
    image: yourEyes,
    title: 'Your Eyes',
    desc: 'Antent'
  },
  oneWish: {
    image: oneWish,
    title: 'one wish',
    desc: 'Unnholy'
  },
  schoolRooftop: {
    image: schoolRooftop,
    title: 'School Rooftop',
    desc: 'Hisohkah'
  },
}

/* Artistas Favoritos */
export type ArtistType = {
  image: string
  title: string
}
const artists: Record<string, ArtistType> = {
  oneheart: {
    image: oneheart,
    title: 'Øneheart'
  },
  reidenshi: {
    image: reidenshi,
    title: 'reidenshi'
  },
  antent: {
    image: antent,
    title: 'Antent'
  },
  leadwave: {
    image: leadwave,
    title: 'leadwave'
  },
  danielMp3: {
    image: danielMp3,
    title: 'daniel.mp3'
  },
  aVow: {
    image: aVow,
    title: 'a vow'
  },
  myHeadIsEmpty: {
    image: myHeadIsEmpty,
    title: 'my head is empty'
  },
  potsu: {
    image: potsu,
    title: 'potsu'
  },
  austinFarwell: {
    image: austinFarwell,
    title: 'Austin Farwell'
  },
}

/* Pegando a hora atual para mostrar a saudação para o usuário */
const data = new Date()
const hours = data.getHours()


export default function Main() {
  const mainDefaultClasses = 'flex-[97%] mr-2 p-6 rounded-lg bg-[#121212] overflow-x-hidden overflow-y-auto'
  const [mainClasses, setMainClasses] = useState<string>(mainDefaultClasses)
  
  const recommendationsDefaultClasses = 'flex gap-4 w-full mt-4 pb-2 overflow-x-auto overflow-y-hidden'
  const [recommendationsClasses, setRecommendationsClasses] = useState<string>(recommendationsDefaultClasses)

  const artistsDefaultClasses = 'flex gap-10 w-full overflow-x-auto overflow-y-hidden'
  const [artistsClasses, setArtistsClasses] = useState<string>(artistsDefaultClasses)

  return (
    /* O main vai receber o styling de input.css. Isso vai fazer com que a cor da barra lateral fique escura */
    <main 
      onPointerOver={ () => setMainClasses(mainDefaultClasses + ' main-is-hovering')}
      onPointerLeave={ () => setMainClasses(mainDefaultClasses) }
      className={mainClasses}
    >

      {/* Parte dos itens, mostrando as playlists mais tocadas e os artistas mais ouvidos */}
      <h1 className='mb-3 text-xl font-bold text-zinc-300'>Playlists e artistas mais ouvidos</h1>
      <section className="grid grid-cols-4 grid-rows-2 gap-3 flex-wrap w-full text-md text-zinc-300 font-bold">
        <CreateMainItems items={items} />
      </section>

      {/* Parte das recomendações de músicas */}
      <section className='mt-10'>
        <h1 className='text-2xl font-bold text-zinc-300'>
          {hours >= 0 && hours < 4 ? 'Boa madrugada, usuário!' : hours < 12 ? 'Bom dia, usuário!' : hours >= 12 && hours < 18 ? 'Boa tarde, usuário!' : 'Boa noite, usuário!'}
        </h1>

        <div 
          onPointerOver={ () => setRecommendationsClasses(recommendationsDefaultClasses + ' recommendations-is-hovering') }
          onPointerLeave={ () => setRecommendationsClasses(recommendationsDefaultClasses) }
          className={recommendationsClasses}
        >
          <CreateRecommendations recommendations={recommendations} />
        </div>
      </section>

      {/* Parte dos artistas favoritos */}
      <section className='mt-8'>
        <h1 className='text-2xl text-zinc-300 font-bold'>Seus artistas favoritos</h1>

        <div 
          onPointerOver={ () => setArtistsClasses(artistsDefaultClasses + ' artists-is-hovering') }
          onPointerLeave={ () => setArtistsClasses(artistsDefaultClasses) }
          className={artistsClasses}>
          <CreateArtists artists={artists} />
        </div>
      </section>
    </main>
  )
};
