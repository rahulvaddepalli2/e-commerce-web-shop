import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        flexGrow: 1,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }));