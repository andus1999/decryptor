import { createTheme } from '@mui/material';
import Colors from './Colors';

export const mainTheme = createTheme({
  palette: {
    primary: {
      light: Colors.primaryLight,
      main: Colors.primary,
    },
    white: {
      main: Colors.white,
    },
    black: {
      main: Colors.black,
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Sora',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: `0px 11px 15px -7px ${Colors.shadow}, 0px 24px 38px 3px ${Colors.shadow}, 0px 9px 46px 8px ${Colors.shadow}`,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, .5)',
          backdropFilter: 'blur(5px)',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          border: `1px solid ${Colors.lightGrey}`,
          backgroundColor: Colors.white,
          color: Colors.black,
        },
      },
    },
  },
});

export const LineChartOptions = {
  interaction: {
    intersect: false,
    axis: 'x',
    mode: 'nearest',
  },
  elements: {
    point: {
      radius: 3,
      borderWidth: 3,
      hoverRadius: 6,
      hoverBorderWidth: 2,
    },
    line: {
      borderWidth: 3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      bodyColor: Colors.black,
      backgroundColor: Colors.white,
      filter(x) { return x.datasetIndex === 0; },
      callbacks: {
        label(context) {
          let label = ' ';

          if (context.parsed.x) {
            const date = new Date(context.parsed.x);
            label += Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
            }).format(date);
          }
          if (context.parsed.x && context.parsed.y !== null) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += Number.parseFloat(context.parsed.y).toPrecision(3);
          }
          return label;
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 5,
      },
      type: 'time',
      time: {
        unit: 'day',
      },
    },
    y: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
};

export const DoughnutChartOptions = {
  elements: {
    arc: {
      borderRadius: 10,
    },
  },
  plugins: {
    tooltip: {
      bodyColor: Colors.black,
      backgroundColor: Colors.white,
      filter(x) { return x.dataIndex === 0; },
    },
  },
};
