import { CircularProgress, Backdrop, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        }
    }),
);

export default function Loader({ isLoading }: { isLoading: boolean }) {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
        </Backdrop >
    );
}