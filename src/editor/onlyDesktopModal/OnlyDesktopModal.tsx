import React from 'react';
import { isBrowser } from 'react-device-detect';
import {Modal} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function OnlyDesktopModal() {

  const [open, setOpen] = React.useState(!isBrowser);
  const handleClose = () => setOpen(false);

  return <Modal
    sx={{ width: '100%' }}
    aria-labelledby="unstyled-modal-title"
    aria-describedby="unstyled-modal-description"
    open={open}
    onClose={handleClose}>
    <Paper sx={{ padding: '8px', margin: '12px' }}>
      <h2 id="unstyled-modal-title" className="modal-title">
        Sorry, desktop only!
      </h2>
      <p id="unstyled-modal-description" className="modal-description">
        This DEMO currently only works on a desktop browser. Please have a look at the documentation on GitHub:
      </p>
      <a href="https://github.com/lexy-language/lexy-language/blob/main/Introduction/1_Philosophy.md">Documentation</a>
      <p>
        Or open your laptop an re-open the DEMO 😉
      </p>
      <p>
        Or commit a PR to make it responsive 🙏
      </p>
    </Paper>
  </Modal>;
}