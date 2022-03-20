const makeWindowLocationAccessible = (): void => {
  // This method completely ignores TypeScript good practises due to need of operating on
  // window.location Object which is not accessible from Jest context when using TypeScript.
  // Here is the implementation that is a simple workaround to omit these restrictions.
  /* eslint-disable @typescript-eslint/ban-ts-comment */

  // Remove immutable global window.location Object
  // @ts-ignore
  delete window.location;

  // Initialize empty Object so window.location.x could be assigned
  // @ts-ignore
  window.location = {};

  /* eslint-enable @typescript-eslint/ban-ts-comment */
};

export { makeWindowLocationAccessible };
