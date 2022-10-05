// @mui
import { alpha } from '@mui/material/styles'
//
import { StarIcon } from './CustomIcons'

// ----------------------------------------------------------------------

const ICON_SMALL = { width: 20, height: 20 }
const ICON_LARGE = { width: 28, height: 28 }

export default function Rating(theme) {
  return {
    MuiRating: {
      defaultProps: {
        emptyIcon: <StarIcon />,
        icon: <StarIcon />,
      },

      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            opacity: 0.48,
          },
        },
        iconEmpty: { color: alpha(theme.palette.grey[500], 0.48) },
        sizeSmall: { '& svg': { ...ICON_SMALL } },
        sizeLarge: { '& svg': { ...ICON_LARGE } },
      },
    },
  }
}
