import React from 'react';

import styles from './FAQStyles.module.css';

import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { GeneralQns, BookingQns, PaymentQns, TripQns } from './Questions';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: '#18776D',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'upper',
  width: '25%',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(20),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

//Acccordion style

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={1} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem', color: '#43D7C8' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
    color: '#18776D',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(3),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #43D7C8',
  backgroundColor: '#Ffffff',
}));

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position='static'>
        <StyledTabs
          value={value}
          onChange={handleChange}
          textColor='white'
          className={styles.appBar}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
        >
          <StyledTab
            sx={{ fontWeight: '600' }}
            label='General'
            className={styles.tab}
            {...a11yProps(0)}
          />
          <StyledTab sx={{ fontWeight: '600' }} label='Booking' {...a11yProps(1)} />
          <StyledTab sx={{ fontWeight: '600' }} label='Payment & Refund' {...a11yProps(2)} />
          <StyledTab sx={{ fontWeight: '600' }} label='Your Trip' {...a11yProps(3)} />
        </StyledTabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        {GeneralQns.length !== 0 &&
          GeneralQns.map((qns, index) => {
            let i = index;
            return (
              <Accordion key={index}
                expanded={expanded === `panel${i}`}
                onChange={handleChangeExpand(`panel${i}`)}
              >
                <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.head}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.info}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {BookingQns.length !== 0 &&
          BookingQns.map((qns, index) => {
            let i = GeneralQns.length - 1 + index;
            return (
              <Accordion key={index}
                expanded={expanded === `panel${i}`}
                onChange={handleChangeExpand(`panel${i}`)}
              >
                <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.head}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.info}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        {PaymentQns.length !== 0 &&
          PaymentQns.map((qns, index) => {
            let i = GeneralQns.length + BookingQns.length - 1 + index;
            return (
              <Accordion key={index}
                expanded={expanded === `panel${i}`}
                onChange={handleChangeExpand(`panel${i}`)}
              >
                <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.head}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.info}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        {TripQns.length !== 0 &&
          TripQns.map((qns, index) => {
            let i = GeneralQns.length + BookingQns.length + PaymentQns.length - 1 + index;
            return (
              <Accordion key={index}
                expanded={expanded === `panel${i}`}
                onChange={handleChangeExpand(`panel${i}`)}
              >
                <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.head}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{qns.info}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </TabPanel>
    </Box>
  );
}
