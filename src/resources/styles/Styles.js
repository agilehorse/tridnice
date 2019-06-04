const drawerWidth = 160;

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 2,
        color: 'white',
    },
    hide: {
        display: 'none',
    },
    title: {
        marginLeft: 10,
        flexGrow: 1,
        [theme.breakpoints.down(340)]: {
            display: 'none',
        }
    },
    drawerPaper: {
        display: 'flex',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        display: 'flex',

        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 7,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        marginLeft: 0,
        transition: theme.transitions.create('marginLeft', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down('lg')]: {
            marginLeft: 20,
        },
        overflowX: 'auto',
    },
    contentShifted: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        marginLeft: 100,
        [theme.breakpoints.down('lg')]: {
            marginLeft: 120,
        },
        transition: theme.transitions.create('marginLeft', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'auto',
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    footer: {
        maxHeight: "50px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        color: "white",
        backgroundColor: "#2e7d32",
        zIndex: 2000,
        bottom: 0,
        marginBottom: 'auto',
    },
    cat: {
        padding: "0.5vh 1vw 0.5vh 1vw",
        margin: "0",
        height: 'inherit'
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: "center",
        alignContent: 'center',
        width: '100%',
    },
    bookIcon: {
        marginLeft: '15px'
    },
    progress: {
        display: 'flex',
        margin: 'auto',
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginRight: theme.spacing.unit * 2,
        display: 'flex',
        alignItems: 'center',
        color: 'green',
        fontWeight: '600',
        fontSize: '1.5em'
    },
});

export default styles