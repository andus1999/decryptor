import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  getFirestore, arrayUnion, setDoc, doc,
} from 'firebase/firestore';
import CustomPropTypes from '../../types/CustomPropTypes';

const RequestCoinDialog = function requestCoinMaterialDialog({ open, onClose }) {
  const [coin, setCoin] = React.useState('');
  const [link, setLink] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const db = getFirestore();

  const closeDialog = () => {
    onClose();
    setLoading(false);
    setCoin('');
    setLink('');
  };

  const onCoinChange = (e) => {
    setCoin(e.target.value);
  };

  const onLinkChange = (e) => {
    setLink(e.target.value);
  };

  const request = async () => {
    setLoading(true);
    await setDoc(doc(db, 'aggregations', 'issues'), {
      missing_coins: arrayUnion({
        name: coin,
        link,
      }),
    }, { merge: true });
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Request a missing Coin</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ margin: '20px 0' }}>
          Provide the name of the coin or asset you would like to be added to our dataset.
        </DialogContentText>
        <TextField
          onChange={onCoinChange}
          autoComplete="off"
          label="Name"
          fullWidth
          variant="outlined"
        />
        <DialogContentText style={{ margin: '20px 0' }}>
          Please also include a link to the coin&apos;s official website.
        </DialogContentText>
        <TextField
          onChange={onLinkChange}
          autoComplete="off"
          label="Link"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <div style={{ padding: '10px' }}>
          <Button
            onClick={closeDialog}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
        <div style={{ padding: '10px' }}>
          <LoadingButton
            loading={loading}
            disabled={!coin || !link}
            onClick={request}
            variant="contained"
          >
            Request
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

RequestCoinDialog.propTypes = {
  onClose: CustomPropTypes.func.isRequired,
  open: CustomPropTypes.boolean.isRequired,
};

export default RequestCoinDialog;
