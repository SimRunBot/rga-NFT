import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#023e8a",
    },
    secondary: {
      main: "#FF0055",
    },
    gradient: {
      background: "radial-gradient(ellipse at 50% 50%, #FF0055 0%, #c7edeb 50.69%, #000066 90.91%)",
    },
    itemgradient: {
      background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(18,91,149,1) 54%, rgba(0,0,0,1) 100%)",
    }
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;