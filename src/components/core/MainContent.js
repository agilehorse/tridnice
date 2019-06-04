import React, {Component} from "react"
import Login from "../pages/Login";
import {Avatar, withStyles} from "@material-ui/core";
import styles from "../../resources/styles/Styles";
import SideMenu from "./SideMenu";
import {studentOverallMarks} from "../MockJSONs"
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import history from '../history';
import People from "../pages/People";
import Subjects from "../pages/Subjects";
import Marks from "../pages/Marks";
import Timetable from "../pages/Timetable";
import Classes from "../pages/Classes";
import Profile from "../pages/Profile";
import SubjectDetail from "../pages/SubjectDetail";
import ClassDetail from "../pages/ClassDetail";
import UserDetail from "../pages/UserDetail";
import Typography from "@material-ui/core/Typography";
import Lesson from "../pages/Lesson";
import load from "../../resources/icons/load.svg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

// Component for holding a content of a page
class MainContent extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            notRouted: true,
            modalOpen: false,
        }
    }

    componentDidMount()
    {
        // adds listener on offline event, If user's internet disconnects, it displays the modal window which notifies user about the situation
        window.addEventListener('offline', () => this.setState({modalOpen: true}));
        this.setState({notRouted: false})
    }

    // triggered if router in render method doesn't find url typed by user. This redirects user on default page depending on whether he is logged in.
    redirect = () =>
    {
        return this.props.data.loggedIn
            ? <Redirect to={'/profile'}/>
            : <Redirect to={'/login'}/>
    };

    //applies style which shifts the page content if the menu is open and the screen is bigger than small one.
    getContentClass()
    {
        const {classes} = this.props;
        if (isWidthUp('sm', this.props.width))
        {
            return !this.props.menuVisible ?
                classes.content
                : classes.contentShifted;
        }
        return classes.content;
    }

    //closes modal window
    handleClose = () =>
    {
        this.setState({modalOpen: false});
    };

    render()
    {
        const loggedIn = this.props.data.loggedIn;
        const {classes} = this.props;
        const contentClass = this.getContentClass();
        return (
            <div className={classes.section}>
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.modalOpen}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Connection not found
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            It looks like the internet connection is not working on your device. Our pages might not
                            work correctly without it.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            I understand
                        </Button>
                    </DialogActions>
                </Dialog>

                {/*conditional rendering => if the data hasn't loaded yet, displays loading icon*/}
                {this.props.loading
                    ?
                    <div className={classes.progress}>
                        <Typography className={classes.loadingText}>Loading</Typography>
                        <Avatar
                            style={{borderRadius: 0}}
                            clid="loadIcon"
                            src={load}
                            alt="loading icon"
                        />
                    </div>
                    : <div className={contentClass}>
                        {/*conditional rendering => side menu is invisible if user is not logged in*/}
                        {
                            loggedIn &&
                            <SideMenu
                                menuVisible={this.props.menuVisible}
                                handleToggle={this.props.handleToggle}
                                userType={this.props.data.userType}
                            />
                        }
                        <main
                        >
                            {/*Contents specific to each page*/}
                            <Router history={history}>
                                <Switch>
                                    <Route
                                        path='/login'
                                        render={() => !loggedIn
                                            ?
                                            <Login
                                                logUser={this.props.logUser}
                                                logout={this.props.logout}
                                            />
                                            :
                                            <Redirect to={'/profile'}/>
                                        }
                                    />
                                    <Route
                                        path="/profile"
                                        render={() => loggedIn
                                            ?
                                            <Profile
                                                id={this.props.data.id}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={"/login"}/>
                                        }
                                    />
                                    <Route
                                        path='/timetable'
                                        render={() => loggedIn
                                            ?
                                            <Timetable
                                                logout={this.props.logout}
                                                lesson={null}
                                                isAdmin={this.props.data.userType === 'ADMIN'}
                                            />
                                            : <Redirect to={'/login'}/>
                                        }
                                    />
                                    <Route
                                        path='/marks'
                                        render={() => loggedIn
                                            ?
                                            <Marks
                                                data={studentOverallMarks}
                                                logout={this.props.logout}
                                                isTeacher={this.props.data.userType === 'TEACHER'}
                                                isInDetailPage={false}
                                            />
                                            : <Redirect to={'/login'}/>
                                        }
                                    />
                                    <Route
                                        path='/people'
                                        render={() => loggedIn
                                            ?
                                            <People
                                                isAdmin={this.props.data.userType === 'ADMIN'}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={'/login'}/>
                                        }
                                    />
                                    <Route
                                        path='/subjects'
                                        render={() => loggedIn
                                            ?
                                            <Subjects
                                                isAdmin={this.props.data.userType === 'ADMIN'}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={'/login'}/>
                                        }
                                    />
                                    <Route
                                        path='/classes'
                                        render={() => loggedIn
                                            ?
                                            <Classes
                                                isAdmin={this.props.data.userType === 'ADMIN'}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={'/login'}/>
                                        }
                                    />
                                    <Route
                                        path="/userDetail"
                                        render={() => this.props.data.userType === 'ADMIN' && loggedIn
                                            ?
                                            <UserDetail
                                                userType={'ADMIN'}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={"/login"}/>
                                        }
                                    />
                                    <Route
                                        path="/subjectDetail"
                                        render={() => loggedIn
                                            ?
                                            <SubjectDetail
                                                userType={this.props.data.userType}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={"/login"}/>
                                        }
                                    />
                                    <Route
                                        path="/classeDetail"
                                        render={() => loggedIn
                                            ?
                                            <ClassDetail
                                                userType={this.props.data.userType}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={"/login"}/>
                                        }
                                    />
                                    <Route
                                        path="/lessonDetail"
                                        render={() => loggedIn
                                            ?
                                            <Lesson
                                                userType={this.props.data.userType}
                                                logout={this.props.logout}
                                            />
                                            : <Redirect to={"/login"}/>
                                        }
                                    />
                                    <Route
                                        path=''
                                        render={this.redirect}
                                    />
                                </Switch>
                            </Router>
                        </main>
                    </div>
                }
            </div>
        );
    }
}

export default withWidth()(withStyles(styles)(MainContent));
