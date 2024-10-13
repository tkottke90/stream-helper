export function createErrorComponent(message: string) {
  const errorDiv = document.createElement('div');

  errorDiv.style.backgroundColor = 'hsla(0, 100%, 68%)';
  errorDiv.style.border = '1px solid hsla(0, 81.2%, 41.8%)';
  errorDiv.style.borderRadius = '0.25rem';
  errorDiv.style.display = 'flex';
  errorDiv.style.justifyContent = 'center';
  errorDiv.style.alignItems = 'center';

  errorDiv.textContent = message;

  return errorDiv;
}
