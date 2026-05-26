// ReactDOM ESM shim — same purpose as react-esm-shim.js
const R = window.ReactDOM;
export default R;
export const {
  createPortal,
  flushSync,
  createRoot,
  hydrateRoot,
  render,
  unmountComponentAtNode,
  findDOMNode,
  unstable_batchedUpdates,
} = R || {};
