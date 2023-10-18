import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetCountryQuery } from '@/Api/api';
import { Info } from '@components/details/Info';
import { LoadingPreview } from '@components/global/IsLoading';
import { Button } from '@components/shared';

export const Details = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const { data = [], isLoading } = useGetCountryQuery(name);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button isLink={false} onClick={navigateBack}>
        <IoArrowBack /> Back
      </Button>
      {isLoading ? <LoadingPreview /> : data.length && <Info {...data[0]} />}
    </div>
  );
};
