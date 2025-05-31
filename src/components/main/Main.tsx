/* Componentes React */
import CreateMainItem from './utils/CreateMainItem'
import CreateRecommendation from './utils/CreateRecommendation'
import CreateArtist from './utils/CreateArtist'

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
import daily_mix_1 from '@assets/images/recommendations/daily_mix_1.webp'
import dreamstate from '@assets/images/recommendations/dreamstate.webp'
import november8AndYourEyes from '@assets/images/recommendations/november_8_your_eyes.webp'
import rainInside from '@assets/images/recommendations/rain_inside.webp'
import schoolRooftop from '@assets/images/recommendations/school_rooftop.webp'
import youNotTheSame from '@assets/images/recommendations/you_not_the_same.webp'
import analogueWinter from '@assets/images/recommendations/analogue_winter.webp'
import snowDream from '@assets/images/recommendations/snow_dream.webp'

/* Imagens de artistas */
import leadwave from '@assets/images/artists/leadwave.webp'
import oneheart from '@assets/images/artists/oneheart.webp'
import aVow from '@assets/images/artists/a_vow.webp'
import antent from '@assets/images/artists/antent.webp'

/* Pegando a hora atual para mostrar a saudação para o usuário */
const data = new Date()
const hours = data.getHours()


export default function Main() {
  return (
    <main className='flex-[97%] mr-2 p-6 rounded-lg bg-[#121212] overflow-auto'>

      {/* Parte dos itens, mostrando as playlists mais tocadas e os artistas mais ouvidos */}
      <h1 className='mb-3 text-xl font-bold text-zinc-300'>Playlists e artistas mais ouvidos</h1>
      <section className="grid grid-cols-4 grid-rows-2 gap-3 flex-wrap w-full text-md text-zinc-300 font-bold">
        <CreateMainItem image={programmingDeepFocus} title='Programming 🖥️ - Deep Focus' />
        <CreateMainItem image={programmingAndCodingLofi} title='Programming and Coding Lofi Hip-Hop' />
        <CreateMainItem image={codingMode} title='Coding Mode' />
        <CreateMainItem image={melancholySadMix} title='Melancholy Sad Mix' />
        <CreateMainItem image={binauralBeats} title='40 Hz Binaural Beats 🧠' />
        <CreateMainItem image={classicalMusicStudySleep} title='classical music to study or sleep to' />
        <CreateMainItem image={danielMp3} title='daniel.mp3' />
        <CreateMainItem image={jazzVibes} title='Chill Jazz Vibes 🎷 mellow jazz beats & jazzhop' />
      </section>

      {/* Parte das novas músicas, que não necessariamente tem muito a ver com o usuário (por mais que eu tenha tentado buscar isso) */}
      <section className='mt-10'>
        <h1 className='text-2xl font-bold text-zinc-300'>
          {hours >= 0 && hours < 4 ? 'Boa madrugada, usuário!' : hours < 12 ? 'Bom dia, usuário!' : hours >= 12 && hours < 18 ? 'Boa tarde, usuário!' : 'Boa noite, usuário!'}
        </h1>

        <div className='flex gap-4 mt-4'>
          <CreateRecommendation image={daily_mix_1} title='' desc='Øneheart, ghxsted., my head is empty e mais' />
          <CreateRecommendation image={dreamstate} title='dreamstate' desc='suffershade' />
          <CreateRecommendation image={november8AndYourEyes} title='november 8' desc='reidenshi' />
          <CreateRecommendation image={rainInside} title='rain inside' desc='Øneheart, Antent' />
          <CreateRecommendation image={schoolRooftop} title='School Rooftop' desc='Hisohkah' />
          <CreateRecommendation image={youNotTheSame} title='you not the same (deep version)' desc='TileKid' />
          <CreateRecommendation image={analogueWinter} title='analogue winter' desc='.diedlonely' />
          <CreateRecommendation image={november8AndYourEyes} title='Your Eyes' desc='Antent' />
          <CreateRecommendation image={snowDream} title='snow dream' desc='Imnl' />
        </div>
      </section>

      {/* Parte dos artistas favoritos */}
      <section className='mt-24'>
        <h1 className='text-2xl text-zinc-300 font-bold'>Seus artistas favoritos</h1>

        <div className='flex gap-10'>
          <CreateArtist image={leadwave} title='leadwave' />
          <CreateArtist image={oneheart} title='Øneheart' />
          <CreateArtist image={danielMp3} title='daniel.mp3' />
          <CreateArtist image={aVow} title='a vow' />
          <CreateArtist image={antent} title='Antent' />
        </div>
      </section>
    </main>
  )
};
