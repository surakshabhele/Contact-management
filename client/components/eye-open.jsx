// import * as React from "react"

// function EyeOpen(props) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={8}
//       height={8}
//       viewBox="0 0 8 8"
//       {...props}
//     >
//       <path d="M4.03 1C1.5 1 0 4 0 4s1.5 3 4.03 3C6.5 7 8 4 8 4S6.5 1 4.03 1zM4 2a2 2 0 012 2c0 1.11-.89 2-2 2a2 2 0 110-4zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.04-.19-.06-.28a.495.495 0 11-.66-.66A.875.875 0 004 3z" />
//     </svg>
//   )
// }

// export default EyeOpen
import * as React from "react"

function EyeOpen(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
    //   xmlns:svgjs="http://svgjs.com/svgjs"
    //   xmlnsXlink="http://www.w3.org/1999/xlink"
      width={20}
      height={20}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 8 8"
        {...props}
      >
        <path
          fill="#5d5d5a"
          d="M4.03 1C1.5 1 0 4 0 4s1.5 3 4.03 3C6.5 7 8 4 8 4S6.5 1 4.03 1zM4 2a2 2 0 012 2c0 1.11-.89 2-2 2a2 2 0 110-4zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1c0-.1-.04-.19-.06-.28a.495.495 0 11-.66-.66A.875.875 0 004 3z"
          className="color000 svgShape"
        />
      </svg>
    </svg>
  )
}

export default EyeOpen
