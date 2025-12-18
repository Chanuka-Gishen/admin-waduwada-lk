import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

import useSnackbarStore from 'src/store/notification-store';

const SnackbarNotifier = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notifications = useSnackbarStore((state) => state.notifications);
  const displayedKeys = useSnackbarStore((state) => state.displayedKeys);
  const removeSnackbar = useSnackbarStore((state) => state.removeSnackbar);
  const addDisplayedKey = useSnackbarStore((state) => state.addDisplayedKey);
  const removeDisplayedKey = useSnackbarStore((state) => state.removeDisplayedKey);
  const isDisplayed = useSnackbarStore((state) => state.isDisplayed);

  useEffect(() => {
    notifications.forEach((notification) => {
      const { key, message, options = {}, dismissed = false } = notification;

      // If already displayed, skip
      if (isDisplayed(key)) {
        return;
      }

      if (dismissed) {
        // Mark as displayed so we don't process it again
        addDisplayedKey(key);
        closeSnackbar(key);
        return;
      }

      // Mark as displayed
      addDisplayedKey(key);

      // Show the snackbar
      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (event, myKey) => {
          // Clean up from store
          removeSnackbar(myKey);
          removeDisplayedKey(myKey);

          // Call custom onExited if provided
          if (options.onExited) {
            options.onExited(event, myKey);
          }
        },
      });
    });
  }, [notifications, enqueueSnackbar, closeSnackbar]);

  return null;
};

export default SnackbarNotifier;
