import { createMuiTheme } from '@material-ui/core/styles';

export const buildTheme = () => {
  const options = {
    typography: {
      useNextVariants: true,
      singleRiskView: {
        fontSize: 20,
        padding: '10px',
        margin: 'auto',
        textAlign: 'left',
      },
    },
    textField: {
      padding: '0px',
    },
    slider: {
      padding: '10px',
      margin: '-10px',
    },
    select: {
      padding: '10px',
    },
    tabs: {
      padding: '10px',
    },
    formControl: {
      padding: '10px',
    },
  };

  return createMuiTheme(options);
};
