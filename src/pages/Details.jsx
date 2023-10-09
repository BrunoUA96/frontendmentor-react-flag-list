import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import { searchByCountry } from '@/config';
import { Button } from '@components/details/Button';
import { Info } from '@components/details/Info';
import axios from 'axios';

export const Details = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Back
      </Button>
      {country && <Info {...country} />}
    </div>
  );
};
