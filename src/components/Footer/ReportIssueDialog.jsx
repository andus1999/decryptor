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

const ReportIssueDialog = function reportIssueMaterialDialog({ open, onClose }) {
  const [issue, setIssue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const db = getFirestore();

  const closeDialog = () => {
    onClose();
    setLoading(false);
    setIssue('');
  };

  const onChange = (e) => {
    setIssue(e.target.value);
  };

  const report = async () => {
    setLoading(true);
    await setDoc(doc(db, 'aggregations', 'issues'), {
      general: arrayUnion({
        issue,
      }),
    }, { merge: true });
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Report an Issue</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ margin: '20px 0' }}>
          Please describe the issue.
        </DialogContentText>
        <TextField
          multiline
          onChange={onChange}
          autoFocus
          autoComplete="off"
          label="Issue"
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
            disabled={!issue}
            onClick={report}
            variant="contained"
          >
            Report
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

ReportIssueDialog.propTypes = {
  open: CustomPropTypes.boolean.isRequired,
  onClose: CustomPropTypes.func.isRequired,
};

export default ReportIssueDialog;
