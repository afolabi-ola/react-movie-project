import { BiStar } from 'react-icons/bi';

function RatingBadge({ rating, voteCount = null }) {
  return (
    <div className='flex gap-2'>
      <div className='flex'>
        <BiStar fontSize={24} />
        <span className='text-xl'>{rating}</span>
      </div>
      {voteCount && <span className='text-xl'>({voteCount}k)</span>}
    </div>
  );
}

export default RatingBadge;
