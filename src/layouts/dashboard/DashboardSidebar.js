/* eslint-disable */
import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, Modal } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import { AuthContext } from '../../AuthContext';

import { addPets, addPosts, getAllPets } from '../../api';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  const top = 50 + 1; // rand();
  const left = 50 + 1; // rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { pathname } = useLocation();
  const { user, setIsAuth } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const handleFormName = (event) => {
    setFormName(event.target.value);
    // setTimeout(() => {console.log(formName);}, 2000);
  }
  const [formAge, setFormAge] = useState(0);
  const handleFormAge = (event) => {
    setFormAge(Number(event.target.value));
  }
  const [formBreed, setFormBreed] = useState('');
  const handleFormBreed = (event) => {
    setFormBreed(event.target.value);
  }

  const [formAggr, setFormAggr] = useState('Low');
  const handleFormAggr = (event) => {
    if (event.target.value === "AggressionLow") setFormAggr('Low');
    if (event.target.value === "AggressionMedium") setFormAggr('Medium');
    if (event.target.value === "AggressionHigh") setFormAggr('High');
  }

  const [formMaint, setFormMaint] = useState('Low');
  const handleFormMaint = (event) => {
    if (event.target.value === "MaintenanceLow") setFormMaint('Low');
    if (event.target.value === "MaintenanceMedium") setFormMaint('Medium');
    if (event.target.value === "MaintenanceHigh") setFormMaint('High');
  }

  const [formEnergy, setFormEnergy] = useState('Low');
  const handleFormEnergy = (event) => {
    if (event.target.value === "EnergyLow") setFormEnergy('Low');
    if (event.target.value === "EnergyMedium") setFormEnergy('Medium');
    if (event.target.value === "EnergyHigh") setFormEnergy('High');
  }

  const [formTitle, setFormTitle] = useState('');
  const handleFormTitle = (event) => {
    setFormTitle(event.target.value);
  }
  const [formDescr, setFormDescr] = useState('');
  const handleFormDescr = (event) => {
    setFormDescr(event.target.value);
  }


  const handleSubmit = (event) => {
    console.log("now submits");
    // setTimeout(() => {console.log(formName);}, 1000);
    console.log(formName);
    console.log(formAge);
    console.log(formBreed);

    console.log(formAggr);
    console.log(formMaint);
    console.log(formEnergy);

    console.log(formTitle);
    console.log(formDescr);

    addPets(formBreed, formMaint, formAggr, formEnergy).then((res)=> {
      // console.log(res.data);
      let petid = res.data;
      if (petid !== "Pet breed exists") addPosts(user.id, petid, formTitle, formDescr, formName, formAge);
    });
  }

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const ages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create New Post</h2>
      <h4 id="simple-modal-description">Your Pet:</h4>

      <form onSubmit={handleSubmit}>
        <label style={{marginRight:"5px"}}>Name:</label>
        <input type="text" onChange={handleFormName} style={{width:"100%"}}/>
        <br/>
        <label style={{marginRight:"5px"}}>Age:</label>
        <select onChange={handleFormAge} style={{width:"100%"}}>{ages.map((x,y) => <option key={y}>{x}</option>)}</select>
        <br/>
        <label style={{marginRight:"5px"}}>Breed:</label>
        <input type="text" onChange={handleFormBreed} style={{width:"100%"}} />
        <br/>

        <label style={{marginRight:"5px"}}>Aggression:</label>
        <RadioGroup row aria-label="position" name="position" defaultValue="AggressionLow" onChange={handleFormAggr}>
        <FormControlLabel
          value="AggressionLow"
          control={<Radio color="primary" />}
          label="Low"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="AggressionMedium"
          control={<Radio color="primary" />}
          label="Medium"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="AggressionHigh"
          control={<Radio color="primary" />}
          label="High"
          labelPlacement="bottom"
        />
        </RadioGroup>
        <br/>

        <label style={{marginRight:"5px"}}>Maintenance:</label>
        <RadioGroup row aria-label="position" name="position" defaultValue="MaintenanceLow" onChange={handleFormMaint}>
        <FormControlLabel
          value="MaintenanceLow"
          control={<Radio color="primary" />}
          label="Low"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="MaintenanceMedium"
          control={<Radio color="primary" />}
          label="Medium"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="MaintenanceHigh"
          control={<Radio color="primary" />}
          label="High"
          labelPlacement="bottom"
        />
        </RadioGroup>
        <br/>

        <label style={{marginRight:"5px"}}>Energy:</label>
        <RadioGroup row aria-label="position" name="position" defaultValue="EnergyLow" onChange={handleFormEnergy}>
        <FormControlLabel
          value="EnergyLow"
          control={<Radio color="primary" />}
          label="Low"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="EnergyMedium"
          control={<Radio color="primary" />}
          label="Medium"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="EnergyHigh"
          control={<Radio color="primary" />}
          label="High"
          labelPlacement="bottom"
        />
        </RadioGroup>
        <br/>

        <h4 id="simple-modal-description">Your Post:</h4>
        <label style={{marginRight:"5px"}}>Title:</label>
        <input type="text" onChange={handleFormTitle} style={{width:"100%"}}/>
        <br/>

        <label style={{marginRight:"5px"}}>Description:</label>
        <textarea type="text" onChange={handleFormDescr} style={{width:"100%"}}/>
        <br/>

        <center>
          <input style={{width:"30%"}} type="submit" value="Post" />
        </center>
      </form>
    </div>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={user.profile_pic} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user.username}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user.email}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
