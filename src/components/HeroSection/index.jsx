import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import CustomPropTypes from '../../types/CustomPropTypes';
import Button from '@mui/material/Button';
import { scroller } from 'react-scroll';
import Video from '../../media/video.mp4';
import Colors from '../../styles/Colors';

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from './HeroElements';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: Colors.white,
    '& fieldset': {
      borderColor: Colors.white,
    },
    '&:hover fieldset': {
      borderColor: Colors.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: Colors.primary,
    },
  },
  '& .MuiInputLabel-root': {
    color: Colors.grey,
  },
});

const StyledPopper = styled(Popper)({
  "& .MuiAutocomplete-listbox": {
    "& :hover": {
      color: Colors.primary,
    }
  },
});

const HeroSection = function heroSectionElement({ predictions }) {
  const [hover, setHover] = useState(false);

  const history = useHistory();

  function push(coin) {
    history.push(`/predictions/${coin}`);
  }

  const predictionArray = predictions 
    ? Object.keys(predictions).map((key) => predictions[key])
    : null;

  const onHover = () => {
    setHover(!hover);
  };

  const scrollBehavior = () => {
    scroller.scrollTo('about', {
      duration: 500,
      smooth: true,
      offset: 0,
      spy: true,
    });
  };

  const filter = (options, { inputValue }) => predictionArray
    ? (predictionArray.filter((it) => (
      it.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) 
      || it.ticker.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))
    ).map((it) => it.name))
    : [];

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Cryptocurrency made easy.</HeroH1>
        <HeroP>
          Find out which coins to buy. With simple graphs and price predictions.
        </HeroP>
        <Autocomplete
          onChange={(event, newValue) => {
            const predictionData = predictionArray.filter((it) => (it.name === newValue))?.[0];
            if (predictionData != null) {
              push(predictionData.coin_id);
            }
          }}
          PopperComponent={StyledPopper}
          style={{margin: '20px 0 0', width: '90%', maxWidth: '500px'}}
          id="free-solo-demo"
          loading={(predictionArray == null)}
          freeSolo
          options={predictionArray ? predictionArray.map((predictionData) => predictionData.name) : []}
          filterOptions={filter}
          renderInput={(params) => (
            <CssTextField
              {...params}
              label="Search predictions" 
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {predictionArray ? null : <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <HeroBtnWrapper>
          <Button
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            variant="contained"
            onClick={scrollBehavior}
          >
            Explore
            {' '}
            {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

HeroSection.propTypes = {
  predictions: CustomPropTypes.predictions,
};

HeroSection.defaultProps = {
  predictions: null,
};


export default HeroSection;
