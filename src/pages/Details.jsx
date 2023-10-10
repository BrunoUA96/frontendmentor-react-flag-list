import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import { searchByCountry } from '@/config';
import { Info } from '@components/details/Info';
import { Button } from '@components/shared';
import axios from 'axios';

export const Details = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const navigateBack = () => {
    navigate(-1);
  };

  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <Button isLink={false} onClick={navigateBack}>
        <IoArrowBack /> Back
      </Button>
      {country && <Info {...country} />}
    </div>
  );
};
