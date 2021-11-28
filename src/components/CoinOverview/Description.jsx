import React from 'react';
import Button from '@mui/material/Button';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const Description = function descriptionCard({ metaData }) {
  return (
    <CardContainer style={{ maxWidth: '680px' }}>
      <Card variant="outlined">
        <h2 style={{
          paddingBottom: '20px',
        }}
        >
          Description
        </h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          General information
        </div>

        <div style={{
          minHeight: '350px',
        }}
        >
          {metaData == null ? (
            <p style={{
              textAlign: 'center',
              lineHeight: '350px',
            }}
            >
              Loading...
            </p>
          ) : (
            <div>
              <div style={{
                paddingBottom: '20px',
                color: Colors.grey,
                fontWeight: 400,
                lineHeight: '2rem',
              }}
              >
                {metaData.description}
              </div>
              <div>
                {metaData.website
                                    && (
                                    <Button
                                      target="_blank"
                                      size="small"
                                      style={{ margin: '10px' }}
                                      variant="outlined"
                                      color="black"
                                      href={metaData.website}
                                    >
                                      Website
                                    </Button>
                                    )}
                {metaData.technical_doc
                                    && (
                                    <Button
                                      target="_blank"
                                      size="small"
                                      style={{ margin: '10px' }}
                                      variant="outlined"
                                      color="black"
                                      href={metaData.technical_doc}
                                    >
                                      Technical Documentation
                                    </Button>
                                    )}
                {metaData.source_code
                                    && (
                                    <Button
                                      target="_blank"
                                      size="small"
                                      style={{ margin: '10px' }}
                                      variant="outlined"
                                      color="black"
                                      href={metaData.source_code}
                                    >
                                      Source Code
                                    </Button>
                                    )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </CardContainer>
  );
};

Description.propTypes = {
  metaData: CustomPropTypes.coinMetaData,
};

Description.defaultProps = {
  metaData: null,
};

export default Description;
