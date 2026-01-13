export function hideResizeObserverLoopErrors() {
  function hideError(e: any) {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
      const resizeObserverErrDiv = document.getElementById(
        'webpack-dev-server-client-overlay-div'
      );
      const resizeObserverErr = document.getElementById(
        'webpack-dev-server-client-overlay'
      );
      if (resizeObserverErr) {
        resizeObserverErr.setAttribute('style', 'display: none');
      }
      if (resizeObserverErrDiv) {
        resizeObserverErrDiv.setAttribute('style', 'display: none');
      }
    }
  }

  window.addEventListener('error', hideError)
  return () => {
    window.addEventListener('error', hideError)
  }
}