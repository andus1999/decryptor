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

const SupportDialog = function supportMaterialDialog({ open, onClose, user }) {
  const [question, setQuestion] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState(user?.email);
  const db = getFirestore();

  const closeDialog = (success=false) => {
    onClose(success);
    setLoading(false);
    setQuestion('');
    setEmail('');
  };

  const onChange = (e) => {
    setQuestion(e.target.value);
  };

  const onChangeMail = (e) => {
    setEmail(e.target.value);
  };

  const report = async () => {
    setLoading(true);
    await setDoc(doc(db, 'aggregations', 'issues'), {
      open_questions: arrayUnion({
        question,
        email,
        name: user ? user.name : null,
      }),
    }, { merge: true });
    closeDialog(true);
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Contact support</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ margin: '20px 0' }}>
          Please ask a question below.
        </DialogContentText>
        <TextField
          multiline
          onChange={onChange}
          autoFocus
          autoComplete="off"
          label="Question"
          fullWidth
          variant="outlined"
        />
        {!user && <TextField
          onChange={onChangeMail}
          autoComplete="off"
          label="Enter your email"
          fullWidth
          variant="outlined"
          sx={{marginTop: '20px'}}
        />}
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
            disabled={!question}
            onClick={report}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

SupportDialog.propTypes = {
  open: CustomPropTypes.boolean.isRequired,
  onClose: CustomPropTypes.func.isRequired,
  user: CustomPropTypes.user,
};

export default SupportDialog;
