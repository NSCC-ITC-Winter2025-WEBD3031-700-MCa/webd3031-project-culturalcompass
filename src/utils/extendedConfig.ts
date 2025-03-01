export const extendedConfig = {
    darkMode: "class",
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        maxWidth: {
          'screen-xl': '75rem',
          'screen-2xl': '83.75rem'
        },
        boxShadow: {
          "filter_shadow": "0 0px 30px rgba(24, 23, 23, 0.1)",
          "darkmd": "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        },
        transitionDuration: {
          '150': '150ms',
        },
        spacing: {
          '6.25': '6.25rem',
          '70%': '70%',
          '40%': '40%',
          '47%': '47%',
          '45%': '45%',
          '30%': '30%',
          '60%': '60%',
          8.5: '8.5rem',
          37: '9.25rem',
          50: '50rem',
          25: '25rem',
          29: '28rem',
          120: '120rem',
          41: '40rem',
          45: '45rem',
          94: '22.5rem',
          3.75: '3.75rem'
        },
        height: {
          150: '750px',
          6.25: '6.25rem',
        },
        lineHeight: {
          'extra-loose': '2.5',
          '2.5': '2.5rem',
        },
        inset: {
          '5%': '5%',
          '35%': '35%'
        },
        zIndex: {
          '1': '1',
          '2': '2',
          '999': '999'
        },
        colors: {
          primary: "#2F73F2",
          secondary: "#547593",
          danger: "#DC3545",
          midnight_text: "#102D47",
          grey: "#668199",
          border: "#CCD7E1",
          success: "#3cd278",
          section: "#F8FAFC",
          darkmode: "#111928",
          darklight: "#1F2A37",
          dark_border: "#224767",
          yellow: "#f9c78f",
          herobg: "#F2EFFF",
          semidark: "#151f31",
          SkyBlueMist: "#C0D5FB",
        },
        fontSize: {
          100: [
            "6.25rem",
            {
              lineHeight: "6.375rem",
            },
          ],
        },
        blur: {
          250: '250px',
        },
      },
    },
    plugins: [],
}