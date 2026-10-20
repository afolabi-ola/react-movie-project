import { getImageUrl } from '../../constants';
import HeadingText from '../ui/HeadingText';

function Gallery({ gallery }) {
  return (
    <section>
      <HeadingText heading={'From the production'} subHeading={'Gallery'} />

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {gallery.map((image) => (
          <img
            key={image.file_path}
            src={getImageUrl(image.file_path, 'original')}
            alt=''
            className='aspect-video w-full rounded-2xl object-cover'
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
