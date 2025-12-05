function Logo({ fill, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="79"
      height="29"
      viewBox="0 0 79 29"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="bold_logo_gradient"
          x1="78.748"
          x2="0"
          y1="14"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.2" stopColor="#EE424E"></stop>
          <stop offset="0.8" stopColor="#121E6C"></stop>
        </linearGradient>
      </defs>
      <path
        fill={fill || 'url(#bold_logo_gradient)'}
        d="M23.84 19.003h19.565c-.47 5.047-4.677 9.01-9.783 9.01-5.107 0-9.312-3.963-9.783-9.01zM9.882 8.158v19.81c4.982-.476 8.897-4.736 8.897-9.905S14.864 8.636 9.882 8.16zm23.74-.044c-5.105 0-9.311 3.964-9.782 9.012h19.565c-.47-5.048-4.677-9.012-9.783-9.012M0 15.344v12.67h7.97V0H0zM71.03 0v28.013H79V0zM60.279 18.064c0 .629.06 1.243.171 1.84.8 4.307 4.35 7.645 8.727 8.064V8.158c-4.983.477-8.898 4.737-8.898 9.906m-12.843 9.95h7.97V0h-7.97z"
      ></path>
    </svg>
  );
}

export default Logo;
