import * as React from 'react';

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <title>{'cross'}</title>
      <path fill="#656d78" d="M320.85 0H16.57L256 244.8 408.1 89.24 320.85 0z" />
      <path fill="#fc6" d="M191.09 512h304.27L256 267.2 103.83 422.73 191.09 512z" />
      <path fill="#ed7161" d="M506.37 322.31V11.21L266.94 256l152.11 155.55 87.32-89.24z" />
      <path fill="#48cfad" d="M5.63 189.7v311.09L245.05 256 92.88 100.42 5.63 189.7z" />
    </svg>
  );
}

export default Logo;
