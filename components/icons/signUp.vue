<template>
  <svg
    viewBox="0 0 24 24"
    class="text-slate-100 w-7 h-7"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      stroke-width="1.7"
    >
      <path
        strokeDasharray="20"
        strokeDashoffset="20"
        d="M3 21V20C3 17.7909 4.79086 16 7 16H11C13.2091 16 15 17.7909 15 20V21"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="20;0"
        ></animate>
      </path>
      <path
        strokeDasharray="20"
        strokeDashoffset="20"
        d="M9 13C7.34315 13 6 11.6569 6 10C6 8.34315 7.34315 7 9 7C10.6569 7 12 8.34315 12 10C12 11.6569 10.6569 13 9 13Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.5s"
          dur="0.4s"
          values="20;0"
        ></animate>
      </path>
      <path
        strokeDasharray="8"
        strokeDashoffset="8"
        d="M15 6H21"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="1s"
          dur="0.2s"
          values="8;0"
        ></animate>
      </path>
      <path
        strokeDasharray="8"
        strokeDashoffset="8"
        d="M18 3V9"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="1.2s"
          dur="0.2s"
          values="8;0"
        ></animate>
      </path>
    </g>
  </svg>
</template>
