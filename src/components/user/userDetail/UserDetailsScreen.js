import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import UserDetails from './UserDetail';
import { fetchUser } from '../../../apis/usersApi';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import { cloneDeep } from 'lodash';
import { useAuth } from '../../../context/auth';
import UserSale from './UserSale';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#F5F5F5',
    marginRight: theme.spacing(3),
    padding: theme.spacing(1),
  },
  mapContainer: {
    padding: theme.spacing(2),
  },
  mapGrid: {
    width: '100%',
    marginRight: theme.spacing(3),
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  details: {
    padding: theme.spacing(2),
  },
  img: {
    height: '100%',
    minHeight: '400px',
    maxHeight: 515,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    // maxWidth: 515,
  },
  emptyContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  largeIcon: {
    width: 40,
    height: 40,
    color: 'red',
  },
  notFound: {
    color: 'red',
  },
}));

function UserDetailsScreen(props) {
  let { uuid } = useParams();
  const [user, setUser] = useState({});
  const [userLocation, setUserLocation] = useState({
    lat: 322,
    lng: 133,
  });
  const [_, setPhoneNumbers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const { authTokens, setAuthTokens } = useAuth();

  const classes = useStyles();

  const adaptMapsLocation = (lat, long) => {
    setUserLocation({
      lat: parseFloat(lat),
      lng: parseFloat(long),
    });
  };

  function handleOnStateChanged() {
    const tempUserState = cloneDeep(user);
    tempUserState.verified = true;
    setUser(tempUserState);
  }

  const extractPhoneNumbers = (fetchedUser) => {
    const phone_numbers = [];
    fetchedUser.contacts.forEach((contact) => {
      phone_numbers.push(contact.phone_number);
    });
    setPhoneNumbers(phone_numbers);
    fetchedUser.contacts = phone_numbers;
  };
  useEffect(() => {
    setUserLoading(true);
    fetchUser(uuid, authTokens)
      .then((res) => {
        const fetchedUser = res.data;
        setUser(fetchedUser);
      })
      .catch((reason) => {
        if (reason.response.status === 404) {
          setUserNotFound(true);
        } else if (reason.response.status === 401) {
          localStorage.removeItem('tokens');
          localStorage.removeItem('users');
          setAuthTokens();
        }
      })
      .finally(() => {
        setUserLoading(false);
      });
  }, []);
  if (userLoading) {
    return (
      <div className={classes.emptyContainer}>
        <CircularProgress />
      </div>
    );
  } else if (userNotFound) {
    return (
      <div className={classes.emptyContainer}>
        <Typography variant='h3' className={classes.notFound} gutterBottom>
          العميل المطلوب غير موجود <WarningIcon className={classes.largeIcon} />
        </Typography>
      </div>
    );
  }
  return (
    <div className={classes.root} dir='rtl'>
      <Grid container className={classes.details}>
        <Grid item lg={12}>
          <UserDetails
            id={'userDetails'}
            passedUser={user}
            onStateChanged={handleOnStateChanged}
          />
        </Grid>
      </Grid>
      <UserSale rep_uuid={user.uuid} />
    </div>
  );
}

export default UserDetailsScreen;
