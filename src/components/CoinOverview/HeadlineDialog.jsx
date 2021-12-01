import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CustomPropTypes from '../../types/CustomPropTypes';

const HeadlineDialog = function headlineMaterialDialog({ open, onClose, metaData }) {
  const headlineElements = metaData ? (metaData.headlines.map((it) => {
    const sentiment = it.sentiment_value;
    const secondary = `Sentiment: ${sentiment}`;
    return (
      <div key={it.headline.toLowerCase()}>
        <ListItem>
          <ListItemButton component="a" href={it.link} target="_blank">
            <ListItemText primary={it.headline} secondary={secondary} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </div>
    );
  })) : null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Articles</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ margin: '20px 0' }}>
          Sentiment analysis is based on the following articles.
        </DialogContentText>
        <List>
          {headlineElements}
        </List>
      </DialogContent>
      <DialogActions>
        <div style={{ padding: '10px' }}>
          <Button
            onClick={onClose}
            variant="contained"
          >
            Close
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

HeadlineDialog.propTypes = {
  metaData: CustomPropTypes.coinMetaData,
  open: CustomPropTypes.boolean.isRequired,
  onClose: CustomPropTypes.func.isRequired,
};

HeadlineDialog.defaultProps = {
  metaData: null,
};

export default HeadlineDialog;
