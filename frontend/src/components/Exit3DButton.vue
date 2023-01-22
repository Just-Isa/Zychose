<template>
  <svg
    class="ml-5 mt-5 fixed z-50"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="50"
    height="50"
    rx="15"
    viewBox="0 0 50 50"
  >
    <defs>
      <filter
        id="Ellipse_7"
        x="0"
        y="0"
        width="50"
        height="50"
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy="3" input="SourceAlpha" />
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feFlood flood-opacity="0.161" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g
      id="ChatButton"
      :href="'#'"
      transform="translate(-4.246 -986.246)"
      class="hover:cursor-pointer"
    >
      <g transform="matrix(1, 0, 0, 1, 4.25, 986.25)" filter="url(#Ellipse_7)">
        <circle
          id="Ellipse_7-2"
          data-name="Ellipse 7"
          cx="16"
          cy="16"
          r="16"
          transform="translate(9 6)"
          fill="#424a4c"
        />
      </g>
    </g>
    <g>
      <path
        class="st0"
        d="M15,21H6c-1.7,0-3-1.3-3-3V9c0-1.7,1.3-3,3-3h1c0.6,0,1,0.4,1,1S7.6,8,7,8H6C5.4,8,5,8.4,5,9v9
		c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1v-1c0-0.6,0.4-1,1-1s1,0.4,1,1v1C18,19.7,16.7,21,15,21z"
        transform="translate(12 10)"
        fill="#fff"
      />
    </g>
    <g>
      <path
        class="st0"
        d="M12,16H9c-0.6,0-1-0.4-1-1v-3c0-0.3,0.1-0.5,0.3-0.7l8.4-8.4c1.2-1.2,3.2-1.2,4.4,0C21.7,3.5,22,4.3,22,5.1
		c0,0.8-0.3,1.6-0.9,2.2l-8.4,8.4C12.5,15.9,12.3,16,12,16z M10,14h1.6l8.1-8.1c0,0,0,0,0,0C19.9,5.7,20,5.4,20,5.1
		c0-0.3-0.1-0.6-0.3-0.8c-0.4-0.4-1.1-0.4-1.6,0L10,12.4V14z"
        transform="translate(12 10)"
        fill="#fff"
      />
    </g>

    <g>
      <path
        class="st0"
        d="M19,9c-0.3,0-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3c0.4,0.4,0.4,1,0,1.4
		C19.5,8.9,19.3,9,19,9z"
        transform="translate(12 10)"
        fill="#fff"
      />
    </g>
  </svg>
</template>
