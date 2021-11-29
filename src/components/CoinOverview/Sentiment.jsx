import React from 'react';
import Button from '@mui/material/Button';
import { Card, CardContainer } from '../CardElements';
import Colors from '../../styles/Colors';
import HeadlineDialog from './HeadlineDialog';
import CustomPropTypes from '../../types/CustomPropTypes';
import positiveEmoji1 from '../../media/emoji/Partying face.svg';
import positiveEmoji2 from '../../media/emoji/Smiling face with hearts.svg';
import positiveEmoji3 from '../../media/emoji/Rocket.svg';

import neutralEmoji1 from '../../media/emoji/Relieved face.svg';
import neutralEmoji2 from '../../media/emoji/Smiling face with sunglasses.svg';
import neutralEmoji3 from '../../media/emoji/Slightly smiling face.svg';

import negativeEmoji1 from '../../media/emoji/Face screaming in fear.svg';
import negativeEmoji2 from '../../media/emoji/Anxious face with sweat.svg';
import negativeEmoji3 from '../../media/emoji/Fearful face.svg';

import noDataEmoji from '../../media/emoji/Face without mouth.svg';

const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Description = function descriptionCard({ metaData, prediction }) {
  const [open, setOpen] = React.useState(false);
  const sentiment = prediction.sentiment.sentiment_value;
  let imgSrc = null;
  let text = null;
  let enoughData = true;
  if (sentiment === 'positive') {
    text = 'Positive';
    imgSrc = randomChoice([positiveEmoji1, positiveEmoji2, positiveEmoji3]);
  } else if (sentiment === 'neutral') {
    text = 'Neutral';
    imgSrc = randomChoice([neutralEmoji1, neutralEmoji2, neutralEmoji3]);
  } else if (sentiment === 'negative') {
    text = 'Negative';
    imgSrc = randomChoice([negativeEmoji1, negativeEmoji2, negativeEmoji3]);
  } else if (sentiment == null) {
    text = 'Not enough data';
    imgSrc = noDataEmoji;
    enoughData = false;
  }

  const showDialog = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <HeadlineDialog open={open} onClose={onClose} metaData={metaData} />
      <CardContainer>
        <Card variant="outlined">
          <h2 style={{
            paddingBottom: '20px',
          }}
          >
            Public Sentiment
          </h2>
          <div style={{
            paddingBottom: '20px',
            color: Colors.grey,
            fontWeight: 400,
          }}
          >
            Sentiment of news articles
          </div>

          <div style={{
            minHeight: '350px',
          }}
          >
            <div style={{ paddingTop: '20px' }}>
              <p style={{
                textAlign: 'center',
                height: '40px',
              }}
              >
                {text}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
              }}
              >
                <img
                  src={imgSrc}
                  alt={`${sentiment} emoji`}
                  style={{ width: '70%' }}
                />
              </div>
              <div style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
              >
                {(metaData && enoughData)
                  && (
                  <Button variant="contained" onClick={showDialog}>
                    Show Articles
                  </Button>
                  )}
              </div>
            </div>
          </div>
        </Card>
      </CardContainer>
    </>
  );
};

Description.propTypes = {
  prediction: CustomPropTypes.prediction.isRequired,
  metaData: CustomPropTypes.coinMetaData.isRequired,
};

export default Description;
