import { HiStar } from 'react-icons/hi';

function RatingBadge({ rating, voteCount = null }) {
  return (
    <div className='flex gap-2 text-sm'>
      <div className='flex items-center'>
        <HiStar fontSize={20} className='text-amber-400' />
        <span>{rating}</span>
      </div>
      {voteCount && <span>({voteCount}k)</span>}
    </div>
  );
}

export default RatingBadge;
