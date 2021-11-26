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
  typography: {
    fontSize: 16,
    fontFamily: 'Sora',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
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
